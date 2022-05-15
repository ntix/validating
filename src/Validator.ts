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

  /**
   * value should be null
   *
   * @param a value
   * @returns errors
  */
  null(a: any): IErrors {
    return this.exec(a == null, this.expected.null);
  }

  /**
   * value should be a number
   *
   * @param a value
   * @returns errors
   */
  number(a: any): IErrors {
    return this.exec(isNumber(a), this.expected.number);
  }

  /**
   * value should be a string
   *
   * @param a value
   * @returns errors
   */
  string(a: any): IErrors {
    return this.exec(isString(a), this.expected.string);
  }

  /**
   * values should be equal
   *
   * @param a 1st value to compare
   * @param b 2nd value to compare
   * @returns errors
   */
  equal(a: any, b: any): IErrors {
    return this.exec(isEqual(a, b), this.expected.equal(b));
  }

  /**
   * value should not me more than
   *
   * @param a value
   * @param max maximum number value
   * @returns errors
   */
  maxLength(a: string, max: number): IErrors {
    return this.exec(!a || a.length <= max, this.expected.maxLength(max));
  }

  /**
   * value should not be less than
   *
   * @param a value
   * @param min minimum number value
   * @returns errors
   */
  minLength(a: string, min: number): IErrors {
    return this.exec(!a || a.length >= min, this.expected.minLength(min));
  }

  /**
   * value should not me more than
   *
   * @param a value
   * @param max maximum value
   * @returns errors
   */
  max(a: number, max: number): IErrors {
    return this.exec(a <= max, this.expected.max(max));
  }

  /**
   * value should not be less than
   *
   * @param a value
   * @param min minimum value
   * @returns errors
   */
  min(a: number, min: number): IErrors {
    return this.exec(a >= min, this.expected.min(min));
  }

  /**
   * 1st value includes second
   *
   * @param a iterable value, eg string or array
   * @param b value to find
   * @returns errors
   */
  includes(a: any, b: any): IErrors {
    return this.exec(a.includes(b), this.expected.includes(b));
  }

  /**
   * value must match regex
   *
   * @param value string value
   * @param re regular expression
   * @param description error description
   * @returns errors
   */
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

  /**
   * value must pass the rule
   *
   * @param rule rule
   * @returns errors
   */
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
