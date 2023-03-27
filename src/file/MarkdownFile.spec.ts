import { Thought } from "../types";
import { FILE_NAME_LENGTH } from "./constants";
import MarkdownFile from "./MarkdownFile";

describe("serializeFrontMatter", () => {
  test("it serializes frontmatter from a thought", () => {
    const thought: Thought = {
      creationTime: 123456,
      text: "text",
    };
    const frontmatter = MarkdownFile._serializeFrontMatter(thought);
    expect(frontmatter).toEqual("---\ncreationTime: 123456\n---");
  });
});

describe("getFileName", () => {
  test("it capitalizes first letter", () => {
    const thought: Thought = {
      creationTime: 123456,
      text: "abcdef",
    };
    const fileName = MarkdownFile._getFileName(thought);
    expect(fileName).toEqual("Abcdef");
  });

  test("it truncates line at FILE_NAME_LENGTH", () => {
    const thought: Thought = {
      creationTime: 123456,
      text: Array(FILE_NAME_LENGTH).fill("a").join("") + "bbb",
    };
    const fileName = MarkdownFile._getFileName(thought);
    expect(fileName).toEqual(
      "A" +
        Array(FILE_NAME_LENGTH - 1)
          .fill("a")
          .join("")
    );
  });

  test("it only uses the text from the first line", () => {
    const thought: Thought = {
      creationTime: 123456,
      text: "abc\ndef",
    };
    const fileName = MarkdownFile._getFileName(thought);
    expect(fileName).toEqual("Abc");
  });
});
