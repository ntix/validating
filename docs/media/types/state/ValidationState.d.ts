import { IErrors } from '../errors';
import { IValidationState } from './IValidationState';
export declare class ValidationState<TValue> implements IValidationState<TValue> {
    value: TValue;
    private validate;
    constructor(value: TValue, validate: (v: TValue) => IErrors);
    errors: IErrors;
    invalid: boolean;
    set(value: any): boolean;
}
