"use strict";

exports.__esModule = true;
exports.operationResult = operationResult;
require("core-js/modules/es.error.cause.js");
var C = _interopRequireWildcard(require("../../../i18n/constants"));
var _logicalOperationRegisterer = require("../logicalOperationRegisterer");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const OPERATION_ID = 'disjunctionWithExtraCondition';
exports.OPERATION_ID = OPERATION_ID;
const SHORT_NAME_FOR_COMPONENT = C.FILTERS_LABELS_DISJUNCTION;
// ((p OR q OR w OR x OR...) AND z) === TRUE?

/**
 * @param {Array} conditions An array with values to check.
 * @param {*} value The comparable value.
 * @returns {boolean}
 */
exports.SHORT_NAME_FOR_COMPONENT = SHORT_NAME_FOR_COMPONENT;
function operationResult(conditions, value) {
  if (conditions.length < 3) {
    throw Error('Operation doesn\'t work on less then three conditions.');
  }
  return conditions.slice(0, conditions.length - 1).some(condition => condition.func(value)) && conditions[conditions.length - 1].func(value);
}
(0, _logicalOperationRegisterer.registerOperation)(OPERATION_ID, SHORT_NAME_FOR_COMPONENT, operationResult);