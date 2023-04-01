import { InvalidTypesError } from "./InvalidTypesError";
import { Field } from "./types";

export const validateFields = (fields: Field[]) => {
  const invalidFields: Field[] = [];
  fields.forEach((field) => {
    const { value, expectedType, isOptional } = field;
    if (value === undefined && isOptional) {
      //Do nothing
    } else if (typeof value !== expectedType) {
      invalidFields.push(field);
    }
  });
  if (invalidFields.length !== 0) throw new InvalidTypesError(invalidFields);
};

export const getConfigFile = () => {
  const { PORT, SAVE_FOLDER_PATH, ENCRYPTION_KEY } = process.env;
  if (
    PORT === undefined ||
    SAVE_FOLDER_PATH === undefined ||
    ENCRYPTION_KEY === undefined
  )
    throw new Error("Please fill out all variables in .env file");

  if (Buffer.from(ENCRYPTION_KEY, "base64url").length !== 32)
    throw new Error("Encryption key must be 32 bytes");

  return {
    port: parseInt(PORT),
    folderPath: SAVE_FOLDER_PATH,
    encryptionKey: ENCRYPTION_KEY,
  };
};
