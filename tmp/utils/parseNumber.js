"use strict";

exports.__esModule = true;
exports.isFloat = isFloat;
exports.isInt = isInt;

require("core-js/modules/es.number.constructor.js");

function isFloat(n) {
  return Number(n) == n && n % 1 !== 0;
}

function isInt(n) {
  return Number(n) == n && n % 1 === 0;
}