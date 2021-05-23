import { createError } from "./createError";
/** creates all standard errors
 *
 * @param not prefixes all capitalised keys with a 'not' e.g. { notNull: true }
 *
 * @returns standard errors
 */
export function createStandardErrors(not = false) {
    return Object.freeze({
        null: createError(not, "null"),
        number: createError(not, "number"),
        string: createError(not, "string"),
        equal: (to) => createError(not, "equal", to),
        maxLength: (max) => createError(not, "maxLength", max),
        minLength: (min) => createError(not, "minLength", min),
        max: (max) => createError(not, "max", max),
        min: (min) => createError(not, "min", min),
        includes: (value) => createError(not, "includes", value),
        matches: (re) => createError(not, "matches", re)
    });
}
