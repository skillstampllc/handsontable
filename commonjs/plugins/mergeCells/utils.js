"use strict";

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

exports.__esModule = true;
exports.applySpanProperties = applySpanProperties;

/**
 * Apply the `colspan`/`rowspan` properties.
 *
 * @param {HTMLElement} TD The soon-to-be-modified cell.
 * @param {MergedCellCoords} mergedCellInfo The merged cell in question.
 * @param {number} row Row index.
 * @param {number} col Column index.
 */
// eslint-disable-next-line import/prefer-default-export
function applySpanProperties(TD, mergedCellInfo, row, col) {
  if (mergedCellInfo) {
    if (mergedCellInfo.row === row && mergedCellInfo.col === col) {
      TD.setAttribute('rowspan', mergedCellInfo.rowspan.toString());
      TD.setAttribute('colspan', mergedCellInfo.colspan.toString());
    } else {
      TD.removeAttribute('rowspan');
      TD.removeAttribute('colspan');
      TD.style.display = 'none';
    }
  } else {
    TD.removeAttribute('rowspan');
    TD.removeAttribute('colspan');
    TD.style.display = '';
  }
}