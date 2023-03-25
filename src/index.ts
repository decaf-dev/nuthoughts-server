import { Request, Response, Express, NextFunction } from "express";
import express from "express";
import dotenv from "dotenv";

import { TextBlock } from "./types";
import { isObject, validateFields } from "./validation/utils";
import { MarkdownFile } from "./markdown/MarkdownFile";

//Load .env file
dotenv.config();

const app: Express = express();
//Allow incoming strings
app.use(express.urlencoded({ extended: true }));
//Allow incoming json
app.use(express.json({ limit: "1mb" }));

const port = process.env.PORT;
if (port === undefined) throw Error("Missing port value");
const folderPath = process.env.SAVE_FOLDER_PATH;
if (folderPath === undefined) throw Error("Missing folder value");

app.get("/", (_req: Request, res: Response) => {
  res.send("Chisel Server is running!");
});

app.post(
  "/save-blocks",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as unknown[];

      if (!Array.isArray(body))
        throw new Error("Invalid data. Data must be an array.");

      if (body.length === 0) {
        res.sendStatus(200);
        return;
      }

      for (let i = 0; i < body.length; i++) {
        const obj: unknown = body[i];
        if (!isObject(obj))
          throw new Error(
            "Invalid data. Array must contain saveBlock objects of the format: { submissionTime: number, text: string}."
          );

        const textBlock = obj as TextBlock;
        validateFields([
          {
            name: "submissionTime",
            value: textBlock.submissionTime,
            expectedType: "number",
          },
          {
            name: "text",
            value: textBlock.text,
            expectedType: "string",
          },
        ]);
        //TODO if any fail - rollback
        await MarkdownFile.saveBlockAsMarkdownFile(textBlock);
      }
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
  console.log(`Chisel Server is running at: http://localhost:${port}`);
  console.log(`Files will be saved to: ${folderPath}`);
});
