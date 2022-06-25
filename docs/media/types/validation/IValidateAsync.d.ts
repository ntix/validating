import { ValidationErrors } from './ValidationErrors';
/** A validate function */
export declare type IValidateAsync<TValue> = (value: TValue) => Promise<ValidationErrors<TValue>>;
