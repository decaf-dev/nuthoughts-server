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

export const isObject = (obj: unknown) => {
  return typeof obj === "object" && !Array.isArray(obj) && obj !== null;
};
