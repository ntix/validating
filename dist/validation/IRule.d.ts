/** Rule interface for creating re-usable rules
 *
 * ```typescript
 * function notDecimalRule(value: any): IRule {
 *    return {
 *      result: !Number.isInteger(value),
 *      errorKey: 'decimal'
 *    };
 * }
 * ```
 *
 * the above can then be used by the ```validate.rule``` method
 *
 * see validator.spec.ts for full example
 */
export interface IRule {
  result: boolean;
  errorKey: string;
  errorValue?: any;
}
