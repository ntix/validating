import {
  IErrors,
  StandardErrors,
  IStandardErrors,
  IRule,
  createError
} from './validation';
import { isEqual, isNumber, isString } from './predicates';

export class Validator {
  private readonly expected: IStandardErrors;

  constructor(private negate: boolean = false) {
    this.expected = negate ? StandardErrors.not : StandardErrors;
  }

  get not(): Validator {
    return new Validator(!this.negate);
  }

  null(a: any): IErrors {
    return this.exec(a == null, this.expected.null);
  }

  number(a: any): IErrors {
    return this.exec(isNumber(a), this.expected.number);
  }

  string(a: any): IErrors {
    return this.exec(isString(a), this.expected.string);
  }

  equal(a: any, b: any): IErrors {
    return this.exec(isEqual(a, b), this.expected.equal(b));
  }

  maxLength(a: string, max: number): IErrors {
    return this.exec(!a || a.length <= max, this.expected.maxLength(max));
  }

  minLength(a: string, min: number): IErrors {
    return this.exec(!a || a.length >= min, this.expected.minLength(min));
  }

  max(a: number, max: number): IErrors {
    return this.exec(a <= max, this.expected.max(max));
  }

  min(a: number, min: number): IErrors {
    return this.exec(a >= min, this.expected.min(min));
  }

  includes(a: any, b: any): IErrors {
    return this.exec(a.includes(b), this.expected.includes(b));
  }

  matches(
    value: string,
    re: RegExp | string,
    description: string = null
  ): IErrors {
    return this.exec(
      new RegExp(re).test(value),
      this.expected.matches(description || re)
    );
  }

  rule(rule: IRule): IErrors {
    return this.exec(
      rule.result,
      createError(this.negate, rule.errorKey, rule.errorValue)
    );
  }

  private exec(result: boolean, failure: IErrors) {
    return (this.negate ? !result : result) ? StandardErrors.EMPTY : failure;
  }
}

export const validate = new Validator();
