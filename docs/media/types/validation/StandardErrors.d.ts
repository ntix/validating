/**
 * StandardErrors available
 *
 * including EMPTY and negated errors
 *
 * negated error keys are prefixed by 'not' e.g. { notNull: true }
 */
export declare const StandardErrors: Readonly<{
    not: import("./IStandardErrorProviders").IStandardErrorProviders;
    null: import("./IErrors").IErrors;
    number: import("./IErrors").IErrors;
    string: import("./IErrors").IErrors;
    equal: (to: any) => import("./IErrors").IErrors;
    maxLength: (max: number) => import("./IErrors").IErrors;
    minLength: (min: number) => import("./IErrors").IErrors;
    max: (max: number) => import("./IErrors").IErrors;
    min: (min: number) => import("./IErrors").IErrors;
    includes: (value: any) => import("./IErrors").IErrors;
    matches: (re: string | RegExp) => import("./IErrors").IErrors;
    EMPTY: any;
}>;
