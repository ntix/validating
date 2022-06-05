import { isString } from './isString';

/** checks values is a number or a string which can be parsed into a number */
export function isNumber(a: any): boolean {
  if (isString(a)) a = Number.parseFloat(a);
  return !isNaN(a) && typeof a === 'number';
}
