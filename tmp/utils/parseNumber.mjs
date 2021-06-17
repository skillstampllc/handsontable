import "core-js/modules/es.number.constructor.js";

/**
 * @param {number} num A number to check.
 * @returns {boolean}
 */
export function isFloat(num) {
  return Number(num) == num && num % 1 !== 0; // eslint-disable-line eqeqeq
}
/**
 * @param {number} num A number to check.
 * @returns {boolean}
 */

export function isInt(num) {
  return Number(num) == num && num % 1 === 0; // eslint-disable-line eqeqeq
}