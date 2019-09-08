import { IErrors } from '../errors';
export interface IValidationState<TValue> {
    value: TValue;
    errors: IErrors;
    invalid: boolean;
}
