import { IErrors } from "../validation";
import { IState } from "./IState";
/** represents state for a value which is validated
 *
 *  useful for user facing components
 */
export declare class State<TValue> implements IState<TValue> {
    value: TValue;
    private validate;
    constructor(value: TValue, validate: (v: TValue) => IErrors);
    errors: IErrors;
    invalid: boolean;
    /** if there are changes calls validation and sets errors and invalid properites
     *
     * @param value   value to validate if changed
     * @returns       true if there has been a change and validation was run
     */
    set(value: any): boolean;
}
