import { Request, Response, Express, NextFunction } from "express";
import { isObject, validateFields } from "./validation/utils";

const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app: Express = express();

//Allow incoming strings
app.use(express.urlencoded({ extended: true }));
//Allow incoming json
app.use(express.json({ limit: "1mb" }));

const port = process.env.PORT;

app.get("/", (_req: Request, res: Response) => {
  res.send("Chisel Server is running!");
});

app.post("/save-blocks", (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body as unknown[];

    if (!Array.isArray(body))
      throw new Error("Invalid data. Data must be an array.");

    if (body.length === 0) {
      res.sendStatus(200);
      return;
    }

    body.forEach((obj: unknown) => {
      if (!isObject(obj))
        throw new Error(
          "Invalid data. Array must contain saveBlock objects of the format: { submissionTime: number, text: string}."
        );

      const block = obj as {
        submissionTime: number;
        text: string;
      };
      validateFields([
        {
          name: "submissionTime",
          value: block.submissionTime,
          expectedType: "number",
        },
        {
          name: "text",
          value: block.text,
          expectedType: "string",
        },
      ]);
    });
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

app.use((err: Error, _req: Request, res: Response) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`Chisel Server is running at http://localhost:${port}`);
});
