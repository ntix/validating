import { IStandardErrors } from './IStandardErrors';
/** creates all standard errors
 *
 * @param not prefixes all capitalised keys with a 'not' e.g. { notNull: true }
 *
 * @returns standard errors
 */
export declare function createStandardErrors(not?: boolean): IStandardErrors;
