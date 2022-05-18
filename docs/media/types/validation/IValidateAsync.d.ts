import { ValidationErrors } from './ValidationErrors';
export interface IValidateAsync<TValue> {
  (value: TValue): Promise<ValidationErrors<TValue>>;
}
