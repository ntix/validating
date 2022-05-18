import { ValidationErrors } from './ValidationErrors';
/** A validate function */
export interface IValidate<TValue> {
  (value: TValue): ValidationErrors<TValue>;
}
