import { isEqual } from "../predicates";
import { IErrors, StandardErrors, normalize } from "../validation";
import { IState } from "./IState";

/** represents state for a value which is validated
 *
 *  useful for user facing components
 */
export class State<TValue> implements IState<TValue> {
  constructor(public value: TValue, private validate: (v: TValue) => IErrors) {}

  errors: IErrors;
  invalid: boolean;

  /** if there are changes calls validation and sets errors and invalid properites
   *
   * @param value   value to validate if changed
   * @returns       true if there has been a change and validation was run
   */
  set(value: any): boolean {
    if (isEqual(this.value, value)) return false;

    this.value = value;
    this.errors = this.validate(value);
    this.invalid = normalize(this.errors) !== StandardErrors.EMPTY;

    return true;
  }
}
