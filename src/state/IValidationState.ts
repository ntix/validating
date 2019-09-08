import { IValidationResult } from "../errors";

export interface IValidationState<TValue> {
  value: TValue;
  errors: IValidationResult;
  invalid: boolean;
}
