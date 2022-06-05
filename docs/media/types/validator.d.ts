import { IRule, IErrors } from './validation';
export declare class Validator {
    private negate;
    private readonly expected;
    constructor(negate?: boolean);
    get not(): Validator;
    /**
     * value should be null
     *
     * @param a value
     * @returns errors
     */
    null(a: any): IErrors;
    /**
     * value should be a number
     *
     * @param a value
     * @returns errors
     */
    number(a: any): IErrors;
    /**
     * value should be a string
     *
     * @param a value
     * @returns errors
     */
    string(a: any): IErrors;
    /**
     * values should be equal
     *
     * @param a 1st value to compare
     * @param b 2nd value to compare
     * @returns errors
     */
    equal(a: any, b: any): IErrors;
    /**
     * value should not me more than
     *
     * @param a value
     * @param max maximum number value
     * @returns errors
     */
    maxLength(a: string, max: number): IErrors;
    /**
     * value should not be less than
     *
     * @param a value
     * @param min minimum number value
     * @returns errors
     */
    minLength(a: string, min: number): IErrors;
    /**
     * value should not me more than
     *
     * @param a value
     * @param max maximum value
     * @returns errors
     */
    max(a: number, max: number): IErrors;
    /**
     * value should not be less than
     *
     * @param a value
     * @param min minimum value
     * @returns errors
     */
    min(a: number, min: number): IErrors;
    /**
     * 1st value includes second
     *
     * @param a iterable value, eg string or array
     * @param b value to find
     * @returns errors
     */
    includes(a: any, b: any): IErrors;
    /**
     * value must match regex
     *
     * @param value string value
     * @param re regular expression
     * @param description error description
     * @returns errors
     */
    matches(value: string, re: RegExp | string, description?: string): IErrors;
    /**
     * value must pass the rule
     *
     * @param rule rule
     * @returns errors
     */
    rule(rule: IRule): IErrors;
    private exec;
}
