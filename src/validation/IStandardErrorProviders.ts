import { IErrors } from './IErrors';

/** Standard error providers */

export interface IStandardErrorProviders {
  null: IErrors;
  number: IErrors;
  string: IErrors;
  equal: (to: any) => IErrors;
  maxLength: (max: number) => IErrors;
  minLength: (min: number) => IErrors;
  max: (max: number) => IErrors;
  min: (min: number) => IErrors;
  includes: (value: any) => IErrors;
  matches: (re: RegExp | string) => IErrors;
}
