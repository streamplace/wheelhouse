import { Client } from "@streamplace/minio";
import url from "url";
import fs from "fs";
import path from "path";

let minioProm;
let externalHost;
let client;
let bucket;
let prefix;
const initMinio = () => async (dispatch, getState) => {
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
  minioProm = client.bucketExists(bucket);
  await minioProm;
};

export const s3PutFile = ({ filePath, objectName }) => async dispatch => {
  await dispatch(initMinio());
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
