export type Field = {
  name: string;
  value: unknown;
  expectedType: "string" | "number" | "boolean";
  isOptional?: boolean;
};
