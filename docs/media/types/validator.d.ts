import { IErrors, IRule } from './validation';
export declare class Validator {
    private negate;
    private readonly expected;
    constructor(negate?: boolean);
    get not(): Validator;
    null(a: any): IErrors;
    number(a: any): IErrors;
    string(a: any): IErrors;
    equal(a: any, b: any): IErrors;
    maxLength(a: string, max: number): IErrors;
    minLength(a: string, min: number): IErrors;
    max(a: number, max: number): IErrors;
    min(a: number, min: number): IErrors;
    includes(a: any, b: any): IErrors;
    matches(value: string, re: RegExp | string, description?: string): IErrors;
    rule(rule: IRule): IErrors;
    private exec;
}
export declare const validate: Validator;
