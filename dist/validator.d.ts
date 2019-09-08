import { IErrors } from './errors';
export declare class Validator {
    private errors;
    private negated;
    constructor(errors: IErrors, negated?: boolean);
    readonly not: Validator;
    private exec;
    required(a: any): IErrors;
    null(a: any): IErrors;
    equal<T>(a: T, b: T): IErrors;
    minLength(v: string, min: number): IErrors;
    maxLength(v: string, max: number): IErrors;
}
export declare const validate: Validator;
