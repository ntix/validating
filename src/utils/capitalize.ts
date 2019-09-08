export function capitalize(value: string): string {
  return !value ? value : value[0].toUpperCase() + value.substr(1);
}
