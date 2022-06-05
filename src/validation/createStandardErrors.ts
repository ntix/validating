import { createError } from './createError';
import { IStandardErrorProviders } from "./IStandardErrorProviders";

/** creates all standard errors
 *
 * @param not prefixes all capitalised keys with a 'not' e.g. { notNull: true }
 *
 * @returns standard errors
 */
export function createStandardErrors(not: boolean = false)
  : IStandardErrorProviders {

  return Object.freeze({
    null: createError(not, 'null'),
    number: createError(not, 'number'),
    string: createError(not, 'string'),
    equal: (to: any) => createError(not, 'equal', to),
    maxLength: (max: number) => createError(not, 'maxLength', max),
    minLength: (min: number) => createError(not, 'minLength', min),
    max: (max: number) => createError(not, 'max', max),
    min: (min: number) => createError(not, 'min', min),
    includes: (value: any) => createError(not, 'includes', value),
    matches: (re: RegExp | string) => createError(not, 'matches', re),
  });
}
