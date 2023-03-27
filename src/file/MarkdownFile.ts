import { Thought } from "../types";
import FileOperations from "./FileOperations";
import { firstLine, truncateString, uppercaseFirstLetter } from "./utils";

export default class MarkdownFile {
  private static FILE_NAME_LENGTH = 60;

  private static serializeFrontMatter(creationTime: number) {
    const frontmatter = [];
    frontmatter.push("---");
    frontmatter.push(`creationTime: ${creationTime}`);
    frontmatter.push("---");
    return frontmatter.join("\n");
  }

  private static buildFileData(thought: Thought) {
    const fileData = [];
    fileData.push(this.serializeFrontMatter(thought.creationTime));
    fileData.push("\n");
    fileData.push("\n");
    fileData.push(thought.text);
    return fileData.join("");
  }

  private static getFileName(thought: Thought) {
    const line = firstLine(thought.text);
    const fileName = truncateString(line, this.FILE_NAME_LENGTH);
    return uppercaseFirstLetter(fileName);
  }

  private static getFilePath(folderPath: string, thought: Thought) {
    const fileName = this.getFileName(thought);
    return folderPath + "/" + fileName + ".md";
  }

  static async saveThought(saveFolderPath: string, thought: Thought) {
    await FileOperations.initializeFolder(saveFolderPath);

    const fileData = this.buildFileData(thought);
    const filePath = this.getFilePath(saveFolderPath, thought);
    await FileOperations.createFile(filePath, fileData);
  }
}
