import { IErrors } from "./IErrors";

/** available standard errors */
export interface IStandardErrors {
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
