import { capitalize } from './capitalize';

describe('capitalize', () => {
  [
    ['a', 'A'] as any,
    ['aa', 'Aa'],
    ['A', 'A'],
    ['a number of words', 'A number of words'],
  ].forEach(([a, expected]) => {
    it(`${a} => ${expected}`, () => {
      const result = capitalize(a);
      expect(result).toEqual(expected);
    });
  });
});
