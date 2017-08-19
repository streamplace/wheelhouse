import { Client } from "@streamplace/minio";
import url from "url";
import fs from "fs-extra";
import path from "path";
import { fileLoad } from "./fileActions";
import debug from "debug";
import stream from "stream";

let minioProm;
let externalHost;
let client;
let bucket;
let prefix;

const log = debug("wheelhouse:s3Actions");

/**
 * Unlike the other init functions that are called every time, this one gets called manually by
 * actions that use S3, so we don't complain about missing credentials unless we're using it.
 */
export const s3Init = () => async (dispatch, getState) => {
  if (minioProm) {
    return await minioProm;
  }
  const { s3 } = getState().config;
  ["accessKeyId", "secretAccessKey", "url"].forEach(key => {
    if (!s3[key]) {
      throw new Error(`Missing required config variable s3.${key}`);
    }
  });
  let { hostname, path, protocol } = url.parse(s3.url);
  externalHost = `${protocol}//${hostname}`;
  const [_bucket, ...rest] = path.split("/").filter(str => str !== "");
  bucket = _bucket;
  // Minio really wants s3.amazonaws.com for some dumb reason
  if (hostname.includes("amazonaws.com")) {
    hostname = "s3.amazonaws.com";
  }
  prefix = rest.join("/");
  client = new Client({
    endPoint: hostname,
    accessKey: s3.accessKeyId,
    secretKey: s3.secretAccessKey,
    secure: protocol === "https:"
  });
  const logger = new stream.PassThrough();
  client.logStream = logger;
  logger.on("data", buf => {
    const str = buf.toString().trim();
    if (str !== "") {
      log(str);
    }
  });
  minioProm = client.bucketExists(bucket);
  await minioProm;
};

export const s3PutFile = ({ filePath, objectName }) => async dispatch => {
  await dispatch(s3Init());
  if (!await fs.pathExists(filePath)) {
    throw new Error(`${filePath} doesn't exist, can't upload`);
  }
  const fullPath = path.join(prefix, objectName);
  const etag = await client.fPutObject(
    bucket,
    path.join(prefix, objectName),
    filePath
  );

  return {
    url: [externalHost, bucket, fullPath].join("/"),
    etag: etag
  };
};

export const s3GetFile = ({ filePath, objectName }) => async dispatch => {
  await dispatch(s3Init());
  const fullPath = path.join(prefix, objectName);
  await client.fGetObject(bucket, fullPath, filePath);
  return await dispatch(fileLoad(filePath));
};
