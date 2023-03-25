import { InvalidTypesError } from "./InvalidTypesError";
import { Field } from "./types";

export const validateFields = (fields: Field[]) => {
  const invalidFields: Field[] = [];
  fields.forEach((field) => {
    const { value, expectedType, isOptional } = field;
    if (value === undefined && isOptional) {
      //Do nothing
    } else if (value !== expectedType) {
      invalidFields.push(field);
    }
  });
  throw new InvalidTypesError(invalidFields);
};

export const isObject = (obj: unknown) => {
  return typeof obj === "object" && !Array.isArray(obj) && obj !== null;
};
