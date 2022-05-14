![build](https://github.com/ntix/validating/workflows/Build/badge.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/ntix/validating/badge.svg)](https://snyk.io/test/github/ntix/validating)
[![npm version](https://badge.fury.io/js/%40ntix%2Fvalidating.svg)](https://badge.fury.io/js/%40ntix%2Fvalidating)

[Documentation](https://ntix.github.io/validating/)

## example

```typescript
import { IErrors, StandardErrors, validate } from '@ntix/validating';

interface IUserRegistration {
  readonly userName: string;
  readonly password: string;
  readonly passwordConfirm: string;
}

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
