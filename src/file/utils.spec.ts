import { truncate } from "./utils";
import { firstLine, getFilePathExtension, uppercaseFirstLetter } from "./utils";

describe("uppercaseFirstLetter", () => {
  test("uppercases first letter", () => {
    const result = uppercaseFirstLetter("test");
    expect(result).toEqual("Test");
  });
});

describe("firstLine", () => {
  test("handles one line", () => {
    const result = firstLine("abc");
    expect(result).toEqual("abc");
  });
  test("handles multiple lines", () => {
    const result = firstLine("abc\ndef");
    expect(result).toEqual("abc");
  });
});

describe("truncate", () => {
  test("returns a truncated string", () => {
    const result = truncate("test string", 4);
    expect(result).toEqual("test");
  });

  test("returns a string with no white space", () => {
    const result = truncate("test string\n\n", 13);
    expect(result).toEqual("test string");
  });
});

describe("getFilePathExtension", () => {
  test("returns the extension", () => {
    const result = getFilePathExtension("abc.md");
    expect(result).toEqual({
      pathWithoutExtension: "abc",
      extension: ".md",
    });
  });
  test("returns null when no extension is present", () => {
    const result = getFilePathExtension("abc");
    expect(result).toEqual(null);
  });
});
