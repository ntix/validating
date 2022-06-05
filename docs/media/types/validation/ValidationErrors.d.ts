import { IErrors } from './IErrors';
/** errors returned from validating TValue */
export declare type ValidationErrors<TValue> = {
  [P in {
    [K in keyof TValue]: TValue[K] extends Function ? never : K;
  }[keyof TValue]]: IErrors;
} & IErrors;
