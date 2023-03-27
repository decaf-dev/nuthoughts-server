import mock from "mock-fs";
import fs from "fs";
import FileOperations from "./FileOperations";

beforeEach(() => {
  mock({
    "/existing-dir": {
      "existing-file.md": "test data",
    },
  });
});

describe("initializeFolder", () => {
  test("creates a folder if it doesn't exist", async () => {
    const path = "/empty-dir";

    await FileOperations.initializeFolder(path);
    expect(fs.promises.access(path)).not.toBeInstanceOf(Error);
  });

  test("does nothing if folder already exists", async () => {
    const path = "/existing-dir";

    await FileOperations.initializeFolder(path);
    expect(await fs.promises.access(path)).not.toBeInstanceOf(Error);
  });
});

describe("createFile", () => {
  test("creates a markdown file", async () => {
    const filePath = "/existing-dir/new-file.md";
    await FileOperations.createFile(filePath, "test data");

    const data = await fs.promises.readFile(filePath, "utf-8");
    expect(data).toEqual("test data");
  });

  test("appends a number to the file name if file already exists", async () => {
    const filePath = "/existing-dir/existing-file.md";
    const finalPath = "/existing-dir/existing-file0.md";
    await FileOperations.createFile(filePath, "test data");

    expect(await fs.promises.access(finalPath)).not.toBeInstanceOf(Error);
  });
});

afterEach(() => {
  mock.restore();
});
