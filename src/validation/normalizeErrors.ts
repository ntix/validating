import { IErrors } from './IErrors';
import { StandardErrors } from './StandardErrors';

/** normalize a validation result, by removing empty sub-properties
 *
 * @param errors  any result from a validation function
 *
 * @returns       the result with empty sub-properties removed
 */
export function normalizeErrors(errors: IErrors | any): IErrors | any {
  if (errors == null || typeof errors !== 'object') return errors;

  return Object.keys(errors).reduce((result, key) => {
    const value = normalizeErrors(errors[key]);

    return value === StandardErrors.EMPTY
      ? result
      : {
        ...result,
        [key]: value,
      };
  }, StandardErrors.EMPTY);
}

/**
 * @deprecated use normalizeErrors
 */
export function normalize(errors: IErrors | any): IErrors | any {

  return normalizeErrors(errors);
}