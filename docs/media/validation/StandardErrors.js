import { createStandardErrors } from './createStandardErrors';
/**
 * StandardErrors available
 *
 * including EMPTY and negated errors
 *
 * negated error keys are prefixed by 'not' e.g. { notNull: true }
 */
export const StandardErrors = Object.freeze(Object.assign(Object.assign({ EMPTY: Object.freeze({}) }, createStandardErrors()), { not: createStandardErrors(true) }));
