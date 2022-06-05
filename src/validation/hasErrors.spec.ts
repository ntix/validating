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
    [{ error: { deeper: true } }, 'error.deeper', true],
    [{ error: { deeper: {} } }, null, false],
  ].forEach(([errors, path, expected]) => {

    const errorsJson = JSON.stringify(errors, undefined, 2);
    it(`${path} on ${errorsJson} ${expected ? 'has' : 'has no'} errors`,
      () => {
        const result = hasErrors(errors, path);
        expect(result).toBe(expected);
      });
  });
});
