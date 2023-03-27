export const uppercaseFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const truncateString = (text: string, numChars: number) => {
  return text.substring(0, numChars);
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
