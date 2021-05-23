/** checks value is a date */
export function isDate(value) {
    return !isNaN(Date.parse(value));
}
