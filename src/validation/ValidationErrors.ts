import { IStandardAnyErrors, IStandardNumberErrors, IStandardStringErrors } from './IStandardErrors';

/** errors returned from validating TValue */
export type ValidationErrors<TValue>
  = (
    TValue extends boolean ? IStandardAnyErrors
    : TValue extends number ? IStandardNumberErrors
    : TValue extends string ? IStandardStringErrors
    : {
      [P in {
        [K in keyof TValue]: TValue[K] extends () => void ? never : K;
      }[keyof TValue]]?: ValidationErrors<TValue[P]>;
    }
  );
