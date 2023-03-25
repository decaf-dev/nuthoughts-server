import { TextBlock } from "../types";
import fs from "fs";

export class MarkdownFile {
  private static serializeFrontMatter(block: TextBlock) {
    const frontmatter = [];
    frontmatter.push("---");
    frontmatter.push(`submissionTime: ${block.submissionTime}`);
    frontmatter.push("---");
    return frontmatter.join("\n");
  }
  static saveBlockAsMarkdownFile(block: TextBlock) {
    const folderPath = process.env.SAVE_FOLDER_PATH;
    const fileData = this.serializeFrontMatter(block) + "\n\n" + block.text;

    //Initialize folder
    if (!fs.existsSync(folderPath!)) {
      fs.mkdirSync(folderPath!);
    }

    const filePath = folderPath + "/" + block.text.substring(0, 60) + ".md";
    return fs.promises.writeFile(filePath, fileData);
  }
}
