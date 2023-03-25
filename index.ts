import { Request, Response, Express } from "express";

const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running.");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
