"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.match");

require("core-js/modules/es.string.split");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

exports.__esModule = true;
exports.default = void 0;

var _hotFormulaParser = require("hot-formula-parser");

var _array = require("../../../helpers/array");

var _base = _interopRequireDefault(require("./_base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var STATE_OUT_OFF_DATE = 1;
var STATE_COMPUTING = 2;
var STATE_UP_TO_DATE = 3;
var states = [STATE_OUT_OFF_DATE, STATE_COMPUTING, STATE_UP_TO_DATE];
/**
 * Class responsible for wrapping formula expression. It contains calculated value of
 * the formula, an error if it has happened and cell references which indicates a relationship with regular
 * cells. This object uses physical cell coordinates.
 *
 * @class CellValue
 * @util
 */

var CellValue =
/*#__PURE__*/
function (_BaseCell) {
  _inherits(CellValue, _BaseCell);

  _createClass(CellValue, null, [{
    key: "STATE_OUT_OFF_DATE",

    /**
     * Out of date state indicates cells ready for recomputing.
     *
     * @returns {Number}
     */
    get: function get() {
      return 1; // PhantomJS crashes when we want to use constant above
    }
    /**
     * Computing state indicates cells under processing.
     *
     * @returns {Number}
     */

  }, {
    key: "STATE_COMPUTING",
    get: function get() {
      return 2; // PhantomJS crashes when we want to use constant above
    }
    /**
     * Up to date state indicates cells with fresh computed value.
     *
     * @returns {Number}
     */

  }, {
    key: "STATE_UP_TO_DATE",
    get: function get() {
      return 3; // PhantomJS crashes when we want to use constant above
    }
  }]);

  function CellValue(row, column) {
    var _this;

    _classCallCheck(this, CellValue);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CellValue).call(this, row, column));
    /**
     * List of precedents cells.
     *
     * @type {Array}
     */

    _this.precedents = [];
    /**
     * List of precedents cells.
     *
     * @type {Array}
     */

    _this.precedentsList = {};
    /**
     * Computed value.
     *
     * @type {*}
     */

    _this.value = null;
    /**
     * Error name.
     *
     * @type {String|null}
     */

    _this.error = null;
    /**
     * Indicates cell state.
     *
     * @type {String}
     */

    _this.state = CellValue.STATE_UP_TO_DATE;
    /**
     * Indicates cell key.
     *
     * @type {String}
     */

    _this.key = "".concat(_this.stringifyCol(column)).concat(row + 1);
    ;
    return _this;
  }
  /**
   * Set computed value.
   *
   * @param {*} value
   */


  _createClass(CellValue, [{
    key: "setValue",
    value: function setValue(value) {
      this.value = value;
    }
    /**
     * Parse column name to number.
     *
     * @param {*} value
     */

  }, {
    key: "parseCol",
    value: function parseCol(value) {
      if (typeof value === 'number') {
        return value;
      }

      var coord = -1;

      for (var i = 0; i < value.length; i++) {
        coord += (value[i].charCodeAt(0) - 64) * Math.pow(26, value.length - 1 - i);
      }

      return coord;
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
     * Parse precedents without deep.
     *
     * @param {*} value
     */

  }, {
    key: "setPrecedents",
    value: function setPrecedents(value) {
      var _this2 = this;

      var precedents = {};

      if (!value || typeof value === 'number' || value[0] !== '=') {
        return {};
      }

      var regex = /(\$?[A-Z]+\$?[0-9]+:\$?[A-Z]+\$?[0-9]+)|(\$?[A-Z]+\$?[0-9]+)/g;

      try {
        (value.match(regex) || []).forEach(function (cell) {
          if (cell.indexOf(':') > -1) {
            var _cell$split = cell.split(':'),
                _cell$split2 = _slicedToArray(_cell$split, 2),
                startCell = _cell$split2[0],
                endCell = _cell$split2[1];

            startCell = startCell.match(/(\D+)(\d+)/);
            endCell = endCell.match(/(\D+)(\d+)/);

            for (var i = _this2.parseCol(startCell[1]); i <= _this2.parseCol(endCell[1]); i++) {
              for (var j = parseInt(startCell[2]); j <= parseInt(endCell[2]); j++) {
                var newCell = "".concat(_this2.stringifyCol(i)).concat(j);

                if (!precedents[newCell]) {
                  precedents[newCell] = newCell;
                }
              }
            }
          } else {
            if (!precedents[cell]) {
              precedents[cell] = cell;
            }
          }
        });
      } catch (e) {
        console.log('e', e);
      }

      this.precedentsList = precedents;
    }
    /**
     * Get computed value.
     *
     * @returns {*}
     */

  }, {
    key: "getValue",
    value: function getValue() {
      return this.value;
    }
    /**
     * Set error message for this cell.
     *
     * @param {String} error Error name.
     */

  }, {
    key: "setError",
    value: function setError(error) {
      this.error = error;
    }
    /**
     * Get error name for this cell.
     *
     * @returns {String|null}
     */

  }, {
    key: "getError",
    value: function getError() {
      return this.error;
    }
    /**
     * Check if cell value is marked as error.
     *
     * @returns {Boolean}
     */

  }, {
    key: "hasError",
    value: function hasError() {
      return this.error !== null;
    }
    /**
     * Set cell state.
     *
     * @param {Number} state Cell state.
     */

  }, {
    key: "setState",
    value: function setState(state) {
      if (states.indexOf(state) === -1) {
        throw Error("Unrecognized state: ".concat(state));
      }

      this.state = state;
    }
    /**
     * Check cell state.
     *
     * @returns {Boolean}
     */

  }, {
    key: "isState",
    value: function isState(state) {
      return this.state === state;
    }
    /**
     * Add precedent cell to the collection.
     *
     * @param {CellReference} cellReference Cell reference object.
     */

  }, {
    key: "addPrecedent",
    value: function addPrecedent(cellReference) {
      if (this.isEqual(cellReference)) {
        throw Error(_hotFormulaParser.ERROR_REF);
      }

      if (!this.hasPrecedent(cellReference)) {
        this.precedents.push(cellReference);
      }
    }
    /**
     * Remove precedent cell from the collection.
     *
     * @param {CellReference} cellReference Cell reference object.
     */

  }, {
    key: "removePrecedent",
    value: function removePrecedent(cellReference) {
      if (this.isEqual(cellReference)) {
        throw Error(_hotFormulaParser.ERROR_REF);
      }

      this.precedents = (0, _array.arrayFilter)(this.precedents, function (cell) {
        return !cell.isEqual(cellReference);
      });
    }
    /**
     * Clear all precedent cells.
     */

  }, {
    key: "clearPrecedents",
    value: function clearPrecedents() {
      this.precedents.length = 0;
    }
    /**
     * Get precedent cells.
     *
     * @returns {Array}
     */

  }, {
    key: "getPrecedents",
    value: function getPrecedents() {
      return this.precedents;
    }
    /**
     * Check if cell value has precedents cells.
     *
     * @returns {Boolean}
     */

  }, {
    key: "hasPrecedents",
    value: function hasPrecedents() {
      return this.precedents.length > 0;
    }
    /**
     * Check if cell reference is precedents this cell.
     *
     * @param {CellReference} cellReference Cell reference object.
     * @returns {Boolean}
     */

  }, {
    key: "hasPrecedent",
    value: function hasPrecedent(cellReference) {
      return (0, _array.arrayFilter)(this.precedents, function (cell) {
        return cell.isEqual(cellReference);
      }).length > 0;
    }
  }]);

  return CellValue;
}(_base.default);

var _default = CellValue;
exports.default = _default;