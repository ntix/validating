# @ntix/validating

A small validator

[github.com/ntix/validating](https://github.com/ntix/validating/)

## example

```typescript

import { IValidate, StandardErrors, validate } from '@ntix/validating';

interface IUserRegistration {
  readonly userName: string;
  readonly password: string;
  readonly passwordConfirm: string;
}

const validateUserRegistration: IValidate<IUserRegistration>
  = value => {
    if (value == null) return StandardErrors.not.null;

    return {
      userName: validateUserName(value.userName),
      password: validatePassword(value.password),
      passwordConfirm: validate.equal(value.passwordConfirm, value.password)
    };
  }

// break validation down into reusable functions

const validateUserName: IValidate<string>
  = value => {
    if (value == null) return StandardErrors.not.null;

    return {
      ...validate.minLength(value, 6),
      ...validate.maxLength(value, 12)
    };
  }

const validatePassword: IValidate<string>
  = value => {
    if (value == null) return StandardErrors.not.null;

    return {
      ...validate.minLength(value, 6),
      ...validate.maxLength(value, 30),
      ...validate.matches(value, /\d/, "complexity")
    };
  }
```

### Failing result

```typescript
const registration = {
  userName: "robert",
  password: "password",
  passwordConfirm: "password"
};

> validateUserRegistration(registration)

// validation fails with errors object
{ password: { matches: "complexity" } }
```

### Passing result

```typescript
const registration = {
  userName: "robert",
  password: "password",
  passwordConfirm: "passw0rd"
};

> validateUserRegistration(registration)

// validation passes with empty errors object
{}  (StandardErrors.EMPTY)
```