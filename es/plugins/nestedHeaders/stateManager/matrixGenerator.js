import "core-js/modules/es.symbol";
import "core-js/modules/es.array.filter";
import "core-js/modules/es.array.for-each";
import "core-js/modules/es.object.get-own-property-descriptor";
import "core-js/modules/es.object.get-own-property-descriptors";
import "core-js/modules/es.object.keys";
import "core-js/modules/web.dom-collections.for-each";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable import/prefer-default-export */

/* eslint-disable jsdoc/require-description-complete-sentence */
import { arrayEach } from '../../../helpers/array';
import { HEADER_DEFAULT_SETTINGS } from './constants';
/**
 * A function that dump a tree structure into multidimensional array. That structure is
 * later processed by header renderers to modify TH elements to achieve a proper
 * DOM structure.
 *
 * That structure contains settings object for every TH element generated by Walkontable.
 * The matrix operates on visual column index.
 *
 * Output example:
 *   [
 *     [
 *       { label: 'A1', colspan: 2, origColspan: 2, isHidden: false, ... },
 *       { label: '', colspan: 1, origColspan: 1, isHidden: true, ... },
 *       { label: '', colspan: 1, origColspan: 1, isHidden: false, ... },
 *     ],
 *     [
 *       { label: 'true', colspan: 1, origColspan: 1, isHidden: false, ... },
 *       { label: 'B2', colspan: 1, origColspan: 1, isHidden: false, ... },
 *       { label: '4', colspan: 1, origColspan: 1, isHidden: false, ... },
 *     ],
 *     [
 *       { label: '', colspan: 1, origColspan: 1, isHidden: false, ... },
 *       { label: '', colspan: 1, origColspan: 1, isHidden: false, ... },
 *       { label: '', colspan: 1, origColspan: 1, isHidden: false, ... },
 *     ],
 *   ]
 *
 * @param {TreeNode[]} headerRoots An array of root nodes.
 * @returns {Array[]}
 */

export function generateMatrix(headerRoots) {
  var matrix = [];
  arrayEach(headerRoots, function (rootNode) {
    rootNode.walkDown(function (node) {
      var _node$data = node.data,
          colspan = _node$data.colspan,
          origColspan = _node$data.origColspan,
          label = _node$data.label,
          isHidden = _node$data.isHidden,
          headerLevel = _node$data.headerLevel,
          collapsible = _node$data.collapsible,
          isCollapsed = _node$data.isCollapsed;
      var colspanHeaderLayer = createNestedArrayIfNecessary(matrix, headerLevel);
      colspanHeaderLayer.push({
        label: label,
        colspan: colspan,
        origColspan: origColspan,
        collapsible: collapsible,
        isCollapsed: isCollapsed,
        isHidden: isHidden,
        isBlank: false
      });

      if (origColspan > 1) {
        for (var i = 0; i < origColspan - 1; i++) {
          colspanHeaderLayer.push(_objectSpread(_objectSpread({}, HEADER_DEFAULT_SETTINGS), {}, {
            origColspan: origColspan,
            isHidden: true,
            isBlank: true
          }));
        }
      }
    });
  });
  return matrix;
}
/**
 * Internal helper which ensures that subarray exists under specified index.
 *
 * @param {Array[]} array An array to check.
 * @param {number} index An array index under the subarray should be checked.
 * @returns {Array}
 */

function createNestedArrayIfNecessary(array, index) {
  var subArray;

  if (Array.isArray(array[index])) {
    subArray = array[index];
  } else {
    subArray = [];
    array[index] = subArray;
  }

  return subArray;
}