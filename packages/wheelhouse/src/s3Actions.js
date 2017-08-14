import { Client } from "@streamplace/minio";
import url from "url";
import fs from "fs";
import path from "path";

const ENV = ["WHEELHOUSE_S3_URL", "AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY"];

let minioProm;
let externalHost;
let client;
let bucket;
let prefix;
const initMinio = async () => {
  if (minioProm) {
    return await minioProm;
  }
  let env = {};
  ENV.forEach(key => {
    if (!process.env[key]) {
      throw new Error(`Missing environment variable ${key}`);
    }
    env[key] = process.env[key];
  });
  let { hostname, path, protocol } = url.parse(env.WHEELHOUSE_S3_URL);
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
    accessKey: env.AWS_ACCESS_KEY_ID,
    secretKey: env.AWS_SECRET_ACCESS_KEY,
    secure: protocol === "https:"
  });
  minioProm = client.bucketExists(bucket);
  await minioProm;
};

export const s3PutFile = ({ filePath, objectName }) => async dispatch => {
  await initMinio();
  const fullPath = path.join(prefix, objectName);
  const etag = await client.putObject(
    bucket,
    path.join(prefix, objectName),
    fs.createReadStream(filePath)
  );

  return {
    url: [externalHost, bucket, fullPath].join("/"),
    etag: etag
  };
};
