# @ntix/validating

A small validator

[github.com/ntix/validating](https://github.com/ntix/validating/)

## example

```typescript
import { IErrors, StandardErrors, validate } from '@ntix/validating';

interface IUserRegistration {
  readonly userName: string;
  readonly password: string;
  readonly passwordConfirm: string;
}

/**
 * Validate a user registration
 * Break down the validation into smaller reusable functions
 */
function validateUserRegistration(value: IUserRegistration): IErrors {
  if (value == null) return StandardErrors.not.null;

  return {
    userName: validateUserName(value.userName),
    password: validatePassword(value.password),
    passwordConfirm: validate.equal(value.passwordConfirm, value.password)
  };
}

function validateUserName(value: string): IErrors {
  if (value == null) return StandardErrors.not.null;

  return {
    ...validate.minLength(value, 6),
    ...validate.maxLength(value, 12)
  };
}

function validatePassword(value: string): IErrors {
  if (value == null) return StandardErrors.not.null;

  return {
    ...validate.minLength(value, 6),
    ...validate.maxLength(value, 30),
    ...validate.matches(value, /\d/, "complexity")
  };
}

```
