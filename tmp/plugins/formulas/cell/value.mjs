function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import "core-js/modules/es.array.concat.js";
import "core-js/modules/web.dom-collections.for-each.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.string.match.js";
import "core-js/modules/es.array.index-of.js";
import "core-js/modules/es.string.split.js";
import "core-js/modules/es.string.replace.js";
import "core-js/modules/es.array.join.js";
import "core-js/modules/es.object.keys.js";
import "core-js/modules/es.object.set-prototype-of.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.reflect.construct.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.from.js";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

import { ERROR_REF } from "hot-formula-parser";
import { arrayFilter } from "../../../helpers/array.mjs";
import BaseCell from "./_base.mjs";
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

var CellValue = /*#__PURE__*/function (_BaseCell) {
  _inherits(CellValue, _BaseCell);

  var _super = _createSuper(CellValue);

  function CellValue(row, column) {
    var _this;

    _classCallCheck(this, CellValue);

    _this = _super.call(this, row, column);
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
     * List of precedents cells.
     *
     * @type {Array}
     */

    _this.precedentsListString = "";
    /**
     * Computed value.
     *
     * @type {*}
     */

    _this.value = null;
    /**
     * Error name.
     *
     * @type {string|null}
     */

    _this.error = null;
    /**
     * Indicates cell state.
     *
     * @type {string}
     */

    _this.state = CellValue.STATE_UP_TO_DATE;
    /**
     * Indicates cell key.
     *
     * @type {String}
     */

    _this.key = "".concat(_this.stringifyCol(column)).concat(row + 1);
    return _this;
  }
  /**
   * Set computed value.
   *
   * @param {*} value The calculated formula value.
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
      if (typeof value === "number") {
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
      if (typeof value === "string") {
        return value;
      }

      var col = "";

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

      if (!value || typeof value === "number" || value[0] !== "=") {
        return {};
      }

      var regex = /(\$?[A-Z]+\$?[0-9]+:\$?[A-Z]+\$?[0-9]+)|(\$?[A-Z]+\$?[0-9]+)/g;

      try {
        (value.match(regex) || []).forEach(function (cell) {
          if (cell.indexOf(":") > -1) {
            var _cell$split = cell.split(":"),
                _cell$split2 = _slicedToArray(_cell$split, 2),
                startCell = _cell$split2[0],
                endCell = _cell$split2[1];

            startCell = startCell.match(/(\D+)(\d+)/);
            endCell = endCell.match(/(\D+)(\d+)/);

            for (var i = _this2.parseCol(startCell[1]); i <= _this2.parseCol(endCell[1]); i++) {
              for (var j = parseInt(startCell[2]); j <= parseInt(endCell[2]); j++) {
                var newCell = "".concat(_this2.stringifyCol(i)).concat(j).replace(/\$/g, "");

                if (!precedents[newCell]) {
                  precedents[newCell] = newCell;
                }
              }
            }
          } else {
            var _newCell = cell.replace(/\$/g, "");

            if (!precedents[_newCell]) {
              precedents[_newCell] = _newCell;
            }
          }
        });
      } catch (e) {
        console.log("e", e);
      }

      this.precedentsList = precedents;
      this.precedentsListString = Object.keys(this.precedentsList).join(" ");
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
     * @param {string} error Error name.
     */

  }, {
    key: "setError",
    value: function setError(error) {
      this.error = error;
    }
    /**
     * Get error name for this cell.
     *
     * @returns {string|null}
     */

  }, {
    key: "getError",
    value: function getError() {
      return this.error;
    }
    /**
     * Check if cell value is marked as error.
     *
     * @returns {boolean}
     */

  }, {
    key: "hasError",
    value: function hasError() {
      return this.error !== null;
    }
    /**
     * Set cell state.
     *
     * @param {number} state Cell state.
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
     * @param {number} state The state to compare with.
     * @returns {boolean}
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
        throw Error(ERROR_REF);
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
        throw Error(ERROR_REF);
      }

      this.precedents = arrayFilter(this.precedents, function (cell) {
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
     * @returns {boolean}
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
     * @returns {boolean}
     */

  }, {
    key: "hasPrecedent",
    value: function hasPrecedent(cellReference) {
      return arrayFilter(this.precedents, function (cell) {
        return cell.isEqual(cellReference);
      }).length > 0;
    }
  }], [{
    key: "STATE_OUT_OFF_DATE",
    get:
    /**
     * Out of date state indicates cells ready for recomputing.
     *
     * @returns {number}
     */
    function get() {
      return 1; // PhantomJS crashes when we want to use constant above
    }
    /**
     * Computing state indicates cells under processing.
     *
     * @returns {number}
     */

  }, {
    key: "STATE_COMPUTING",
    get: function get() {
      return 2; // PhantomJS crashes when we want to use constant above
    }
    /**
     * Up to date state indicates cells with fresh computed value.
     *
     * @returns {number}
     */

  }, {
    key: "STATE_UP_TO_DATE",
    get: function get() {
      return 3; // PhantomJS crashes when we want to use constant above
    }
  }]);

  return CellValue;
}(BaseCell);

export default CellValue;