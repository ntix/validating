import { isNumber } from './isNumber';

describe('isNumber', () => {
  [
    [null, false] as any,
    [undefined, false],
    [{}, false],
    [[], false],
    [0, true],
    ['1.2', true],
    ['', false],
    ['not number', false],
  ].forEach(([a, expected]) => {
    it(`${a} ${expected ? 'is' : 'is not'} a number`, () => {
      const result = isNumber(a);
      expect(result).toBe(expected);
    });
  });
});
