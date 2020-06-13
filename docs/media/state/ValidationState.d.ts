import { IErrors, IValidate } from '../validation';
import { IValidationState } from './IValidationState';
/** represents state for a value which is validated
 *
 *  useful for user facing components
 */
export declare class ValidationState<TValue> implements IValidationState<TValue> {
    /** validator function */
    readonly validate: IValidate<Partial<TValue>>;
    /** value */
    readonly value: Partial<TValue>;
    /** validation errors */
    readonly errors: IErrors;
    constructor(
    /** validator function */
    validate: IValidate<Partial<TValue>>, 
    /** value */
    value?: Partial<TValue>, 
    /** validation errors */
    errors?: IErrors);
    /** state is invalid */
    readonly invalid: boolean;
    /** if there are changes calls validation and sets errors and invalid properites
     *
     * @param value     value to validate if changed
     * @param onChange  a function called when change is made
     * @returns         a new state object if there is change, same if not
     */
    set(value: Partial<TValue>, onChange?: (newState: ValidationState<TValue>) => void): Promise<ValidationState<TValue>>;
}
