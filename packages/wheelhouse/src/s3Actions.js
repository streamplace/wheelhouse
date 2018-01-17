import { Client } from "@streamplace/minio";
import url from "url";
import fs from "fs-extra";
import path from "path";
import { fileLoad } from "./fileActions";
import debug from "debug";
import os from "os";
import stream from "stream";
import { developmentLog } from "./developmentActions";
import { procRun } from "./procActions";
import axios from "axios";
import AWS from "aws-sdk";
import {
  S3_CREDENTIALS,
  S3_MINIO_ACCESS_KEY_ID,
  S3_MINIO_SECRET_ACCESS_KEY,
  S3_MINIO_PORT,
  S3_MINIO_BUCKET
} from "wheelhouse-core";

let minioProm;
let externalHost;
let client;
let bucket;
let prefix;
let minioContainer;
let s3;

const log = debug("wheelhouse:s3Actions");

const wait = ms => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
};

export const s3Init = () => async dispatch => {
  if (!minioProm) {
    minioProm = dispatch(_s3Init());
  }
  return await minioProm;
};

export const s3GetExternalIP = () => async (dispatch, getState) => {
  const { config } = getState();
  if (config.externalIp) {
    return config.externalIp;
  }
  const ifaces = os.networkInterfaces();
  const addresses = [];
  Object.keys(ifaces).forEach(ifaceName => {
    ifaces[ifaceName].forEach(address => {
      if (address.family !== "IPv4") {
        return;
      }
      if (address.address === "127.0.0.1") {
        return;
      }
      addresses.push(address.address);
    });
  });
  if (addresses.length > 1) {
    throw new Error(
      [
        `Not sure which of these I should use: ${addresses.join(", ")}`,
        "Please set the environment variable WH_EXTERNAL_IP."
      ].join("\n")
    );
  }
  return addresses[0];
};

export const s3InitMinio = () => async (dispatch, getState) => {
  const { config } = getState();
  minioContainer = `${config.rootName}-minio`;
  dispatch(developmentLog("s3", "starting local minio s3 server"));
  // Delete it in case it already exists.
  await dispatch(
    procRun("docker", ["rm", "-f", minioContainer])
  ).catch(() => {});
  const externalIP = await dispatch(s3GetExternalIP());
  const minioDataDir = path.join(
    config.rootDir,
    ".wheelhouse",
    "minio",
    "data"
  );
  const minioConfigDir = path.join(
    config.rootDir,
    ".wheelhouse",
    "minio",
    "config"
  );
  await fs.ensureDir(minioDataDir);
  await fs.ensureDir(minioConfigDir);
  dispatch(
    procRun(
      "docker",
      [
        "run",
        "--rm",
        "--name",
        minioContainer,
        "-u",
        `${process.getuid()}`,
        "-p",
        `${S3_MINIO_PORT}:9000`,
        "-v",
        `${minioDataDir}:/data`,
        "-v",
        `${minioConfigDir}:/.minio`,
        "-e",
        `MINIO_ACCESS_KEY=${S3_MINIO_ACCESS_KEY_ID}`,
        "-e",
        `MINIO_SECRET_KEY=${S3_MINIO_SECRET_ACCESS_KEY}`,
        "minio/minio",
        "server",
        "/data"
      ],
      { name: "minio" }
    )
  );
  const host = `http://${externalIP}:${S3_MINIO_PORT}`;
  dispatch({
    type: S3_CREDENTIALS,
    accessKeyId: S3_MINIO_ACCESS_KEY_ID,
    secretAccessKey: S3_MINIO_SECRET_ACCESS_KEY,
    url: `${host}/${S3_MINIO_BUCKET}`
  });
  let attempts = 0;
  while (attempts < 10) {
    try {
      log(`Trying OPTIONS ${host}`);
      await axios.options(host);
      return;
    } catch (e) {
      log(e);
      attempts += 1;
      await wait(500);
    }
  }
  throw new Error("Started minio, but unable to get at it within 5000ms");
};

/**
 * Unlike the other init functions that are called every time, this one gets called manually by
 * actions that use S3, so we don't complain about missing credentials unless we're using it.
 */
export const _s3Init = () => async (dispatch, getState) => {
  let { credentials } = getState().s3;
  let startMinio = false;
  ["accessKeyId", "secretAccessKey", "url"].forEach(key => {
    if (!credentials[key]) {
      startMinio = true;
    }
  });
  if (startMinio) {
    await dispatch(s3InitMinio());
  }
  credentials = getState().s3.credentials;
  log("got", credentials.url);
  let { hostname, path, protocol, port } = url.parse(credentials.url);
  log("parsed", { hostname, path, protocol, port });
  const secure = protocol === "https:";
  externalHost = `${protocol}//${hostname}`;
  if (!port) {
    port = secure ? 443 : 80;
  } else {
    port = parseInt(port);
    externalHost += `:${port}`;
  }
  const [_bucket, ...rest] = path.split("/").filter(str => str !== "");
  bucket = _bucket;
  // Minio really wants s3.amazonaws.com for some dumb reason
  if (hostname.includes("amazonaws.com")) {
    hostname = "s3.amazonaws.com";
  }
  prefix = rest.join("/");
  log(`init S3 client for ${JSON.stringify({ hostname, port })}`);
  client = new Client({
    endPoint: hostname,
    accessKey: credentials.accessKeyId,
    secretKey: credentials.secretAccessKey,
    secure: secure,
    port: port
  });
  AWS.config = new AWS.Config();
  AWS.config.accessKeyId = credentials.accessKeyId;
  AWS.config.secretAccessKey = credentials.secretAccessKey;
  s3 = new AWS.S3({
    endpoint: `${protocol}//${hostname}:${port}/${bucket}`,
    accessKeyId: credentials.accessKeyId,
    secretAccessKey: credentials.secretAccessKey,
    s3BucketEndpoint: true,
    region: "us-west-2"
  });
  const logger = new stream.PassThrough();
  client.logStream = logger;
  logger.on("data", buf => {
    const str = buf.toString().trim();
    if (str !== "") {
      log(str);
    }
  });
  try {
    await s3
      .putObject({
        ACL: "public-read",
        Bucket: bucket,
        Key: "check-bucket-exists",
        Body: "test"
      })
      .promise();
  } catch (e) {
    // Hmm, bucket not found? Let's try and make it I guess.
    if (e.code !== "NoSuchBucket") {
      throw e;
    }
    await s3.createBucket({ Bucket: bucket }).promise();
  }
  return client;
};

export const s3PutFile = ({ filePath, objectName }) => async dispatch => {
  await dispatch(s3Init());
  if (!await fs.pathExists(filePath)) {
    throw new Error(`${filePath} doesn't exist, can't upload`);
  }
  const fullPath = path.join(prefix, objectName);
  const data = await fs.readFile(filePath);
  const res = await s3
    .putObject({
      ACL: "public-read", // xx hack, set everything as public-read
      Bucket: bucket,
      Key: fullPath,
      Body: data
    })
    .promise();

  // const etag = await client.fPutObject(bucket, fullPath, filePath);

  // const res = await client.setBucketPolicy(bucket, fullPath, Policy.READONLY);

  return {
    url: [externalHost, bucket, fullPath].join("/"),
    etag: res.ETag
  };
};

export const s3GetFile = ({ filePath, objectName }) => async dispatch => {
  await dispatch(s3Init());
  const fullPath = path.join(prefix, objectName);
  await client.fGetObject(bucket, fullPath, filePath);
  return await dispatch(fileLoad(filePath));
};

export const s3Cleanup = () => async dispatch => {
  if (minioContainer) {
    await dispatch(procRun("docker", ["stop", minioContainer]));
  }
};
