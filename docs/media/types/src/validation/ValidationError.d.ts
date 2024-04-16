import { ValidationErrors } from './ValidationErrors';
/**
 * An error object for validation errors on type T
 */
export declare class ValidationError<T> extends Error {
    constructor(rawErrors: ValidationErrors<T>, message?: string);
    /** validation errors for type T */
    readonly errors: ValidationErrors<T>;
}
