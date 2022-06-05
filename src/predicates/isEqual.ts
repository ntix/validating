/** deep equality check */
export function isEqual(a: any, b: any): boolean {
  if (a === b) return true;

  if (a == null || b == null) return false;

  if (Array.isArray(a)) {
    return (
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((v, i) => isEqual(v, b[i]))
    );
  }

  if (typeof a === 'object' || typeof b === 'object') {
    const av = a.valueOf();
    const bv = b.valueOf();
    if (av !== a || bv !== b) return isEqual(av, bv);
    return Object.keys({ ...a, ...b }).every((n) => isEqual(a[n], b[n]));
  }

  return false;
}
