import { isEmpty } from '../predicates';
import { IErrors } from './IErrors';
import { normalizeErrors } from './normalizeErrors';

/** Checks an error object for errors optionally on a given path
 * 
 * normalises the errors object first
 */
export function hasErrors(errors: IErrors, path?: string): boolean {

  return _hasErrors(normalizeErrors(errors), path);
}

function _hasErrors(errors: IErrors, path?: string): boolean {
  if (errors == null || isEmpty(errors)) return false;
  if (!path) return true;

  let i = path.indexOf('.');
  if (i === -1) i = path.length;

  return _hasErrors(errors[path.substring(0, i)], path.substring(i + 1));
}