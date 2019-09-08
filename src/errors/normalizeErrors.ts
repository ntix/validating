import { IValidationResult, expected } from "./IErrors";

export function normalizeErrors(errors: IValidationResult | string) {
  if (typeof errors !== "object") return errors;

  return Object.keys(errors).reduce((result, key) => {
    const value = normalizeErrors(errors[key]);
    return value === expected.EMPTY
      ? result
      : {
          ...result,
          [key]: value
        };
  }, expected.EMPTY);
}
