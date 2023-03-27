import fs from "fs";
import { Thought } from "../types";
import { MAX_FILE_NAME_SIZE } from "./constants";
import { uppercaseFirstLetter } from "./utils";
export class MarkdownFile {
  private static serializeFrontMatter(thought: Thought) {
    const frontmatter = [];
    frontmatter.push("---");
    frontmatter.push(`creationTime: ${thought.creationTime}`);
    frontmatter.push("---");
    return frontmatter.join("\n");
  }

  private static getFileName(thought: Thought) {
    let titleText = thought.text;
    const newLineIndex = titleText.indexOf("\n");
    //Only place the first line into consideration for the file name
    if (newLineIndex != -1) titleText = titleText.substring(0, newLineIndex);
    titleText = titleText.substring(0, MAX_FILE_NAME_SIZE);
    return uppercaseFirstLetter(titleText);
  }

  static saveThoughtAsMarkdownFile(thought: Thought) {
    const folderPath = process.env.SAVE_FOLDER_PATH;

    //Initialize folder
    if (!fs.existsSync(folderPath!)) {
      fs.mkdirSync(folderPath!);
    }

    const fileData = this.serializeFrontMatter(thought) + "\n\n" + thought.text;
    const filePath = folderPath + "/" + this.getFileName(thought);
    this.saveTextToFile(filePath, ".md", fileData);
  }

  private static async saveTextToFile(
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
