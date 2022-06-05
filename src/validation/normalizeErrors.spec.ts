import { normalizeErrors } from './normalizeErrors';

describe('normalizeErrors', () => {
  it('removes empty', () => {
    const errors = {
      a: {},
      b: { null: true },
    };

    const result = normalizeErrors(errors);

    expect(result).toEqual({
      b: { null: true },
    });
  });

  it('removes nested empty', () => {
    const errors = {
      a: { c: {} },
      b: { null: true },
    };

    const result = normalizeErrors(errors);

    expect(result).toEqual({
      b: { null: true },
    });
  });

  it('returns empty', () => {
    const errors = {};

    const result = normalizeErrors(errors);

    expect(result).toEqual({});
  });
});
