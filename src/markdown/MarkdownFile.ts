import fs from "fs";
import { Thought } from "../types";

export class MarkdownFile {
  private static serializeFrontMatter(thought: Thought) {
    const frontmatter = [];
    frontmatter.push("---");
    frontmatter.push(`creationTime: ${thought.creationTime}`);
    frontmatter.push("---");
    return frontmatter.join("\n");
  }

  private static upperCaseFirstLetter(text: string) {
    return text.substring(0, 1).toUpperCase() + text.substring(1);
  }

  private static getFileNameFromText(text: string) {
    return this.upperCaseFirstLetter(text.substring(0, 60)) + ".md";
  }
  static saveThoughtAsMarkdownFile(thought: Thought) {
    const folderPath = process.env.SAVE_FOLDER_PATH;
    const fileData = this.serializeFrontMatter(thought) + "\n\n" + thought.text;

    //Initialize folder
    if (!fs.existsSync(folderPath!)) {
      fs.mkdirSync(folderPath!);
    }

    const filePath = folderPath + "/" + this.getFileNameFromText(thought.text);
    return fs.promises.writeFile(filePath, fileData);
  }
}
