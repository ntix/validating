import { normalizeErrors } from './normalizeErrors';
/**
 * An error object for validation errors on type T
 */
export class ValidationError extends Error {
    constructor(rawErrors, message = 'validation failed') {
        super(message);
        this.errors = normalizeErrors(rawErrors);
    }
}
