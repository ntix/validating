import { ValidationErrors, IValidate, IValidateAsync } from '../validation';
import { IValidationState } from './IValidationState';
/** represents state for a value which is validated
 *
 *  useful for user facing components
 */
export declare class ValidationState<TValue> implements IValidationState<TValue> {
    /** validator function */
    readonly validate: IValidate<TValue> | IValidateAsync<TValue>;
    /** value */
    readonly value: TValue;
    constructor(
    /** validator function */
    validate: IValidate<TValue> | IValidateAsync<TValue>, 
    /** value */
    value?: TValue, 
    /** validation errors, will be normalized */
    errors?: ValidationErrors<TValue>);
    /** validation errors */
    readonly errors: ValidationErrors<TValue>;
    /** state is invalid */
    readonly invalid: boolean;
    /** if there are changes calls validation and sets errors and invalid properites
     *
     * @param value     value to validate if changed
     * @param onChange  a function called when change is made
     * @returns         a new state object if there is change, same if not
     */
    set(value: TValue, onChange?: (newState: ValidationState<TValue>) => void): Promise<ValidationState<TValue>>;
}
