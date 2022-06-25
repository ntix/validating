import { StandardErrors } from '../validation/StandardErrors';
import { isEqual } from './isEqual';
export function isEmpty(a) {
    return (a != null &&
        a.constructor === Object &&
        (a === StandardErrors.EMPTY || isEqual(a, StandardErrors.EMPTY)));
}
