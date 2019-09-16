import { hasErrors } from './hasErrors';

describe('hasErrors', () => {
  [
    [null, null, false] as any,
    [null, '', false],
    [1, '', true],
    [1, 'error', false],
    [{ error: true }, null, true],
    [{ error: true }, 'error', true],
    [{ error: true }, 'error.deeper', false],
    [{ error: { deeper: true } }, 'error.deeper', true]
  ].forEach(([errors, path, expected]) => {
    it(`${path} on ${JSON.stringify(errors, undefined, 2)} ${
      expected ? 'has' : 'has no'
    } errors`, () => {
      const result = hasErrors(errors, path);
      expect(result).toBe(expected);
    });
  });
});
