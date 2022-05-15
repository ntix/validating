import { IErrors } from './IErrors';

/** errors returned from validating TValue */
export type ValidationErrors<TValue> = {
  [P in keyof TValue]: IErrors;
} | IErrors;
