import fs from "fs";
import { getFilePathExtension } from "./utils";

export default class FileOperations {
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
