/** Rule interface for creating re-usable rules
 *
 * ```typescript
 * function between(value: number, low:number, high:number): IRule {
 *    return {
 *      result: value>low && value<high,
 *      errorKey: 'between',
 *      errorValue: {low, high}
 *    };
 * }
 * ```
 *
 * the ```between``` rule can then be used by the ```validate.rule()``` method
 *
 * ```typescript
 * validate.not.rule(between(value, 1, 10))
 * ```
 */
export interface IRule {
    result: boolean;
    errorKey: string;
    errorValue?: any;
}
