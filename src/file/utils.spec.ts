import {
  firstLine,
  getFilePathExtension,
  truncateToLastWord,
  uppercaseFirstLetter,
} from "./utils";

describe("uppercaseFirstLetter", () => {
  test("uppercases first letter", () => {
    const result = uppercaseFirstLetter("test");
    expect(result).toEqual("Test");
  });
});

describe("truncateToLastWord", () => {
  test("returns a string with no white space", () => {
    const maxChars = 5;
    const result = truncateToLastWord("abc\n\n\n", maxChars);
    expect(result).toEqual("abc");
  });

  test("returns the end of the word", () => {
    const maxChars = 5;
    const result = truncateToLastWord("abc 123", maxChars);
    expect(result).toEqual("abc 123");
  });

  test("returns max file name size (255 characters)", () => {
    const maxChars = 60;
    const string = Array(256).fill("a").join(""); //This is one word

    const result = truncateToLastWord(string, maxChars);
    const expectedResult = Array(255).fill("a").join("");
    expect(result).toEqual(expectedResult);
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
