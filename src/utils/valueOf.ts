export function valueOf(o: object) {
  return o.valueOf ? o.valueOf() : Object.prototype.valueOf.call(o);
}
