import { capitalize } from "../utils";

export const expected = Object.freeze({
  EMPTY: {},
  ...expectations(),
  not: expectations(true)
});

export interface IValidationResult {
  [key: string]: IValidationResult | any;
}

export interface IValidationExpectations {
  null: IValidationResult;
  number: IValidationResult;
  string: IValidationResult;
  equal: (to: any) => IValidationResult;
  maxLength: (max: number) => IValidationResult;
  minLength: (min: number) => IValidationResult;
  max: (max: number) => IValidationResult;
  min: (min: number) => IValidationResult;
}

function expectations(not: boolean = false): IValidationExpectations {
  return Object.freeze({
    null: expectation("null", not),
    number: expectation("number", not),
    string: expectation("string", not),
    equal: (to: any) => expectation("equal", not, to),
    maxLength: (max: number) => expectation("maxLength", not, max),
    minLength: (min: number) => expectation("minLength", not, min),
    max: (max: number) => expectation("max", not, max),
    min: (min: number) => expectation("min", not, min)
  });
}

function expectation(
  errorKey: string,
  not: boolean,
  errorValue: any = true
): IValidationResult {
  return Object.freeze({
    [not ? `not${capitalize(errorKey)}` : errorKey]: errorValue
  });
}
