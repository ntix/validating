import { isEmpty } from './isEmpty';
import { StandardErrors } from '../validation';
describe('isEmpty', () => {
    [
        [null, false],
        [undefined, false],
        [1, false],
        ['empty', false],
        [{}, true],
        [StandardErrors.EMPTY, true],
        [{ notEmpty: true }, false]
    ].forEach(([a, expected]) => {
        it(`${a} ${expected ? 'is' : 'is not'} empty`, () => {
            const result = isEmpty(a);
            expect(result).toBe(expected);
        });
    });
});
//# sourceMappingURL=isEmpty.spec.js.map