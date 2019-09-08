import { Errors } from './IErrors';
export function normalizeErrors(errors) {
    if (typeof errors !== 'object')
        return errors;
    return Object.keys(errors).reduce((result, key) => {
        const value = normalizeErrors(errors[key]);
        return value === Errors.EMPTY
            ? result
            : Object.assign(Object.assign({}, result), { [key]: value });
    }, Errors.EMPTY);
}
