import {
  firstLine,
  getFilePathExtension,
  truncateString,
  uppercaseFirstLetter,
} from "./utils";

describe("uppercaseFirstLetter", () => {
  test("uppercases first letter", () => {
    const result = uppercaseFirstLetter("test");
    expect(result).toEqual("Test");
  });
});

describe("truncateString", () => {
  test("cuts off characters after 3", () => {
    const result = truncateString("abcdef", 3);
    expect(result).toEqual("abc");
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
