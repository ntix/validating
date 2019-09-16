import { IErrors } from './IErrors';

/** A validate function */
export interface IValidate<TValue> {
  (value: TValue): Promise<IErrors>;
}
