import fs from "fs";
import { getFilePathExtension } from "./utils";

export default class FileOperations {
  /**
   * Creates a folder if it doesn't exist
   * @param path - The path to the folder to initialize
   */
  static async initializeFolder(path: string) {
    try {
      await fs.promises.access(path);
    } catch (err) {
      const error = err as { code?: string };
      if (error.code === "ENOENT") {
        await fs.promises.mkdir(path);
      } else {
        throw err;
      }
    }
  }

  /**
   * Creates a file.
   * If the file name already exists, it will append a number to the end of the file name.
   *
   * @param filePath - the path to the file to create
   * @param fileData - the data to write to the file
   * @param numExisting - the number of existing files with the same name
   * @throws {SyntaxError} if the file does not have an extension e.g. "folder/thought"
   * @throws {Error} if `promises.write.file` returns an error code besides `EEXIST`
   *
   * @example
   * //the file "folder/thought.md" already exists
   * createFile("folder/thought.md", "Hello World");
   * //creates the file "folder/thought0.md"
   *
   */
  static async createFile(
    filePath: string,
    fileData: string,
    numExisting: number = 0
  ) {
    try {
      const filePathExtension = getFilePathExtension(filePath);
      if (filePathExtension == null)
        throw new SyntaxError("File must include an extension");
      const { pathWithoutExtension, extension } = filePathExtension;
      const file =
        pathWithoutExtension +
        (numExisting !== 0 ? numExisting - 1 : "") +
        extension;
      await fs.promises.writeFile(file, fileData, {
        flag: "wx",
      });
    } catch (err: unknown) {
      const error = err as { code?: string };
      if (error.code === "EEXIST") {
        await this.createFile(filePath, fileData, numExisting + 1);
      } else {
        throw err;
      }
    }
  }
}
