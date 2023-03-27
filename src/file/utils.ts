export const uppercaseFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const truncateToLastWord = (text: string, maxChars: number): string => {
  while (
    !text.charAt(maxChars - 1).match(/\s/) &&
    maxChars < text.length &&
    maxChars < 255
  ) {
    return truncateToLastWord(text, maxChars + 1);
  }
  return text.substring(0, maxChars).trim();
};

export const firstLine = (text: string) => {
  const newLineIndex = text.indexOf("\n");
  if (newLineIndex != -1) return text.substring(0, newLineIndex);
  return text;
};

export const getFilePathExtension = (filePath: string) => {
  const periodIndex = filePath.indexOf(".");
  if (periodIndex != -1) {
    return {
      pathWithoutExtension: filePath.substring(0, periodIndex),
      extension: filePath.substring(periodIndex),
    };
  }
  return null;
};
