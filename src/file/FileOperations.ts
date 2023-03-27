import fs from "fs";

export default class FileOperations {
  static async initializeFolder(path: string) {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
  }

  static async saveTextToFile(
    filePath: string,
    fileExtension: string,
    fileData: string,
    numDuplicates: number = 0
  ) {
    try {
      const file =
        filePath +
        (numDuplicates !== 0 ? numDuplicates - 1 : "") +
        fileExtension;
      await fs.promises.writeFile(file, fileData, {
        flag: "wx",
      });
      console.log("Saved file", file);
    } catch (err: unknown) {
      const error = err as { code?: string };
      if (error.code === "EEXIST") {
        await this.saveTextToFile(
          filePath,
          fileExtension,
          fileData,
          numDuplicates + 1
        );
      }
    }
  }
}
