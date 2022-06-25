import { IErrors } from './IErrors';
/** normalize a validation result, by removing empty sub-properties
 *
 * @param errors  any result from a validation function
 *
 * @returns       the result with empty sub-properties removed
 */
export declare function normalizeErrors(errors: IErrors | any): IErrors | any;
/**
 * @deprecated use normalizeErrors
 */
export declare function normalize(errors: IErrors | any): IErrors | any;
