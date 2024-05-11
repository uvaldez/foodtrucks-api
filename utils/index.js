export const isNumber = (value) => {
  return typeof(value) === 'number' &&
    isFinite(value) &&
    Math.round(value) === value;
}
