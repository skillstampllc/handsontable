"use strict";

require("core-js/modules/es.object.set-prototype-of.js");

require("core-js/modules/es.object.get-prototype-of.js");

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.reflect.get.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.from.js");

exports.__esModule = true;
exports.Formulas = exports.PLUGIN_PRIORITY = exports.PLUGIN_KEY = void 0;

require("core-js/modules/es.array.concat.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.set.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.map.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.array.reverse.js");

require("core-js/modules/es.array.sort.js");

require("core-js/modules/es.weak-map.js");

var _base = require("../base");

var _autofill = require("./autofill");

var _staticRegister = _interopRequireDefault(require("../../utils/staticRegister"));

var _console = require("../../helpers/console");

var _mixed = require("../../helpers/mixed");

var _register = require("./engine/register");

var _utils = require("./utils");

var _settings = require("./engine/settings");

var _data = require("../../helpers/data");

var _string = require("../../helpers/string");

var _pluginHooks = _interopRequireDefault(require("../../pluginHooks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

var PLUGIN_KEY = 'formulas';
exports.PLUGIN_KEY = PLUGIN_KEY;
var PLUGIN_PRIORITY = 260;
exports.PLUGIN_PRIORITY = PLUGIN_PRIORITY;

_pluginHooks.default.getSingleton().register('afterNamedExpressionAdded');

_pluginHooks.default.getSingleton().register('afterNamedExpressionRemoved');

_pluginHooks.default.getSingleton().register('afterSheetAdded');

_pluginHooks.default.getSingleton().register('afterSheetRemoved');

_pluginHooks.default.getSingleton().register('afterSheetRenamed');

_pluginHooks.default.getSingleton().register('afterFormulasValuesUpdate');
/**
 * This plugin allows you to perform Excel-like calculations in your business applications. It does it by an
 * integration with our other product, [HyperFormula](https://github.com/handsontable/hyperformula/), which is a
 * powerful calculation engine with an extensive number of features.
 *
 * @plugin Formulas
 */


var _internalOperationPending = /*#__PURE__*/new WeakMap();

var _hotWasInitializedWithEmptyData = /*#__PURE__*/new WeakMap();

var _engineListeners = /*#__PURE__*/new WeakMap();

var Formulas = /*#__PURE__*/function (_BasePlugin) {
  _inherits(Formulas, _BasePlugin);

  var _super = _createSuper(Formulas);

  function Formulas() {
    var _this;

    _classCallCheck(this, Formulas);

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(_args));

    _internalOperationPending.set(_assertThisInitialized(_this), {
      writable: true,
      value: false
    });

    _hotWasInitializedWithEmptyData.set(_assertThisInitialized(_this), {
      writable: true,
      value: false
    });

    _engineListeners.set(_assertThisInitialized(_this), {
      writable: true,
      value: [['valuesUpdated', function () {
        var _this2;

        return (_this2 = _this).onEngineValuesUpdated.apply(_this2, arguments);
      }], ['namedExpressionAdded', function () {
        var _this3;

        return (_this3 = _this).onEngineNamedExpressionsAdded.apply(_this3, arguments);
      }], ['namedExpressionRemoved', function () {
        var _this4;

        return (_this4 = _this).onEngineNamedExpressionsRemoved.apply(_this4, arguments);
      }], ['sheetAdded', function () {
        var _this5;

        return (_this5 = _this).onEngineSheetAdded.apply(_this5, arguments);
      }], ['sheetRenamed', function () {
        var _this6;

        return (_this6 = _this).onEngineSheetRenamed.apply(_this6, arguments);
      }], ['sheetRemoved', function () {
        var _this7;

        return (_this7 = _this).onEngineSheetRemoved.apply(_this7, arguments);
      }]]
    });

    _defineProperty(_assertThisInitialized(_this), "staticRegister", (0, _staticRegister.default)('formulas'));

    _defineProperty(_assertThisInitialized(_this), "engine", null);

    _defineProperty(_assertThisInitialized(_this), "sheetName", null);

    return _this;
  }

  _createClass(Formulas, [{
    key: "sheetId",
    get:
    /**
     * HyperFormula's sheet id.
     *
     * @type {number|null}
     */
    function get() {
      return this.sheetName === null ? null : this.engine.getSheetId(this.sheetName);
    }
    /**
     * Checks if the plugin is enabled in the handsontable settings. This method is executed in {@link Hooks#beforeInit}
     * hook and if it returns `true` than the {@link Formulas#enablePlugin} method is called.
     *
     * @returns {boolean}
     */

  }, {
    key: "isEnabled",
    value: function isEnabled() {
      /* eslint-disable no-unneeded-ternary */
      return this.hot.getSettings()[PLUGIN_KEY] ? true : false;
    }
    /**
     * Enables the plugin functionality for this Handsontable instance.
     */

  }, {
    key: "enablePlugin",
    value: function enablePlugin() {
      var _setupEngine,
          _this8 = this;

      if (this.enabled) {
        return;
      }

      this.engine = (_setupEngine = (0, _register.setupEngine)(this.hot)) !== null && _setupEngine !== void 0 ? _setupEngine : this.engine;

      if (!this.engine) {
        (0, _console.warn)('Missing the required `engine` key in the Formulas settings. Please fill it with either an' + ' engine class or an engine instance.');
        return;
      } // Useful for disabling -> enabling the plugin using `updateSettings` or the API.


      if (this.sheetName !== null && !this.engine.doesSheetExist(this.sheetName)) {
        this.sheetName = this.addSheet(this.sheetName, this.hot.getSourceDataArray());
      }

      this.addHook('beforeLoadData', function () {
        return _this8.onBeforeLoadData.apply(_this8, arguments);
      });
      this.addHook('afterLoadData', function () {
        return _this8.onAfterLoadData.apply(_this8, arguments);
      });
      this.addHook('modifyData', function () {
        return _this8.onModifyData.apply(_this8, arguments);
      });
      this.addHook('modifySourceData', function () {
        return _this8.onModifySourceData.apply(_this8, arguments);
      });
      this.addHook('afterSetSourceDataAtCell', function () {
        return _this8.onAfterSetSourceDataAtCell.apply(_this8, arguments);
      });
      this.addHook('beforeChange', function () {
        return _this8.onBeforeChange.apply(_this8, arguments);
      });
      this.addHook('beforeValidate', function () {
        return _this8.onBeforeValidate.apply(_this8, arguments);
      });
      this.addHook('beforeCreateRow', function () {
        return _this8.onBeforeCreateRow.apply(_this8, arguments);
      });
      this.addHook('beforeCreateCol', function () {
        return _this8.onBeforeCreateCol.apply(_this8, arguments);
      });
      this.addHook('afterCreateRow', function () {
        return _this8.onAfterCreateRow.apply(_this8, arguments);
      });
      this.addHook('afterCreateCol', function () {
        return _this8.onAfterCreateCol.apply(_this8, arguments);
      });
      this.addHook('beforeRemoveRow', function () {
        return _this8.onBeforeRemoveRow.apply(_this8, arguments);
      });
      this.addHook('beforeRemoveCol', function () {
        return _this8.onBeforeRemoveCol.apply(_this8, arguments);
      });
      this.addHook('afterRemoveRow', function () {
        return _this8.onAfterRemoveRow.apply(_this8, arguments);
      });
      this.addHook('afterRemoveCol', function () {
        return _this8.onAfterRemoveCol.apply(_this8, arguments);
      });
      var autofillHooks = (0, _autofill.createAutofillHooks)(this);
      this.addHook('beforeAutofill', autofillHooks.beforeAutofill);
      this.addHook('afterAutofill', autofillHooks.afterAutofill);

      _classPrivateFieldGet(this, _engineListeners).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            eventName = _ref2[0],
            listener = _ref2[1];

        return _this8.engine.on(eventName, listener);
      });

      _get(_getPrototypeOf(Formulas.prototype), "enablePlugin", this).call(this);
    }
    /**
     * Disables the plugin functionality for this Handsontable instance.
     */

  }, {
    key: "disablePlugin",
    value: function disablePlugin() {
      var _this9 = this;

      _classPrivateFieldGet(this, _engineListeners).forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            eventName = _ref4[0],
            listener = _ref4[1];

        return _this9.engine.off(eventName, listener);
      });

      (0, _register.unregisterEngine)(this.engine, this.hot);

      _get(_getPrototypeOf(Formulas.prototype), "disablePlugin", this).call(this);
    }
    /**
     * Triggered on `updateSettings`.
     *
     * @private
     * @param {object} newSettings New set of settings passed to the `updateSettings` method.
     */

  }, {
    key: "updatePlugin",
    value: function updatePlugin(newSettings) {
      this.engine.updateConfig((0, _settings.getEngineSettingsWithOverrides)(this.hot.getSettings()));
      var pluginSettings = this.hot.getSettings()[PLUGIN_KEY];

      if ((0, _mixed.isDefined)(pluginSettings) && (0, _mixed.isDefined)(pluginSettings.sheetName) && pluginSettings.sheetName !== this.sheetName) {
        this.switchSheet(pluginSettings.sheetName);
      } // If no data was passed to the `updateSettings` method and no sheet is connected to the instance -> create a
      // new sheet using the currently used data. Otherwise, it will be handled by the `afterLoadData` call.


      if (!newSettings.data && this.sheetName === null) {
        var sheetName = this.hot.getSettings()[PLUGIN_KEY].sheetName;

        if (sheetName && this.engine.doesSheetExist(sheetName)) {
          this.switchSheet(this.sheetName);
        } else {
          this.sheetName = this.addSheet(sheetName !== null && sheetName !== void 0 ? sheetName : void 0, this.hot.getSourceDataArray());
        }
      }

      _get(_getPrototypeOf(Formulas.prototype), "updatePlugin", this).call(this, newSettings);
    }
    /**
     * Destroys the plugin instance.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      var _this10 = this;

      _classPrivateFieldGet(this, _engineListeners).forEach(function (_ref5) {
        var _this10$engine;

        var _ref6 = _slicedToArray(_ref5, 2),
            eventName = _ref6[0],
            listener = _ref6[1];

        return (_this10$engine = _this10.engine) === null || _this10$engine === void 0 ? void 0 : _this10$engine.off(eventName, listener);
      });

      _classPrivateFieldSet(this, _engineListeners, null);

      (0, _register.unregisterEngine)(this.engine, this.hot);

      _get(_getPrototypeOf(Formulas.prototype), "destroy", this).call(this);
    }
    /**
     * Helper function for `toPhysicalRowPosition` and `toPhysicalColumnPosition`.
     *
     * @private
     * @param {number} visualIndex Visual entry index.
     * @param {number} physicalIndex Physical entry index.
     * @param {number} entriesCount Visual entries count.
     * @param {number} sourceEntriesCount Source entries count.
     * @param {boolean} contained `true` if it should return only indexes within boundaries of the table (basically
     * `toPhysical` alias.
     * @returns {*}
     */

  }, {
    key: "getPhysicalIndexPosition",
    value: function getPhysicalIndexPosition(visualIndex, physicalIndex, entriesCount, sourceEntriesCount, contained) {
      if (!contained) {
        if (visualIndex >= entriesCount) {
          return sourceEntriesCount + (visualIndex - entriesCount);
        }
      }

      return physicalIndex;
    }
    /**
     * Returns the physical row index. The difference between this and Core's `toPhysical` is that it doesn't return
     * `null` on rows with indexes higher than the number of rows.
     *
     * @private
     * @param {number} row Visual row index.
     * @param {boolean} [contained] `true` if it should return only indexes within boundaries of the table (basically
     * `toPhysical` alias.
     * @returns {number} The physical row index.
     */

  }, {
    key: "toPhysicalRowPosition",
    value: function toPhysicalRowPosition(row) {
      var contained = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return this.getPhysicalIndexPosition(row, this.hot.toPhysicalRow(row), this.hot.countRows(), this.hot.countSourceRows(), contained);
    }
    /**
     * Returns the physical column index. The difference between this and Core's `toPhysical` is that it doesn't return
     * `null` on columns with indexes higher than the number of columns.
     *
     * @private
     * @param {number} column Visual column index.
     * @param {boolean} [contained] `true` if it should return only indexes within boundaries of the table (basically
     * `toPhysical` alias.
     * @returns {number} The physical column index.
     */

  }, {
    key: "toPhysicalColumnPosition",
    value: function toPhysicalColumnPosition(column) {
      var contained = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return this.getPhysicalIndexPosition(column, this.hot.toPhysicalColumn(column), this.hot.countCols(), this.hot.countSourceCols(), contained);
    }
    /**
     * Add a sheet to the shared HyperFormula instance.
     *
     * @param {string|null} [sheetName] The new sheet name. If not provided (or a null is passed), will be
     * auto-generated by HyperFormula.
     * @param {Array} [sheetData] Data passed to the shared HyperFormula instance. Has to be declared as an array of
     * arrays - array of objects is not supported in this scenario.
     * @returns {boolean|string} `false` if the data format is unusable or it is impossible to add a new sheet to the
     * engine, the created sheet name otherwise.
     */

  }, {
    key: "addSheet",
    value: function addSheet(sheetName, sheetData) {
      if ((0, _mixed.isDefined)(sheetData) && !(0, _data.isArrayOfArrays)(sheetData)) {
        (0, _console.warn)('The provided data should be an array of arrays.');
        return false;
      }

      if (sheetName !== void 0 && sheetName !== null && this.engine.doesSheetExist(sheetName)) {
        (0, _console.warn)('Sheet with the provided name already exists.');
        return false;
      }

      try {
        var actualSheetName = this.engine.addSheet(sheetName !== null && sheetName !== void 0 ? sheetName : void 0);

        if (sheetData) {
          this.engine.setSheetContent(actualSheetName, sheetData);
        }

        return actualSheetName;
      } catch (e) {
        (0, _console.warn)(e.message);
        return false;
      }
    }
    /**
     * Switch the sheet used as data in the Handsontable instance (it loads the data from the shared HyperFormula
     * instance).
     *
     * @param {string} sheetName Sheet name used in the shared HyperFormula instance.
     */

  }, {
    key: "switchSheet",
    value: function switchSheet(sheetName) {
      if (!this.engine.doesSheetExist(sheetName)) {
        (0, _console.error)("The sheet named `".concat(sheetName, "` does not exist, switch aborted."));
        return;
      }

      this.sheetName = sheetName;
      var serialized = this.engine.getSheetSerialized(this.sheetId);

      if (serialized.length > 0) {
        this.hot.loadData(serialized, "".concat((0, _string.toUpperCaseFirst)(PLUGIN_KEY), ".switchSheet"));
      }
    }
    /**
     * Get the cell type under specified visual coordinates.
     *
     * @param {number} row Visual row index.
     * @param {number} column Visual column index.
     * @param {number} [sheet] The target sheet id, defaults to the current sheet.
     * @returns {string} Possible values: 'FORMULA' | 'VALUE' | 'MATRIX' | 'EMPTY'.
     */

  }, {
    key: "getCellType",
    value: function getCellType(row, column) {
      var sheet = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.sheetId;
      return this.engine.getCellType({
        sheet: sheet,
        row: this.hot.toPhysicalRow(row),
        col: this.hot.toPhysicalColumn(column)
      });
    }
    /**
     * Returns `true` if under specified visual coordinates is formula.
     *
     * @param {number} row Visual row index.
     * @param {number} column Visual column index.
     * @param {number} [sheet] The target sheet id, defaults to the current sheet.
     * @returns {boolean}
     */

  }, {
    key: "isFormulaCellType",
    value: function isFormulaCellType(row, column) {
      var sheet = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.sheetId;
      var cellType = this.getCellType(row, column, sheet);
      return cellType === 'FORMULA' || cellType === 'MATRIX';
    }
    /**
     * Renders dependent sheets (handsontable instances) based on the changes - list of the
     * recalculated dependent cells.
     *
     * @private
     * @param {object[]} changedCells The values and location of applied changes within HF engine.
     * @param {boolean} [renderSelf] `true` if it's supposed to render itself, `false` otherwise.
     */

  }, {
    key: "renderDependentSheets",
    value: function renderDependentSheets(changedCells) {
      var _this11 = this;

      var renderSelf = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var affectedSheetIds = new Set();
      changedCells.forEach(function (change) {
        var _change$address;

        // For the Named expression the address is empty, hence the `sheetId` is undefined.
        var sheetId = change === null || change === void 0 ? void 0 : (_change$address = change.address) === null || _change$address === void 0 ? void 0 : _change$address.sheet;

        if (sheetId !== void 0) {
          if (!affectedSheetIds.has(sheetId)) {
            affectedSheetIds.add(sheetId);
          }

          if (!_classPrivateFieldGet(_this11, _internalOperationPending) && sheetId === _this11.sheetId) {
            var _change$address2 = change.address,
                row = _change$address2.row,
                col = _change$address2.col; // It will just re-render certain cell when necessary.

            _this11.hot.validateCell(_this11.hot.getDataAtCell(row, col), _this11.hot.getCellMeta(row, col), function () {});
          }
        }
      });
      var hotInstances = new Map((0, _register.getRegisteredHotInstances)(this.engine).map(function (hot) {
        return [hot.getPlugin('formulas').sheetId, hot];
      }));
      hotInstances.forEach(function (relatedHot, sheetId) {
        if ((renderSelf || sheetId !== _this11.sheetId) && affectedSheetIds.has(sheetId)) {
          var _relatedHot$view;

          relatedHot.render();
          (_relatedHot$view = relatedHot.view) === null || _relatedHot$view === void 0 ? void 0 : _relatedHot$view.adjustElementsSize();
        }
      });
    }
    /**
     * Sync a change from the change-related hooks with the engine.
     *
     * @private
     * @param {number} row Visual row index.
     * @param {number} column Visual column index.
     * @param {Handsontable.CellValue} newValue New value.
     * @returns {Array} Array of changes exported from the engine.
     */

  }, {
    key: "syncChangeWithEngine",
    value: function syncChangeWithEngine(row, column, newValue) {
      var address = {
        row: this.toPhysicalRowPosition(row),
        col: this.toPhysicalColumnPosition(column),
        sheet: this.sheetId
      };

      if (!this.engine.isItPossibleToSetCellContents(address)) {
        (0, _console.warn)("Not possible to set cell data at ".concat(JSON.stringify(address)));
        return;
      }

      return this.engine.setCellContents(address, newValue);
    }
    /**
     * The hook allows to translate the formula value to calculated value before it goes to the
     * validator function.
     *
     * @private
     * @param {*} value The cell value to validate.
     * @param {number} visualRow The visual row index.
     * @param {number|string} prop The visual column index or property name of the column.
     * @returns {*} Returns value to validate.
     */

  }, {
    key: "onBeforeValidate",
    value: function onBeforeValidate(value, visualRow, prop) {
      var visualColumn = this.hot.propToCol(prop);

      if (this.isFormulaCellType(visualRow, visualColumn)) {
        var address = {
          row: this.hot.toPhysicalRow(visualRow),
          col: this.hot.toPhysicalColumn(visualColumn),
          sheet: this.sheetId
        };
        return this.engine.getCellValue(address);
      }

      return value;
    }
    /**
     * `beforeLoadData` hook callback.
     *
     * @param {Array} sourceData Array of arrays or array of objects containing data.
     * @param {boolean} initialLoad Flag that determines whether the data has been loaded during the initialization.
     * @param {string} [source] Source of the call.
     * @private
     */

  }, {
    key: "onBeforeLoadData",
    value: function onBeforeLoadData(sourceData, initialLoad) {
      var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      if (source.includes((0, _string.toUpperCaseFirst)(PLUGIN_KEY))) {
        return;
      } // This flag needs to be defined, because not passing data to HOT results in HOT auto-generating a `null`-filled
      // initial dataset.


      _classPrivateFieldSet(this, _hotWasInitializedWithEmptyData, (0, _mixed.isUndefined)(this.hot.getSettings().data));
    }
    /**
     * `afterLoadData` hook callback.
     *
     * @param {Array} sourceData Array of arrays or array of objects containing data.
     * @param {boolean} initialLoad Flag that determines whether the data has been loaded during the initialization.
     * @param {string} [source] Source of the call.
     * @private
     */

  }, {
    key: "onAfterLoadData",
    value: function onAfterLoadData(sourceData, initialLoad) {
      var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      if (source.includes((0, _string.toUpperCaseFirst)(PLUGIN_KEY))) {
        return;
      }

      this.sheetName = (0, _register.setupSheet)(this.engine, this.hot.getSettings()[PLUGIN_KEY].sheetName);

      if (!_classPrivateFieldGet(this, _hotWasInitializedWithEmptyData)) {
        var sourceDataArray = this.hot.getSourceDataArray();

        if (this.engine.isItPossibleToReplaceSheetContent(this.sheetName, sourceDataArray)) {
          _classPrivateFieldSet(this, _internalOperationPending, true);

          var dependentCells = this.engine.setSheetContent(this.sheetName, this.hot.getSourceDataArray());
          this.renderDependentSheets(dependentCells);

          _classPrivateFieldSet(this, _internalOperationPending, false);
        }
      } else {
        this.switchSheet(this.sheetName);
      }
    }
    /**
     * `modifyData` hook callback.
     *
     * @private
     * @param {number} row Physical row height.
     * @param {number} column Physical column index.
     * @param {object} valueHolder Object which contains original value which can be modified by overwriting `.value`
     *   property.
     * @param {string} ioMode String which indicates for what operation hook is fired (`get` or `set`).
     */

  }, {
    key: "onModifyData",
    value: function onModifyData(row, column, valueHolder, ioMode) {
      if (ioMode !== 'get' || _classPrivateFieldGet(this, _internalOperationPending) || this.sheetName === null || !this.engine.doesSheetExist(this.sheetName)) {
        return;
      } // `column` is here as visual index because of inconsistencies related to hook execution in `src/dataMap`.


      var isFormulaCellType = this.isFormulaCellType(this.hot.toVisualRow(row), column);

      if (!isFormulaCellType) {
        if ((0, _utils.isEscapedFormulaExpression)(valueHolder.value)) {
          valueHolder.value = (0, _utils.unescapeFormulaExpression)(valueHolder.value);
        }

        return;
      } // `toPhysicalColumn` is here because of inconsistencies related to hook execution in `src/dataMap`.


      var address = {
        row: row,
        col: this.toPhysicalColumnPosition(column),
        sheet: this.sheetId
      };
      var cellValue = this.engine.getCellValue(address); // If `cellValue` is an object it is expected to be an error

      var value = _typeof(cellValue) === 'object' && cellValue !== null ? cellValue.value : cellValue;
      valueHolder.value = value;
    }
    /**
     * `modifySourceData` hook callback.
     *
     * @private
     * @param {number} row Physical row index.
     * @param {number|string} columnOrProp Physical column index or prop.
     * @param {object} valueHolder Object which contains original value which can be modified by overwriting `.value`
     *   property.
     * @param {string} ioMode String which indicates for what operation hook is fired (`get` or `set`).
     */

  }, {
    key: "onModifySourceData",
    value: function onModifySourceData(row, columnOrProp, valueHolder, ioMode) {
      if (ioMode !== 'get' || _classPrivateFieldGet(this, _internalOperationPending) || this.sheetName === null || !this.engine.doesSheetExist(this.sheetName)) {
        return;
      }

      var visualColumn = this.hot.propToCol(columnOrProp); // `column` is here as visual index because of inconsistencies related to hook execution in `src/dataMap`.

      var isFormulaCellType = this.isFormulaCellType(this.hot.toVisualRow(row), visualColumn);

      if (!isFormulaCellType) {
        return;
      }

      var dimensions = this.engine.getSheetDimensions(this.engine.getSheetId(this.sheetName)); // Don't actually change the source data if HyperFormula is not
      // initialized yet. This is done to allow the `afterLoadData` hook to
      // load the existing source data with `Handsontable#getSourceDataArray`
      // properly.

      if (dimensions.width === 0 && dimensions.height === 0) {
        return;
      }

      var address = {
        row: row,
        // Workaround for inconsistencies in `src/dataSource.js`
        col: this.toPhysicalColumnPosition(visualColumn),
        sheet: this.sheetId
      };
      valueHolder.value = this.engine.getCellSerialized(address);
    }
    /**
     * `onBeforeChange` hook callback.
     *
     * @private
     * @param {Array[]} changes An array of changes in format [[row, prop, oldValue, value], ...].
     */

  }, {
    key: "onBeforeChange",
    value: function onBeforeChange(changes) {
      var _this12 = this;

      var dependentCells = [];
      var outOfBoundsChanges = [];
      changes.forEach(function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 4),
            row = _ref8[0],
            prop = _ref8[1],
            newValue = _ref8[3];

        var column = _this12.hot.propToCol(prop);

        if (_this12.hot.toPhysicalRow(row) !== null && _this12.hot.toPhysicalColumn(column) !== null) {
          dependentCells.push.apply(dependentCells, _toConsumableArray(_this12.syncChangeWithEngine(row, column, newValue)));
        } else {
          outOfBoundsChanges.push([row, column, newValue]);
        }
      });

      if (outOfBoundsChanges.length) {
        // Workaround for rows/columns being created two times (by HOT and the engine).
        // (unfortunately, this requires an extra re-render)
        this.hot.addHookOnce('afterChange', function () {
          var outOfBoundsDependentCells = [];
          outOfBoundsChanges.forEach(function (_ref9) {
            var _ref10 = _slicedToArray(_ref9, 3),
                row = _ref10[0],
                column = _ref10[1],
                newValue = _ref10[2];

            outOfBoundsDependentCells.push.apply(outOfBoundsDependentCells, _toConsumableArray(_this12.syncChangeWithEngine(row, column, newValue)));
          });

          _this12.renderDependentSheets(outOfBoundsDependentCells, true);
        });
      }

      this.renderDependentSheets(dependentCells);
    }
    /**
     * `onAfterSetSourceDataAtCell` hook callback.
     *
     * @private
     * @param {Array[]} changes An array of changes in format [[row, column, oldValue, value], ...].
     */

  }, {
    key: "onAfterSetSourceDataAtCell",
    value: function onAfterSetSourceDataAtCell(changes) {
      var _this13 = this;

      var dependentCells = [];
      changes.forEach(function (_ref11) {
        var _ref12 = _slicedToArray(_ref11, 4),
            row = _ref12[0],
            column = _ref12[1],
            newValue = _ref12[3];

        var address = {
          row: row,
          col: _this13.toPhysicalColumnPosition(column),
          sheet: _this13.sheetId
        };

        if (!_this13.engine.isItPossibleToSetCellContents(address)) {
          (0, _console.warn)("Not possible to set source cell data at ".concat(JSON.stringify(address)));
          return;
        }

        dependentCells.push.apply(dependentCells, _toConsumableArray(_this13.engine.setCellContents(address, newValue)));
      });
      this.renderDependentSheets(dependentCells);
    }
    /**
     * `beforeCreateRow` hook callback.
     *
     * @private
     * @param {number} row Represents the visual index of first newly created row in the data source array.
     * @param {number} amount Number of newly created rows in the data source array.
     * @returns {*|boolean} If false is returned the action is canceled.
     */

  }, {
    key: "onBeforeCreateRow",
    value: function onBeforeCreateRow(row, amount) {
      if (!this.engine.isItPossibleToAddRows(this.sheetId, [this.toPhysicalRowPosition(row), amount])) {
        return false;
      }
    }
    /**
     * `beforeCreateCol` hook callback.
     *
     * @private
     * @param {number} col Represents the visual index of first newly created column in the data source.
     * @param {number} amount Number of newly created columns in the data source.
     * @returns {*|boolean} If false is returned the action is canceled.
     */

  }, {
    key: "onBeforeCreateCol",
    value: function onBeforeCreateCol(col, amount) {
      if (!this.engine.isItPossibleToAddColumns(this.sheetId, [this.toPhysicalColumnPosition(col), amount])) {
        return false;
      }
    }
    /**
     * `beforeRemoveRow` hook callback.
     *
     * @private
     * @param {number} row Visual index of starter row.
     * @param {number} amount Amount of rows to be removed.
     * @param {number[]} physicalRows An array of physical rows removed from the data source.
     * @returns {*|boolean} If false is returned the action is canceled.
     */

  }, {
    key: "onBeforeRemoveRow",
    value: function onBeforeRemoveRow(row, amount, physicalRows) {
      var _this14 = this;

      var possible = physicalRows.every(function (physicalRow) {
        return _this14.engine.isItPossibleToRemoveRows(_this14.sheetId, [physicalRow, 1]);
      });
      return possible === false ? false : void 0;
    }
    /**
     * `beforeRemoveCol` hook callback.
     *
     * @private
     * @param {number} col Visual index of starter column.
     * @param {number} amount Amount of columns to be removed.
     * @param {number[]} physicalColumns An array of physical columns removed from the data source.
     * @returns {*|boolean} If false is returned the action is canceled.
     */

  }, {
    key: "onBeforeRemoveCol",
    value: function onBeforeRemoveCol(col, amount, physicalColumns) {
      var _this15 = this;

      var possible = physicalColumns.every(function (physicalColumn) {
        return _this15.engine.isItPossibleToRemoveColumns(_this15.sheetId, [physicalColumn, 1]);
      });
      return possible === false ? false : void 0;
    }
    /**
     * `afterCreateRow` hook callback.
     *
     * @private
     * @param {number} row Represents the visual index of first newly created row in the data source array.
     * @param {number} amount Number of newly created rows in the data source array.
     */

  }, {
    key: "onAfterCreateRow",
    value: function onAfterCreateRow(row, amount) {
      var changes = this.engine.addRows(this.sheetId, [this.toPhysicalRowPosition(row), amount]);
      this.renderDependentSheets(changes);
    }
    /**
     * `afterCreateCol` hook callback.
     *
     * @private
     * @param {number} col Represents the visual index of first newly created column in the data source.
     * @param {number} amount Number of newly created columns in the data source.
     */

  }, {
    key: "onAfterCreateCol",
    value: function onAfterCreateCol(col, amount) {
      var changes = this.engine.addColumns(this.sheetId, [this.toPhysicalColumnPosition(col), amount]);
      this.renderDependentSheets(changes);
    }
    /**
     * `afterRemoveRow` hook callback.
     *
     * @private
     * @param {number} row Visual index of starter row.
     * @param {number} amount An amount of removed rows.
     * @param {number[]} physicalRows An array of physical rows removed from the data source.
     */

  }, {
    key: "onAfterRemoveRow",
    value: function onAfterRemoveRow(row, amount, physicalRows) {
      var _this16 = this;

      var descendingPhysicalRows = physicalRows.sort().reverse();
      var changes = this.engine.batch(function () {
        descendingPhysicalRows.forEach(function (physicalRow) {
          _this16.engine.removeRows(_this16.sheetId, [physicalRow, 1]);
        });
      });
      this.renderDependentSheets(changes);
    }
    /**
     * `afterRemoveCol` hook callback.
     *
     * @private
     * @param {number} col Visual index of starter column.
     * @param {number} amount An amount of removed columns.
     * @param {number[]} physicalColumns An array of physical columns removed from the data source.
     */

  }, {
    key: "onAfterRemoveCol",
    value: function onAfterRemoveCol(col, amount, physicalColumns) {
      var _this17 = this;

      var descendingPhysicalColumns = physicalColumns.sort().reverse();
      var changes = this.engine.batch(function () {
        descendingPhysicalColumns.forEach(function (physicalColumn) {
          _this17.engine.removeColumns(_this17.sheetId, [physicalColumn, 1]);
        });
      });
      this.renderDependentSheets(changes);
    }
    /**
     * Called when a value is updated in the engine.
     *
     * @private
     * @fires Hooks#afterFormulasValuesUpdate
     * @param {Array} changes The values and location of applied changes.
     */

  }, {
    key: "onEngineValuesUpdated",
    value: function onEngineValuesUpdated(changes) {
      this.hot.runHooks('afterFormulasValuesUpdate', changes);
    }
    /**
     * Called when a named expression is added to the engine instance.
     *
     * @private
     * @fires Hooks#afterNamedExpressionAdded
     * @param {string} namedExpressionName The name of the added expression.
     * @param {Array} changes The values and location of applied changes.
     */

  }, {
    key: "onEngineNamedExpressionsAdded",
    value: function onEngineNamedExpressionsAdded(namedExpressionName, changes) {
      this.hot.runHooks('afterNamedExpressionAdded', namedExpressionName, changes);
    }
    /**
     * Called when a named expression is removed from the engine instance.
     *
     * @private
     * @fires Hooks#afterNamedExpressionRemoved
     * @param {string} namedExpressionName The name of the removed expression.
     * @param {Array} changes The values and location of applied changes.
     */

  }, {
    key: "onEngineNamedExpressionsRemoved",
    value: function onEngineNamedExpressionsRemoved(namedExpressionName, changes) {
      this.hot.runHooks('afterNamedExpressionRemoved', namedExpressionName, changes);
    }
    /**
     * Called when a new sheet is added to the engine instance.
     *
     * @private
     * @fires Hooks#afterSheetAdded
     * @param {string} addedSheetDisplayName The name of the added sheet.
     */

  }, {
    key: "onEngineSheetAdded",
    value: function onEngineSheetAdded(addedSheetDisplayName) {
      this.hot.runHooks('afterSheetAdded', addedSheetDisplayName);
    }
    /**
     * Called when a sheet in the engine instance is renamed.
     *
     * @private
     * @fires Hooks#afterSheetRenamed
     * @param {string} oldDisplayName The old name of the sheet.
     * @param {string} newDisplayName The new name of the sheet.
     */

  }, {
    key: "onEngineSheetRenamed",
    value: function onEngineSheetRenamed(oldDisplayName, newDisplayName) {
      this.hot.runHooks('afterSheetRenamed', oldDisplayName, newDisplayName);
    }
    /**
     * Called when a sheet is removed from the engine instance.
     *
     * @private
     * @fires Hooks#afterSheetRemoved
     * @param {string} removedSheetDisplayName The removed sheet name.
     * @param {Array} changes The values and location of applied changes.
     */

  }, {
    key: "onEngineSheetRemoved",
    value: function onEngineSheetRemoved(removedSheetDisplayName, changes) {
      this.hot.runHooks('afterSheetRemoved', removedSheetDisplayName, changes);
    }
  }], [{
    key: "PLUGIN_KEY",
    get: function get() {
      return PLUGIN_KEY;
    }
  }, {
    key: "PLUGIN_PRIORITY",
    get: function get() {
      return PLUGIN_PRIORITY;
    }
    /**
     * Flag used to bypass hooks in internal operations.
     *
     * @private
     * @type {boolean}
     */

  }]);

  return Formulas;
}(_base.BasePlugin);

exports.Formulas = Formulas;