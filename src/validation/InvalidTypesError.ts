import { Field } from "./types";

export class InvalidTypesError extends Error {
  constructor(fields: Field[]) {
    super(
      `Invalid type on fields: [${fields
        .map((field) => field.name)
        .join(",")}]. Received: [${fields.map(
        (field) => typeof field.value
      )}]. Expected: [${fields.map((field) => field.expectedType)}].`
    );
    this.name = "InvalidTypesError";
  }
}
