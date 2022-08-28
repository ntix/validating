import { normalizeErrors } from './normalizeErrors';
import { ValidationErrors } from './ValidationErrors';

/**
 * An error object for validation errors on type T
 */
export class ValidationError<T> extends Error {
  constructor(
    rawErrors: ValidationErrors<T>,
    message: string = 'validation failed'
  ) {
    super(message);

    this.errors = normalizeErrors(rawErrors);
  }

  /** validation errors for type T */
  readonly errors: ValidationErrors<T>;
}
