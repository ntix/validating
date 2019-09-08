export interface IErrors {
    [key: string]: IErrors | any;
}
export declare const Errors: Readonly<{
    EMPTY: Readonly<{}>;
    required: string;
    null: string;
    equal: string;
    minLength: string;
    maxLength: string;
}>;
