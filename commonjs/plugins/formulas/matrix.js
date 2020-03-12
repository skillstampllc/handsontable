"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.reverse");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

exports.__esModule = true;
exports.default = void 0;

var _array = require("../../helpers/array");

var _value = _interopRequireDefault(require("./cell/value"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * This component is responsible for storing all calculated cells which contain formula expressions (CellValue) and
 * register for all cell references (CellReference).
 *
 * CellValue is an object which represents a formula expression. It contains a calculated value of that formula,
 * an error if applied and cell references. Cell references are CellReference object instances which represent a cell
 * in a spreadsheet. One CellReference can be assigned to multiple CellValues as a precedent cell. Each cell
 * modification triggers a search through CellValues that are dependent of the CellReference. After
 * the match, the cells are marked as 'out of date'. In the next render cycle, all CellValues marked with
 * that state are recalculated.
 *
 * @class Matrix
 * @util
 */
var Matrix =
/*#__PURE__*/
function () {
  function Matrix(hot) {
    _classCallCheck(this, Matrix);

    /**
     * Handsontable instance.
     *
     * @type {Core}
     */
    this.hot = hot;
    /**
     * List of all cell values with theirs precedents.
     *
     * @type {Array}
     */

    this.data = [];
    /**
     * List of all created and registered cell references.
     *
     * @type {Array}
     */

    this.cellReferences = [];
  }
  /**
   * Get cell value at given row and column index.
   *
   * @param {Number} row Physical row index.
   * @param {Number} column Physical column index.
   * @returns {CellValue|null} Returns CellValue instance or `null` if cell not found.
   */


  _createClass(Matrix, [{
    key: "getCellAt",
    value: function getCellAt(row, column) {
      var result = null;
      (0, _array.arrayEach)(this.data, function (cell) {
        if (cell.row === row && cell.column === column) {
          result = cell;
          return false;
        }
      });
      return result;
    }
    /**
     * Get all out of date cells.
     *
     * @returns {Array}
     */

  }, {
    key: "getOutOfDateCells",
    value: function getOutOfDateCells() {
      return (0, _array.arrayFilter)(this.data, function (cell) {
        return cell.isState(_value.default.STATE_OUT_OFF_DATE);
      });
    }
    /**
     * Add cell value to the collection.
     *
     * @param {CellValue|Object} cellValue Cell value object.
     */

  }, {
    key: "add",
    value: function add(cellValue) {
      if (!(0, _array.arrayFilter)(this.data, function (cell) {
        return cell.isEqual(cellValue);
      }).length) {
        this.data.push(cellValue);
      }
    }
    /**
     * Remove cell value from the collection.
     *
     * @param {CellValue|Object|Array} cellValue Cell value object.
     */

  }, {
    key: "remove",
    value: function remove(cellValue) {
      var isArray = Array.isArray(cellValue);

      var isEqual = function isEqual(cell, values) {
        var result = false;

        if (isArray) {
          (0, _array.arrayEach)(values, function (value) {
            if (cell.isEqual(value)) {
              result = true;
              return false;
            }
          });
        } else {
          result = cell.isEqual(values);
        }

        return result;
      };

      this.data = (0, _array.arrayFilter)(this.data, function (cell) {
        return !isEqual(cell, cellValue);
      });
    }
    /**
     * Get cell dependencies using visual coordinates.
     *
     * @param {Object} cellCoord Visual cell coordinates object.
     */

  }, {
    key: "getDependencies",
    value: function getDependencies(cellCoord) {
      var _this = this;

      /* eslint-disable arrow-body-style */
      var getDependencies = function getDependencies(cell) {
        return (0, _array.arrayReduce)(_this.data, function (acc, cellValue) {
          if (cellValue.hasPrecedent(cell) && acc.indexOf(cellValue) === -1) {
            acc.push(cellValue);
          }

          return acc;
        }, []);
      };

      var resultLength = 0;
      var maxDependenciesDeep = this.hot && this.hot.getSettings().maxDependenciesDeep > -1 ? this.hot.getSettings().maxDependenciesDeep : -1;

      var getTotalDependencies = function getTotalDependencies(cell) {
        if (maxDependenciesDeep > -1 && resultLength > maxDependenciesDeep) {
          return [];
        }

        var deps = getDependencies(cell);

        if (deps.length) {
          (0, _array.arrayEach)(deps, function (cellValue) {
            if (cellValue.hasPrecedents() && (maxDependenciesDeep > -1 && resultLength < maxDependenciesDeep || maxDependenciesDeep === -1)) {
              deps = deps.concat(getTotalDependencies({
                row: _this.hot.toVisualRow(cellValue.row),
                column: _this.hot.toVisualColumn(cellValue.column)
              }));
            }
          });
          resultLength += deps.length;
        }

        return deps;
      };

      return getTotalDependencies(cellCoord);
    }
    /**
     * Get cell dependencies using visual coordinates.
     *
     * @param {Object} cellCoord Visual cell coordinates object.
     */

  }, {
    key: "getDependenciesCustom",
    value: function getDependenciesCustom(cellCoord) {
      var _this2 = this;

      /* eslint-disable arrow-body-style */
      var result = [];
      var startCell = cellCoord;
      var cellCode = this.coordsToA1([startCell[1] || startCell.column, (startCell[0] || startCell.row) + 1]);

      function distinctFilter(array) {
        var seenIt = {};
        return array.reverse().filter(function (val) {
          var key = "".concat(val.row, "-").concat(val.column);

          if (seenIt[key]) {
            return false;
          }

          return seenIt[key] = true;
        }).reverse();
      }

      this.data.forEach(function (dataCell) {
        if (dataCell.precedentsList && dataCell.precedentsList[cellCode]) {
          result.push(_this2.getCellAt(dataCell.row, dataCell.column));
        }
      });
      result.forEach(function (parentCell) {
        result.push.apply(result, _toConsumableArray(_this2.getDependenciesCustom([parentCell.row, parentCell.column])));
      });
      return distinctFilter(result);
    }
    /**
     * 
     */

  }, {
    key: "coordsToA1",
    value: function coordsToA1(coords) {
      return this.stringifyCol(coords[0]) + coords[1];
    }
    /**
     * Stringify column from number to.
     *
     * @param {*} value
     */

  }, {
    key: "stringifyCol",
    value: function stringifyCol(value) {
      if (typeof value === 'string') {
        return value;
      }

      var col = '';

      while (value >= 0) {
        if (value / 26 >= 1) {
          col += String.fromCharCode(64 + Math.floor(value / 26));
          value = value % 26;
        } else {
          col += String.fromCharCode(65 + value);
          value = -1;
        }
      }

      return col;
    }
    /**
     * Register cell reference to the collection.
     *
     * @param {CellReference|Object} cellReference Cell reference object.
     */

  }, {
    key: "registerCellRef",
    value: function registerCellRef(cellReference) {
      if (!(0, _array.arrayFilter)(this.cellReferences, function (cell) {
        return cell.isEqual(cellReference);
      }).length) {
        this.cellReferences.push(cellReference);
      }
    }
    /**
     * Remove cell references from the collection.
     *
     * @param {Object} start Start visual coordinate.
     * @param {Object} end End visual coordinate.
     * @returns {Array} Returns removed cell references.
     */

  }, {
    key: "removeCellRefsAtRange",
    value: function removeCellRefsAtRange(_ref, _ref2) {
      var startRow = _ref.row,
          startColumn = _ref.column;
      var endRow = _ref2.row,
          endColumn = _ref2.column;
      var removed = [];

      var rowMatch = function rowMatch(cell) {
        return startRow === void 0 ? true : cell.row >= startRow && cell.row <= endRow;
      };

      var colMatch = function colMatch(cell) {
        return startColumn === void 0 ? true : cell.column >= startColumn && cell.column <= endColumn;
      };

      this.cellReferences = (0, _array.arrayFilter)(this.cellReferences, function (cell) {
        if (rowMatch(cell) && colMatch(cell)) {
          removed.push(cell);
          return false;
        }

        return true;
      });
      return removed;
    }
    /**
     * Reset matrix data.
     */

  }, {
    key: "reset",
    value: function reset() {
      this.data.length = 0;
      this.cellReferences.length = 0;
    }
  }]);

  return Matrix;
}();

var _default = Matrix;
exports.default = _default;