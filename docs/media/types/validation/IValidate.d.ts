import { ValidationErrors } from './ValidationErrors';
/** A validate function */
export declare type IValidate<TValue> = (value: TValue) => ValidationErrors<TValue>;
