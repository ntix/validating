import { ValidationErrors } from '../validation';

export interface IValidationState<TValue> {
  readonly value?: Partial<TValue>;
  readonly errors: ValidationErrors<TValue>;
  readonly invalid: boolean;
}
