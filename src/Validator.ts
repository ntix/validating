import {
  StandardErrors,
  IRule,
  createError,
  IStandardErrorProviders,
  IErrors
} from './validation';
import { isEqual, isNumber, isString } from './predicates';

export class Validator {
  private readonly expected: IStandardErrorProviders;

  constructor(private negate: boolean = false) {
    this.expected = negate ? StandardErrors.not : StandardErrors;
  }

  get not(): Validator {
    return new Validator(!this.negate);
  }

  /**
   * value should be null
   *
   * @param value value
   * @returns errors
   */
  null(value: any) {
    return this.exec(value == null, this.expected.null);
  }

  /**
   * value should be a number
   *
   * @param value value
   * @returns errors
   */
  number(value: any) {
    return this.exec(value == null || isNumber(value), this.expected.number);
  }

  /**
   * value should be a string
   *
   * @param value value
   * @returns errors
   */
  string(value: any) {
    return this.exec(value == null || isString(value), this.expected.string);
  }

  /**
   * values should be equal
   *
   * @param a 1st value to compare
   * @param b 2nd value to compare
   * @returns errors
   */
  equal(a: any, b: any) {
    return this.exec(isEqual(a, b), this.expected.equal(b));
  }

  /**
   * value should not me more than
   *
   * @param value value
   * @param max maximum number value
   * @returns errors
   */
  maxLength(value: string | null, max: number) {
    return this.exec(value == null || value.length <= max, this.expected.maxLength(max));
  }

  /**
   * value should not be less than
   *
   * @param value value
   * @param min minimum number value
   * @returns errors
   */
  minLength(value: string | null, min: number) {
    return this.exec(value == null || value.length >= min, this.expected.minLength(min));
  }

  /**
   * value should not me more than
   *
   * @param value value
   * @param max maximum value
   * @returns errors
   */
  max(value: number | null, max: number) {
    return this.exec(value == null || value <= max, this.expected.max(max));
  }

  /**
   * value should not be less than
   *
   * @param value value
   * @param min minimum value
   * @returns errors
   */
  min(value: number | null, min: number) {
    return this.exec(value == null || value >= min, this.expected.min(min));
  }

  /**
   * 1st value includes second
   *
   * @param a iterable value, eg string or array
   * @param b value to find
   * @returns errors
   */
  includes(a: any, b: any) {
    return this.exec(a == null || a.includes(b), this.expected.includes(b));
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
    value: string | null,
    re: RegExp | string,
    description: string | null = null
  ) {
    return this.exec(
      value == null || new RegExp(re).test(value),
      this.expected.matches(description || re)
    );
  }

  /**
   * value must pass the rule
   *
   * @param rule rule
   * @returns errors
   */
  rule(rule: IRule) {
    return this.exec(
      rule.result,
      createError(this.negate, rule.errorKey, rule.errorValue)
    );
  }

  private exec<TFailure>(result: boolean, failure: TFailure): IErrors {
    return (this.negate ? !result : result)
      ? StandardErrors.EMPTY
      : failure;
  }
}
