import { ValidationState } from './ValidationState';
import { validate } from '../validate';
import { IValidate, StandardErrors } from '../validation';

describe('ValidationState', () => {
  const INVALID_VALUE: number = 1;
  const VALID_VALUE: number = 2;

  const validateNumber: IValidate<number> =
    value => validate.min(value, 2);

  it('state.set sets properties', async () => {
    const state = await new ValidationState<number>(
      async v => validateNumber(v),
      VALID_VALUE
    ).set(INVALID_VALUE);

    expect(state.value).toEqual(INVALID_VALUE);
    expect(state.errors).toEqual(StandardErrors.min(2));
    expect(state.errors.min).toEqual(2);
    expect(state.invalid).toBe(true);
  });

  it('state.set sets properties sync', async () => {
    const state = await new ValidationState<number>(
      validateNumber,
      VALID_VALUE
    ).set(INVALID_VALUE);

    expect(state.value).toEqual(INVALID_VALUE);
    expect(state.errors).toEqual(StandardErrors.min(2));
    expect(state.errors.min).toEqual(2);
    expect(state.invalid).toBe(true);
  });

  it('set with no change returns same state', async () => {
    const state = new ValidationState<number>(
      async (v) => validate.min(v, 2),
      INVALID_VALUE
    );
    const newState = await state.set(INVALID_VALUE);

    expect(state).toBe(newState);
  });

  it('set with change returns new state', async () => {
    const state = new ValidationState<number>(
      async (v) => validate.min(v, 2),
      INVALID_VALUE
    );
    const newState = await state.set(VALID_VALUE);

    expect(state).not.toBe(newState);
  });

  it('set with change calls onChange', async () => {
    const state = new ValidationState<number>(
      async (v) => validate.min(v, 2),
      INVALID_VALUE
    );
    let newState: ValidationState<number> = undefined!;
    await state.set(VALID_VALUE, (s) => (newState = s));

    expect(newState).not.toBeUndefined();
    expect(newState).not.toBe(state);
  });

  it('set with no change does not call onChange', async () => {
    const state = new ValidationState<number>(
      async (v) => validate.min(v, 2),
      INVALID_VALUE
    );
    let newState: ValidationState<number> = undefined!;
    await state.set(INVALID_VALUE, (s) => (newState = s));

    expect(newState).toBeUndefined();
  });

  it('errors are normalised', async () => {
    const state = new ValidationState<any>(
      async (v) => validate.min(v, 2),
      INVALID_VALUE,
      { prop: {} }
    );

    expect(state.errors).toBe(StandardErrors.EMPTY);
  });

  it('state on object property', async () => {
    interface A {
      value: number;
    }

    let state = new ValidationState<A>(async (v) => ({
      value: validate.min(v.value, 2),
    }));

    state = await state.set({ value: 1 });

    expect(state.errors.value?.min).toBe(2);
  });
});
