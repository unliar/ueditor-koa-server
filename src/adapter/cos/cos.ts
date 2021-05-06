import COS from "cos-nodejs-sdk-v5";

import QiNiu from "qiniu";

const cos = new COS({
  SecretId: process.env.COS_SECRET_ID || "",
  SecretKey: process.env.COS_SECRET_KEY || "",
});

const QiNiuUpLoader = (
  key: string | null,
  rsStream: NodeJS.ReadableStream,
  putExtra: QiNiu.form_up.PutExtra | null
) => {
  const c = new QiNiu.auth.digest.Mac();
  const config = {
    scope: "unliar",
  };
  const uploadToken = new QiNiu.rs.PutPolicy(config).uploadToken(c);

  return new Promise((resolve, reject) => {
    new QiNiu.form_up.FormUploader().putStream(
      uploadToken,
      key,
      rsStream,
      putExtra,
      (err, resp, respInfo) => {
        if (err) {
          return reject(err);
        }
        return resolve({
          ...resp,
          ...respInfo,
        });
      }
    );
  });
};

export default cos;
