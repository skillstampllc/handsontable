"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

exports.__esModule = true;
exports.default = void 0;

var _indexMap = _interopRequireDefault(require("./indexMap"));

var _visuallyIndexed = require("./utils/visuallyIndexed");

var _actionsOnIndexes = require("./utils/actionsOnIndexes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Map for storing mappings from an visual index to an physical index.
 */
var VisualIndexToPhysicalIndexMap =
/*#__PURE__*/
function (_IndexMap) {
  _inherits(VisualIndexToPhysicalIndexMap, _IndexMap);

  function VisualIndexToPhysicalIndexMap() {
    _classCallCheck(this, VisualIndexToPhysicalIndexMap);

    // Not handling custom init function or init value.
    return _possibleConstructorReturn(this, _getPrototypeOf(VisualIndexToPhysicalIndexMap).call(this, function (index) {
      return index;
    }));
  }
  /**
   * Add values to list and reorganize.
   *
   * @private
   * @param {Number} insertionIndex Position inside the list.
   * @param {Array} insertedIndexes List of inserted indexes.
   */


  _createClass(VisualIndexToPhysicalIndexMap, [{
    key: "insert",
    value: function insert(insertionIndex, insertedIndexes) {
      var listAfterUpdate = (0, _actionsOnIndexes.getIncreasedIndexes)(this.indexedValues, insertionIndex, insertedIndexes);
      this.indexedValues = (0, _visuallyIndexed.getListWithInsertedItems)(listAfterUpdate, insertionIndex, insertedIndexes);

      _get(_getPrototypeOf(VisualIndexToPhysicalIndexMap.prototype), "insert", this).call(this, insertionIndex, insertedIndexes);
    }
    /**
     * Remove values from the list and reorganize.
     *
     * @private
     * @param {Array} removedIndexes List of removed indexes.
     */

  }, {
    key: "remove",
    value: function remove(removedIndexes) {
      var listAfterUpdate = (0, _visuallyIndexed.getListWithRemovedItems)(this.indexedValues, removedIndexes);
      this.indexedValues = (0, _actionsOnIndexes.getDecreasedIndexes)(listAfterUpdate, removedIndexes);

      _get(_getPrototypeOf(VisualIndexToPhysicalIndexMap.prototype), "remove", this).call(this, removedIndexes);
    }
  }]);

  return VisualIndexToPhysicalIndexMap;
}(_indexMap.default);

var _default = VisualIndexToPhysicalIndexMap;
exports.default = _default;