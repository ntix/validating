/** available standard errors */
export interface IStandardErrors extends IStandardNumberErrors, IStandardStringErrors {
}
/** available 'any' errors */
export interface IStandardAnyErrors {
    null?: true;
    equal?: any;
}
/** available 'number' errors */
export interface IStandardNumberErrors extends IStandardAnyErrors {
    number?: true;
    max?: number;
    min?: number;
}
/** available 'string' errors */
export interface IStandardStringErrors extends IStandardAnyErrors {
    string?: true;
    maxLength?: number;
    minLength?: number;
    includes?: any;
    matches?: RegExp | string;
}
