import "core-js/modules/es.number.constructor";
export function isFloat(n) {
  return Number(n) == n && n % 1 !== 0;
}
export function isInt(n) {
  return Number(n) == n && n % 1 === 0;
}