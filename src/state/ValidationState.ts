import { isEqual } from "../predicates";
import { IValidationResult, expected, normalizeErrors } from "../errors";
import { IValidationState } from "./IValidationState";

export class ValidationState<TValue> implements IValidationState<TValue> {
  constructor(
    public value: TValue,
    private validate: (v: TValue) => IValidationResult
  ) {}

  errors: IValidationResult;
  invalid: boolean;

  set(value: any): boolean {
    if (isEqual(this.value, value)) return false;
    this.value = value;
    this.errors = this.validate(value);
    this.invalid = normalizeErrors(this.errors) !== expected.EMPTY;
    return true;
  }
}
