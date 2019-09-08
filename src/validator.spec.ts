import { validate } from "./validator";
import { expected, IValidationResult } from "./errors";
import { isNumber, isString } from "./predicates";

describe("validator", () => {
  it("null not null", async () => {
    const result = validate.not.null(null);
    expect(result).toEqual({ notNull: true });
  });

  it("value not null", async () => {
    const result = validate.not.null(1);
    expect(result).toEqual(expected.EMPTY);
  });

  it("value is null", async () => {
    const result = validate.null(1);
    expect(result).toEqual({ null: true });
  });

  [
    [null, { notNull: true }] as any,
    [1, { notEqual: 1 }],
    [-1, { min: 0 }],
    [3, { max: 2 }],
    ["string", { notString: true }],
    [{}, { number: true }],
    [2, expected.EMPTY]
  ].forEach(([value, expected]) => {
    it(`testValidator with ${value}`, () => {
      const result = testNumberValidator(value);
      expect(result).toEqual(expected);
    });
  });
});

function testNumberValidator(value?: number): IValidationResult {
  if (value == null) return expected.not.null;
  if (isString(value)) return expected.not.string;
  if (!isNumber(value)) return expected.number;

  return {
    ...validate.not.equal(value, 1),
    ...validate.min(value, 0),
    ...validate.max(value, 2)
  };
}
