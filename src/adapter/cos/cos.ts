import COS from "cos-nodejs-sdk-v5";

import QiNiu from "qiniu";

const cos = new COS({
  SecretId: process.env.COS_SECRET_ID || "",
  SecretKey: process.env.COS_SECRET_KEY || "",
});

export const GetQiNiuUpLoaderToken = () => {
  const c = new QiNiu.auth.digest.Mac(
    "Ad0LKnmu_fJRV4sSum3u99J6nGkqDDPn9j4zKHkX",
    "HyCj45jPNIL060nxMeHMGEaH9rQhTJmz3XlxIJVe"
  );
  const config = {
    scope: "qygdut",
  };
  const uploadToken = new QiNiu.rs.PutPolicy(config).uploadToken(c);
  return uploadToken;
};

export const QiNiuPutFile = (key: string | null, localFile: string) => {
  const uploadToken = GetQiNiuUpLoaderToken();
  const config = new QiNiu.conf.Config();
  const formUploader = new QiNiu.form_up.FormUploader(config);
  const putExtra = new QiNiu.form_up.PutExtra();
  return new Promise<any>((resolve, reject) => {
    formUploader.putFile(
      uploadToken,
      key,
      localFile,
      putExtra,
      (respErr, respBody) => {
        if (respErr) {
          reject(respErr);
        } else {
          resolve(respBody);
        }
      }
    );
  });
};
export default cos;
