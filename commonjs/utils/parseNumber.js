"use strict";

require("core-js/modules/es.number.constructor");

exports.__esModule = true;
exports.isFloat = isFloat;
exports.isInt = isInt;

function isFloat(n) {
  return Number(n) == n && n % 1 !== 0;
}

function isInt(n) {
  return Number(n) == n && n % 1 === 0;
}