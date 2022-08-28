import { StandardErrors } from './StandardErrors';
import { ValidationError } from './ValidationError';

describe('ValidationError', () => {

  it('normalises errors', () => {

    var err = new ValidationError({ empty: { nested: {} } });

    expect(err.errors).toBe(StandardErrors.EMPTY);

  });

});
