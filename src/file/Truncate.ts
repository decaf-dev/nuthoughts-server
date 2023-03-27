import { truncate } from "./utils";

export default class Truncate {
  static MAX_OS_FILE_NAME_LENGTH = 255;

  private static truncateQuestion(text: string) {
    const questionRegex = new RegExp(/\?[\s]{0,}$/);
    if (text.match(questionRegex)) {
      return truncate(text, this.MAX_OS_FILE_NAME_LENGTH);
    }
    return null;
  }

  private static truncateComma(text: string, maxChars: number) {
    const commaIndex = text.lastIndexOf(",");
    if (commaIndex !== -1) {
      if (
        commaIndex > maxChars - 1 &&
        commaIndex < this.MAX_OS_FILE_NAME_LENGTH
      ) {
        return truncate(text, commaIndex);
      }
    }
    return null;
  }

  static smartTruncate(text: string, maxChars: number): string {
    const question = this.truncateQuestion(text);
    if (question) return question;

    const comma = this.truncateComma(text, maxChars);
    if (comma) return comma;

    while (
      !text.charAt(maxChars - 1).match(/\s/) &&
      maxChars < text.length &&
      maxChars < this.MAX_OS_FILE_NAME_LENGTH
    ) {
      return this.smartTruncate(text, maxChars + 1);
    }
    return truncate(text, maxChars);
  }
}
