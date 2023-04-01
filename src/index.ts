import { Request, Response, Express, NextFunction } from "express";
import express from "express";
import dotenv from "dotenv";

import { getConfigFile, validateFields } from "./validation/utils";
import { EncryptedThought, Thought } from "./types";
import MarkdownFile from "./file/MarkdownFile";
import { decryptThought } from "./encryption";

//Load .env file
dotenv.config();

const app: Express = express();
const { port, folderPath, encryptionPassword, encryptionSalt } =
  getConfigFile();
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
          name: "iv",
          value: encryptedThought.iv,
          expectedType: "string",
        },
        {
          name: "encryptedData",
          value: encryptedThought.encryptedData,
          expectedType: "string",
        },
      ]);

      const json = await decryptThought(
        encryptedThought,
        encryptionPassword,
        encryptionSalt
      );
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
