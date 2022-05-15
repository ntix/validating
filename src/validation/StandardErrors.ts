import { createStandardErrors } from './createStandardErrors';
import { IErrors } from './IErrors';

/**
 * StandardErrors available
 *
 * including EMPTY and negated errors
 *
 * negated error keys are prefixed by 'not' e.g. { notNull: true } */
export const StandardErrors: IErrors = Object.freeze({
  EMPTY: Object.freeze({}),
  ...createStandardErrors(),
  not: createStandardErrors(true)
});
