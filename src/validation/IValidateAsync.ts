import { ValidationErrors } from './ValidationErrors';

/** A validate function */
export type IValidateAsync<TValue> = (
  value: TValue
) => Promise<ValidationErrors<TValue>>;
