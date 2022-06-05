import { IErrors } from './IErrors';
/** Creates a frozen error object
 *
 * @param not         when set will prefix the capitalised error key with 'not'
 * @param errorKey    key value for an error e.g. { someKey: true }
 * @param errorValue  value associated with the key e.g. { key: 'some value' }
 *
 * @returns           a frozen error object
 */
export declare function createError(
  not: boolean,
  errorKey: string,
  errorValue?: any
): IErrors;
