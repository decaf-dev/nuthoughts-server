import { Thought } from "../types";
import MarkdownFile from "./MarkdownFile";
import mock from "mock-fs";
import fs from "fs";

beforeEach(() => {
  mock();
});

describe("saveThought", () => {
  test("creates a markdown file from a thought", async () => {
    const thought: Thought = {
      creationTime: 123456,
      text: "this is a thought",
    };

    const saveFolder = "/thoughts";
    const filePath = saveFolder + "/" + "This is a thought.md";

    await MarkdownFile.saveThought(saveFolder, thought);

    const data = await fs.promises.readFile(filePath, "utf-8");
    expect(data).toEqual("---\ncreationTime: 123456\n---\n\nthis is a thought");
  });
});

afterEach(() => {
  mock.restore();
});
