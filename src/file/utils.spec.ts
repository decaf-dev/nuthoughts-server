import { uppercaseFirstLetter } from "./utils";

describe("uppercaseFirstLetter", () => {
  test("uppercases first letter", () => {
    expect(uppercaseFirstLetter("test")).toEqual("Test");
  });
});
