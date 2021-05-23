import { isEqual } from '../predicates';
import { IErrors, StandardErrors, IValidate, normalize } from '../validation';
import { IValidationState } from './IValidationState';

/** represents state for a value which is validated
 *
 *  useful for user facing components
 */
export class ValidationState<TValue> implements IValidationState<TValue> {
  constructor(
    /** validator function */
    public readonly validate: IValidate<TValue>,
    /** value */
    public readonly value: TValue = null,
    /** validation errors, will be normalized */
    errors: IErrors = StandardErrors.EMPTY
  ) {
    if (validate == null) throw new Error('validate is required');

    this.errors = normalize(errors);
    this.invalid = this.errors !== StandardErrors.EMPTY;
  }

  /** validation errors */
  readonly errors: IErrors = StandardErrors.EMPTY
  /** state is invalid */
  readonly invalid: boolean = false;

  /** if there are changes calls validation and sets errors and invalid properites
   *
   * @param value     value to validate if changed
   * @param onChange  a function called when change is made
   * @returns         a new state object if there is change, same if not
   */
  async set(
    value: TValue,
    onChange?: (newState: ValidationState<TValue>) => void
  ): Promise<ValidationState<TValue>> {
    if (isEqual(this.value, value)) return this;

    const errors = await this.validate(value);
    const newState = new ValidationState<TValue>(this.validate, value, errors);

    if (onChange) onChange(newState);

    return newState;
  }
}
