export function valueOf(o) {
    return o.valueOf ? o.valueOf() : Object.prototype.valueOf.call(o);
}
