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
  const { PORT, SAVE_FOLDER_PATH, ENCRYPTION_PASSWORD, ENCRYPTION_SALT } =
    process.env;
  if (
    PORT === undefined ||
    SAVE_FOLDER_PATH === undefined ||
    ENCRYPTION_PASSWORD === undefined ||
    ENCRYPTION_SALT === undefined
  )
    throw new Error("Please fill out all variables in .env file");

  if (ENCRYPTION_PASSWORD.length < 24)
    throw new Error("Encryption password must be at least 24 characters long");
  if (ENCRYPTION_SALT.length < 8)
    throw new Error("Encryption salt must be at least 8 characters long");

  return {
    port: parseInt(PORT),
    folderPath: SAVE_FOLDER_PATH,
    encryptionPassword: ENCRYPTION_PASSWORD,
    encryptionSalt: ENCRYPTION_SALT,
  };
};
