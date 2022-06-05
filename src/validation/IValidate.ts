import { ValidationErrors } from './ValidationErrors';

/** A validate function */
export type IValidate<TValue> = (value: TValue) => ValidationErrors<TValue>;
