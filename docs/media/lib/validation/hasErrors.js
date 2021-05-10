import { isEmpty } from '../predicates';
/** Checks an error object for errors optionally on a given path */
export function hasErrors(errors, path) {
    if (errors == null || isEmpty(errors))
        return false;
    if (!path)
        return true;
    let i = path.indexOf('.');
    if (i === -1)
        i = path.length;
    return hasErrors(errors[path.substring(0, i)], path.substring(i + 1));
}
//# sourceMappingURL=hasErrors.js.map