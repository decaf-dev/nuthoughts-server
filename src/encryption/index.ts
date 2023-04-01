import * as crypto from "crypto";
import { EncryptedThought } from "../types";

export const decryptThought = async (
  encrypted: EncryptedThought,
  kek: Buffer
) => {
  const { nonce, cipherText, mac } = encrypted;
  const iv = Buffer.from(nonce, "hex");
  const encryptedText = Buffer.from(cipherText, "hex");
  const authTag = Buffer.from(mac, "hex");

  const decipher = crypto.createDecipheriv("chacha20-poly1305", kek, iv, {
    authTagLength: 16,
  });

  let decrypted = decipher.update(encryptedText);

  decipher.setAuthTag(authTag);

  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};
