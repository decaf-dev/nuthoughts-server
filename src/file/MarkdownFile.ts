import { Thought } from "../types";
import { FILE_NAME_LENGTH } from "./constants";
import FileOperations from "./FileOperations";
import { uppercaseFirstLetter } from "./utils";

export default class MarkdownFile {
  static _serializeFrontMatter(thought: Thought) {
    const frontmatter = [];
    frontmatter.push("---");
    frontmatter.push(`creationTime: ${thought.creationTime}`);
    frontmatter.push("---");
    return frontmatter.join("\n");
  }

  static _getFileName(thought: Thought) {
    let titleText = thought.text;
    const newLineIndex = titleText.indexOf("\n");

    //Only place the first line into consideration for the file name
    if (newLineIndex != -1) titleText = titleText.substring(0, newLineIndex);
    titleText = titleText.substring(0, FILE_NAME_LENGTH);
    return uppercaseFirstLetter(titleText);
  }

  static async saveThoughtAsMarkdownFile(thought: Thought) {
    const folderPath = process.env.SAVE_FOLDER_PATH;
    await FileOperations.initializeFolder(folderPath!);

    const fileData =
      this._serializeFrontMatter(thought) + "\n\n" + thought.text;
    const filePath = folderPath + "/" + this._getFileName(thought);
    await FileOperations.saveTextToFile(filePath, ".md", fileData);
  }
}
