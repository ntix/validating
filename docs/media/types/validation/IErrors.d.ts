/** interface for validation results, i.e. errors */
export interface IErrors {
  [key: string]: IErrors | any;
}
