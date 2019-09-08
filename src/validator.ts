import { IValidationResult, expected, IValidationExpectations } from "./errors";
import { isEqual, isNumber, isString } from "./predicates";

export class Validator {
  private readonly expected: IValidationExpectations;

  constructor(private negate: boolean = false) {
    this.expected = negate ? expected.not : expected;
  }

  get not(): Validator {
    return new Validator(!this.negate);
  }

  null(a: any): IValidationResult {
    return this.exec(a == null, this.expected.null);
  }

  number(a: any): IValidationResult {
    return this.exec(isNumber(a), this.expected.number);
  }

  string(a: any): IValidationResult {
    return this.exec(isString(a), this.expected.string);
  }

  equal(a: any, b: any): IValidationResult {
    return this.exec(isEqual(a, b), this.expected.equal(b));
  }

  maxLength(a: string, max: number): IValidationResult {
    return this.exec(a.length <= max, this.expected.maxLength(max));
  }

  minLength(a: string, min: number): IValidationResult {
    return this.exec(a.length <= min, this.expected.minLength(min));
  }

  max(a: number, max: number): IValidationResult {
    return this.exec(a <= max, this.expected.max(max));
  }

  min(a: number, min: number): IValidationResult {
    return this.exec(a >= min, this.expected.min(min));
  }

  private exec(result: boolean, failure: IValidationResult) {
    return (this.negate ? !result : result) ? expected.EMPTY : failure;
  }
}

export const validate = new Validator();
