import { validate } from "./validate";
import { StandardErrors, IErrors, IRule, normalize, IValidate } from "./validation";
import { isNumber, isString } from "./predicates";

describe("validator", () => {
  it("null not null", async () => {
    const result = validate.not.null(null);
    expect(result).toEqual({ notNull: true });
  });

  it("value not null", async () => {
    const result = validate.not.null(1);
    expect(result).toEqual(StandardErrors.EMPTY);
  });

  it("value is null", async () => {
    const result = validate.null(1);
    expect(result).toEqual({ null: true });
  });

  it("value min/max length passes when null", async () => {
    const result = {
      ...validate.minLength(null, 1),
      ...validate.maxLength(null, 1)
    }
    expect(result).toEqual({});
  });

  it("value includes A", async () => {
    const result = validate.includes("ABC", "A");
    expect(result).toEqual(StandardErrors.EMPTY);
  });

  it("value does not include A", async () => {
    const result = validate.not.includes("ABC", "A");
    expect(result).toEqual({ notIncludes: "A" });
  });

  const re = /^.+?@.+?\.com$/;
  const reDescription = "comEmail";
  [
    ["a@example.com", {}] as any,
    ["a@example.co.uk", { matches: reDescription }]
  ].forEach(([value, expected]) => {
    it(`${value} matches regex`, async () => {
      const result = validate.matches(value, re, reDescription);
      expect(result).toEqual(expected);
    });
  });

  [
    [null, { notNull: true }] as any,
    [1, { notEqual: 1 }],
    [-1, { min: 0 }],
    [3, { max: 2 }],
    ["string", { notString: true }],
    [{}, { number: true }],
    [1.5, { notDecimal: true }],
    [2.5, { max: 2, notDecimal: true }],
    [2, StandardErrors.EMPTY]
  ].forEach(([value, expected]) => {
    it(`testValidator with ${value}`, () => {
      const result = testNumberValidator(value);
      expect(result).toEqual(expected);
    });
  });

  [
    [null, { notNull: true }] as any,
    [
      { userName: "bob" },
      { userName: { minLength: 6 }, password: { notNull: true } }
    ],
    [
      {
        userName: "robert",
        password: "password",
        passwordConfirm: "password"
      },
      { password: { matches: "complexity" } }
    ],
    [
      {
        userName: "robert",
        password: "passw0rd",
        passwordConfirm: "not-password"
      },
      { passwordConfirm: { equal: "passw0rd" } }
    ],
    [
      {
        userName: "robert",
        password: "passw0rd",
        passwordConfirm: "passw0rd"
      },
      StandardErrors.EMPTY
    ]
  ].forEach(([value, expected]) => {
    it(`validateUserRegistration with ${JSON.stringify(
      value,
      undefined,
      2
    )}`, () => {
      const result = normalize(validateUserRegistration(value));
      expect(result).toEqual(expected);
    });
  });
});

function testNumberValidator(value?: number): IErrors {
  if (value == null) return StandardErrors.not.null;
  if (isString(value)) return StandardErrors.not.string;
  if (!isNumber(value)) return StandardErrors.number;

  return {
    ...validate.not.equal(value, 1),
    ...validate.min(value, 0),
    ...validate.max(value, 2),
    ...validate.not.rule(isDecimalRule(value))
  };
}

function isDecimalRule(value: any): IRule {
  return {
    result: !Number.isInteger(value),
    errorKey: "decimal"
  };
}

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
