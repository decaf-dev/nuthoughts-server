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
  static saveThoughtAsMarkdownFile(thought: Thought) {
    const folderPath = process.env.SAVE_FOLDER_PATH;
    const fileData = this.serializeFrontMatter(thought) + "\n\n" + thought.text;

    //Initialize folder
    if (!fs.existsSync(folderPath!)) {
      fs.mkdirSync(folderPath!);
    }

    const filePath = folderPath + "/" + thought.text.substring(0, 60) + ".md";
    return fs.promises.writeFile(filePath, fileData);
  }
}
