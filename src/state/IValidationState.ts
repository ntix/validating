import { IErrors } from '../validation';

export interface IValidationState<TValue> {
  readonly value?: Partial<TValue>;
  readonly errors: IErrors;
  readonly invalid: boolean;
}
