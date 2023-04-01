import { Request, Response, Express, NextFunction } from "express";
import express from "express";
import dotenv from "dotenv";
import argon2 from "argon2";

import { getConfigFile, validateFields } from "./validation/utils";
import { EncryptedThought, Thought } from "./types";
import MarkdownFile from "./file/MarkdownFile";
import { decryptThought } from "./encryption";

async function startServer() {
  //Load .env file
  dotenv.config();

  const app: Express = express();
  const { port, folderPath, encryptionPassword, encryptionSalt } =
    getConfigFile();

  const kek = await argon2.hash(encryptionPassword, {
    salt: Buffer.from(encryptionSalt),
    raw: true,
  });

  //Allow incoming json
  app.use(express.json({ limit: "1mb" }));

  app.get("/", (_req: Request, res: Response) => {
    res.send("NuThoughts server is running!");
  });

  app.post(
    "/thought",
    async (req: Request, res: Response, next: NextFunction) => {
      const { body } = req;

      try {
        const encryptedThought = body as EncryptedThought;

        validateFields([
          {
            name: "nonce",
            value: encryptedThought.nonce,
            expectedType: "string",
          },
          {
            name: "cipherText",
            value: encryptedThought.cipherText,
            expectedType: "string",
          },
          {
            name: "mac",
            value: encryptedThought.mac,
            expectedType: "string",
          },
        ]);

        const json = await decryptThought(encryptedThought, kek);
        const thought = JSON.parse(json) as Thought;
        console.log("Received new thought", thought);

        validateFields([
          {
            name: "creationTime",
            value: thought.creationTime,
            expectedType: "number",
          },
          {
            name: "text",
            value: thought.text,
            expectedType: "string",
          },
        ]);
        await MarkdownFile.saveThought(folderPath, thought);
        res.sendStatus(201);
      } catch (err) {
        next(err);
      }
    }
  );

  //Error handler
  app.use((err: Error, _req: Request, res: Response) => {
    res.status(500).send({ message: err.message });
  });

  app.listen(port, () => {
    console.log(`NuThoughts is running at: http://localhost:${port}`);
    console.log(`Files will be saved to: ${folderPath}`);
  });
}

startServer();
