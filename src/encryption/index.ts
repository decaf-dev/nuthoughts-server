import argon2 from "argon2";
import * as crypto from "crypto";

export const decryptThought = async (
  encrypted: {
    iv: string;
    encryptedData: string;
  },
  password: string,
  salt: string
) => {
  const key = await argon2.hash(password, {
    salt: Buffer.from(salt),
    raw: true,
  });

  let iv = Buffer.from(encrypted.iv, "hex");
  let encryptedText = Buffer.from(encrypted.encryptedData, "hex");

  const decipher = crypto.createDecipheriv("chacha20-poly1305", key, iv);

  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};
