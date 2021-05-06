import COS from "cos-nodejs-sdk-v5";

import QiNiu from "qiniu";

const cos = new COS({
  SecretId: process.env.COS_SECRET_ID || "",
  SecretKey: process.env.COS_SECRET_KEY || "",
});

export const GetQiNiuUpLoaderToken = (key: string | null) => {
  const c = new QiNiu.auth.digest.Mac();
  const config = {
    scope: "unliar",
  };
  const uploadToken = new QiNiu.rs.PutPolicy(config).uploadToken(c);
  return uploadToken;
};

export default cos;
