(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.validating = {}));
})(this, (function (exports) { 'use strict';

    /** capitalise a string */
    function capitalize(value) {
        return !value ? value : value[0].toUpperCase() + value.substr(1);
    }

    /** Creates a frozen error object
     *
     * @param not         when set will prefix the capitalised error key with 'not'
     * @param errorKey    key value for an error e.g. { someKey: true }
     * @param errorValue  value associated with the key e.g. { key: 'some value' }
     *
     * @returns           a frozen error object
     */
    function createError(not, errorKey, errorValue = true) {
        return Object.freeze({
            [not ? `not${capitalize(errorKey)}` : errorKey]: errorValue,
        });
    }

    /** creates all standard errors
     *
     * @param not prefixes all capitalised keys with a 'not' e.g. { notNull: true }
     *
     * @returns standard errors
     */
    function createStandardErrors(not = false) {
        return Object.freeze({
            null: createError(not, 'null'),
            number: createError(not, 'number'),
            string: createError(not, 'string'),
            equal: (to) => createError(not, 'equal', to),
            maxLength: (max) => createError(not, 'maxLength', max),
            minLength: (min) => createError(not, 'minLength', min),
            max: (max) => createError(not, 'max', max),
            min: (min) => createError(not, 'min', min),
            includes: (value) => createError(not, 'includes', value),
            matches: (re) => createError(not, 'matches', re),
        });
    }

    /** checks value is a date */
    function isDate(value) {
        return !isNaN(Date.parse(value));
    }

    /**
     * StandardErrors available
     *
     * including EMPTY and negated errors
     *
     * negated error keys are prefixed by 'not' e.g. { notNull: true }
     */
    const StandardErrors = Object.freeze(Object.assign(Object.assign({ EMPTY: Object.freeze({}) }, createStandardErrors()), { not: createStandardErrors(true) }));

    /** deep equality check */
    function isEqual(a, b) {
        if (a === b)
            return true;
        if (a == null || b == null)
            return false;
        if (Array.isArray(a)) {
            return (Array.isArray(b) &&
                a.length === b.length &&
                a.every((v, i) => isEqual(v, b[i])));
        }
        if (typeof a === 'object' || typeof b === 'object') {
            const av = a.valueOf();
            const bv = b.valueOf();
            if (av !== a || bv !== b)
                return isEqual(av, bv);
            return Object.keys(Object.assign(Object.assign({}, a), b)).every((n) => isEqual(a[n], b[n]));
        }
        return false;
    }

    function isEmpty(a) {
        return (a != null &&
            a.constructor === Object &&
            (a === StandardErrors.EMPTY || isEqual(a, StandardErrors.EMPTY)));
    }

    /** checks value is a string */
    function isString(value) {
        return typeof value === 'string';
    }

    /** checks values is a number or a string which can be parsed into a number */
    function isNumber(a) {
        if (isString(a))
            a = Number.parseFloat(a);
        return !isNaN(a) && typeof a === 'number';
    }

    /** normalize a validation result, by removing empty sub-properties
     *
     * @param errors  any result from a validation function
     *
     * @returns       the result with empty sub-properties removed
     */
    function normalizeErrors(errors) {
        if (errors == null || typeof errors !== 'object')
            return errors;
        return Object.keys(errors).reduce((result, key) => {
            const value = normalizeErrors(errors[key]);
            return value === StandardErrors.EMPTY
                ? result
                : Object.assign(Object.assign({}, result), { [key]: value });
        }, StandardErrors.EMPTY);
    }
    /**
     * @deprecated use normalizeErrors
     */
    function normalize(errors) {
        return normalizeErrors(errors);
    }

    /** Checks an error object for errors optionally on a given path
     *
     * normalises the errors object first
     */
    function hasErrors(errors, path) {
        return _hasErrors(normalizeErrors(errors), path);
    }
    function _hasErrors(errors, path) {
        if (errors == null || isEmpty(errors))
            return false;
        if (!path)
            return true;
        let i = path.indexOf('.');
        if (i === -1)
            i = path.length;
        return _hasErrors(errors[path.substring(0, i)], path.substring(i + 1));
    }

    /**
     * An error object for validation errors on type T
     */
    class ValidationError extends Error {
        constructor(rawErrors, message = 'validation failed') {
            super(message);
            this.errors = normalizeErrors(rawErrors);
        }
    }

    class Validator {
        constructor(negate = false) {
            this.negate = negate;
            this.expected = negate ? StandardErrors.not : StandardErrors;
        }
        get not() {
            return new Validator(!this.negate);
        }
        /**
         * value should be null
         *
         * @param value value
         * @returns errors
         */
        null(value) {
            return this.exec(value == null, this.expected.null);
        }
        /**
         * value should be a number
         *
         * @param value value
         * @returns errors
         */
        number(value) {
            return this.exec(value == null || isNumber(value), this.expected.number);
        }
        /**
         * value should be a string
         *
         * @param value value
         * @returns errors
         */
        string(value) {
            return this.exec(value == null || isString(value), this.expected.string);
        }
        /**
         * values should be equal
         *
         * @param a 1st value to compare
         * @param b 2nd value to compare
         * @returns errors
         */
        equal(a, b) {
            return this.exec(isEqual(a, b), this.expected.equal(b));
        }
        /**
         * value should not me more than
         *
         * @param value value
         * @param max maximum number value
         * @returns errors
         */
        maxLength(value, max) {
            return this.exec(value == null || value.length <= max, this.expected.maxLength(max));
        }
        /**
         * value should not be less than
         *
         * @param value value
         * @param min minimum number value
         * @returns errors
         */
        minLength(value, min) {
            return this.exec(value == null || value.length >= min, this.expected.minLength(min));
        }
        /**
         * value should not me more than
         *
         * @param value value
         * @param max maximum value
         * @returns errors
         */
        max(value, max) {
            return this.exec(value == null || value <= max, this.expected.max(max));
        }
        /**
         * value should not be less than
         *
         * @param value value
         * @param min minimum value
         * @returns errors
         */
        min(value, min) {
            return this.exec(value == null || value >= min, this.expected.min(min));
        }
        /**
         * 1st value includes second
         *
         * @param a iterable value, eg string or array
         * @param b value to find
         * @returns errors
         */
        includes(a, b) {
            return this.exec(a == null || a.includes(b), this.expected.includes(b));
        }
        /**
         * value must match regex
         *
         * @param value string value
         * @param re regular expression
         * @param description error description
         * @returns errors
         */
        matches(value, re, description = null) {
            return this.exec(value == null || new RegExp(re).test(value), this.expected.matches(description || re));
        }
        /**
         * value must pass the rule
         *
         * @param rule rule
         * @returns errors
         */
        rule(rule) {
            return this.exec(rule.result, createError(this.negate, rule.errorKey, rule.errorValue));
        }
        exec(result, failure) {
            return (this.negate ? !result : result)
                ? StandardErrors.EMPTY
                : failure;
        }
    }

    const validate = new Validator();

    /** represents state for a value which is validated
     *
     *  useful for user facing components
     */
    class ValidationState {
        constructor(
        /** validator function */
        validate, 
        /** value */
        value = null, 
        /** validation errors, will be normalized */
        errors = StandardErrors.EMPTY) {
            this.validate = validate;
            this.value = value;
            /** state is invalid */
            this.invalid = false;
            if (validate == null)
                throw new Error('validate is required');
            this.errors = normalizeErrors(errors);
            this.invalid = this.errors !== StandardErrors.EMPTY;
        }
        /** if there are changes calls validation and sets errors and invalid properites
         *
         * @param value     value to validate if changed
         * @param onChange  a function called when change is made
         * @returns         a new state object if there is change, same if not
         */
        async set(value, onChange) {
            if (isEqual(this.value, value))
                return this;
            const errors = await this.validate(value);
            const newState = new ValidationState(this.validate, value, errors);
            if (onChange)
                onChange(newState);
            return newState;
        }
    }

    exports.StandardErrors = StandardErrors;
    exports.ValidationError = ValidationError;
    exports.ValidationState = ValidationState;
    exports.Validator = Validator;
    exports.capitalize = capitalize;
    exports.createError = createError;
    exports.createStandardErrors = createStandardErrors;
    exports.hasErrors = hasErrors;
    exports.isDate = isDate;
    exports.isEmpty = isEmpty;
    exports.isEqual = isEqual;
    exports.isNumber = isNumber;
    exports.isString = isString;
    exports.normalize = normalize;
    exports.normalizeErrors = normalizeErrors;
    exports.validate = validate;

}));
//# sourceMappingURL=index.umd.js.map
