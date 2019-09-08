import { IErrors } from "../validation";

/** state interface */
export interface IState<TValue> {
  value: TValue;
  errors: IErrors;
  invalid: boolean;
}
