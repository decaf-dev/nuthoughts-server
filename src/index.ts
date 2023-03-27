import { Request, Response, Express, NextFunction } from "express";
import express from "express";
import dotenv from "dotenv";

import { validateFields } from "./validation/utils";
import { Thought } from "./types";
import MarkdownFile from "./file/MarkdownFile";

//Load .env file
dotenv.config();

const app: Express = express();
//Allow incoming json
app.use(express.json({ limit: "1mb" }));

const port = process.env.PORT;
if (port === undefined) throw Error("Missing .env file value for key: PORT");
const folderPath = process.env.SAVE_FOLDER_PATH;
if (folderPath === undefined)
  throw Error("Missing .env file value for key: SAVE_FOLDER_PATH");

app.get("/", (_req: Request, res: Response) => {
  res.send("NuThoughts server is running!");
});

app.post(
  "/thought",
  async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    console.log("Received new thought", body);
    try {
      const thought = body as Thought;
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
