import { IErrors } from './IErrors';
/** Checks an error object for errors optionally on a given path
 *
 * normalises the errors object first
 */
export declare function hasErrors(errors: IErrors, path?: string): boolean;
