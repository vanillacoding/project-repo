const crypto = require("node:crypto");

const generateDbSecretKey = () => {
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);

  return {
    iv: iv.toString("hex"),
    key: key.toString("hex"),
  };
};

const getUserSecretKey = (dbSecretKey) => {
  const { iv: stringIv, key: stringKey } = dbSecretKey;
  const iv = Buffer.from(stringIv, "hex");
  const key = Buffer.from(stringKey, "hex");

  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  const encrypted = cipher.update(process.env.SECRET_KEY);

  const encryptedData = Buffer.concat([encrypted, cipher.final()]);
  const userSecretKey = encryptedData.toString("hex");

  return userSecretKey;
};

const validateSecretKey = (userSecretKey, dbSecreteKey) => {
  const { iv: stringIv, key: stringKey } = dbSecreteKey;
  const iv = Buffer.from(stringIv, "hex");
  const key = Buffer.from(stringKey, "hex");
  const encrypted = Buffer.from(userSecretKey, "hex");

  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  const decrypted = decipher.update(encrypted);

  const decodedData = Buffer.concat([decrypted, decipher.final()]);
  const mySecret = decodedData.toString();

  return mySecret === process.env.SECRET_KEY;
};

module.exports = {
  generateDbSecretKey,
  getUserSecretKey,
  validateSecretKey,
};
