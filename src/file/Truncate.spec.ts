import Truncate from "./Truncate";

describe("smartTruncate", () => {
  test("returns a string with no white space", () => {
    const result = Truncate.smartTruncate("abc\n\n", 5);
    expect(result).toEqual("abc");
  });

  test("returns whole line if there is a question mark", () => {
    const result = Truncate.smartTruncate("what is love?", 5);
    expect(result).toEqual("what is love?");
  });

  test("seeks out more characters to return up to a comma", () => {
    const result = Truncate.smartTruncate("roses are red, violets are blue", 5);
    expect(result).toEqual("roses are red");
  });

  test("seeks out more characters to return a full word", () => {
    const result = Truncate.smartTruncate("word1 word2", 8);
    expect(result).toEqual("word1 word2");
  });

  test("returns max OS file name size", () => {
    const string = Array(256).fill("a").join(""); //This is one word
    const result = Truncate.smartTruncate(string, 60);
    expect(result.length).toEqual(255);
  });
});
