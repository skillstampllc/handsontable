"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.object.set-prototype-of.js");

require("core-js/modules/es.object.get-prototype-of.js");

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.reflect.get.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.object.freeze.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

exports.__esModule = true;
exports.NestedHeaders = exports.PLUGIN_PRIORITY = exports.PLUGIN_KEY = void 0;

require("core-js/modules/es.array.concat.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/web.dom-collections.iterator.js");

var _element = require("../../helpers/dom/element");

var _number = require("../../helpers/number");

var _event = require("../../helpers/dom/event");

var _templateLiteralTag = require("../../helpers/templateLiteralTag");

var _console = require("../../helpers/console");

var _selection = require("../../selection");

var _base = require("../base");

var _stateManager2 = _interopRequireDefault(require("./stateManager"));

var _ghostTable = _interopRequireDefault(require("./utils/ghostTable"));

var _templateObject, _templateObject2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

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

var PLUGIN_KEY = 'nestedHeaders';
exports.PLUGIN_KEY = PLUGIN_KEY;
var PLUGIN_PRIORITY = 280;
/**
 * @plugin NestedHeaders
 * @class NestedHeaders
 *
 * @description
 * The plugin allows to create a nested header structure, using the HTML's colspan attribute.
 *
 * To make any header wider (covering multiple table columns), it's corresponding configuration array element should be
 * provided as an object with `label` and `colspan` properties. The `label` property defines the header's label,
 * while the `colspan` property defines a number of columns that the header should cover.
 *
 * __Note__ that the plugin supports a *nested* structure, which means, any header cannot be wider than it's "parent". In
 * other words, headers cannot overlap each other.
 * @example
 *
 * ```js
 * const container = document.getElementById('example');
 * const hot = new Handsontable(container, {
 *   data: getData(),
 *   nestedHeaders: [
 *     ['A', {label: 'B', colspan: 8}, 'C'],
 *     ['D', {label: 'E', colspan: 4}, {label: 'F', colspan: 4}, 'G'],
 *     ['H', {label: 'I', colspan: 2}, {label: 'J', colspan: 2}, {label: 'K', colspan: 2}, {label: 'L', colspan: 2}, 'M'],
 *     ['N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W']
 *  ],
 * ```
 */

exports.PLUGIN_PRIORITY = PLUGIN_PRIORITY;

var _stateManager = /*#__PURE__*/new WeakMap();

var _hidingIndexMapObserver = /*#__PURE__*/new WeakMap();

var NestedHeaders = /*#__PURE__*/function (_BasePlugin) {
  _inherits(NestedHeaders, _BasePlugin);

  var _super = _createSuper(NestedHeaders);

  function NestedHeaders() {
    var _this;

    _classCallCheck(this, NestedHeaders);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _stateManager.set(_assertThisInitialized(_this), {
      writable: true,
      value: new _stateManager2.default()
    });

    _hidingIndexMapObserver.set(_assertThisInitialized(_this), {
      writable: true,
      value: null
    });

    _defineProperty(_assertThisInitialized(_this), "ghostTable", new _ghostTable.default(_assertThisInitialized(_this)));

    _defineProperty(_assertThisInitialized(_this), "detectedOverlappedHeaders", false);

    return _this;
  }

  _createClass(NestedHeaders, [{
    key: "isEnabled",
    value:
    /**
     * Check if plugin is enabled.
     *
     * @returns {boolean}
     */
    function isEnabled() {
      return !!this.hot.getSettings()[PLUGIN_KEY];
    }
    /**
     * Enables the plugin functionality for this Handsontable instance.
     */

  }, {
    key: "enablePlugin",
    value: function enablePlugin() {
      var _this2 = this;

      if (this.enabled) {
        return;
      }

      var _this$hot$getSettings = this.hot.getSettings(),
          nestedHeaders = _this$hot$getSettings.nestedHeaders;

      if (!Array.isArray(nestedHeaders) || !Array.isArray(nestedHeaders[0])) {
        (0, _console.warn)((0, _templateLiteralTag.toSingleLine)(_templateObject || (_templateObject = _taggedTemplateLiteral(["Your Nested Headers plugin configuration is invalid. The settings has to be \n                        passed as an array of arrays e.q. [['A1', { label: 'A2', colspan: 2 }]]"], ["Your Nested Headers plugin configuration is invalid. The settings has to be\\x20\n                        passed as an array of arrays e.q. [['A1', { label: 'A2', colspan: 2 }]]"]))));
      }

      this.addHook('init', function () {
        return _this2.onInit();
      });
      this.addHook('afterLoadData', function () {
        return _this2.onAfterLoadData.apply(_this2, arguments);
      });
      this.addHook('beforeOnCellMouseDown', function () {
        return _this2.onBeforeOnCellMouseDown.apply(_this2, arguments);
      });
      this.addHook('afterOnCellMouseDown', function () {
        return _this2.onAfterOnCellMouseDown.apply(_this2, arguments);
      });
      this.addHook('beforeOnCellMouseOver', function () {
        return _this2.onBeforeOnCellMouseOver.apply(_this2, arguments);
      });
      this.addHook('afterGetColumnHeaderRenderers', function (array) {
        return _this2.onAfterGetColumnHeaderRenderers(array);
      });
      this.addHook('modifyColWidth', function () {
        return _this2.onModifyColWidth.apply(_this2, arguments);
      });
      this.addHook('beforeHighlightingColumnHeader', function () {
        return _this2.onBeforeHighlightingColumnHeader.apply(_this2, arguments);
      });
      this.addHook('afterViewportColumnCalculatorOverride', function () {
        return _this2.onAfterViewportColumnCalculatorOverride.apply(_this2, arguments);
      });

      _get(_getPrototypeOf(NestedHeaders.prototype), "enablePlugin", this).call(this);

      this.updatePlugin(); // @TODO: Workaround for broken plugin initialization abstraction.
    }
    /**
     * Updates the plugin state. This method is executed when {@link Core#updateSettings} is invoked.
     */

  }, {
    key: "updatePlugin",
    value: function updatePlugin() {
      var _this3 = this;

      if (!this.hot.view) {
        // @TODO: Workaround for broken plugin initialization abstraction.
        return;
      }

      var _this$hot$getSettings2 = this.hot.getSettings(),
          nestedHeaders = _this$hot$getSettings2.nestedHeaders;

      _classPrivateFieldGet(this, _stateManager).setColumnsLimit(this.hot.countSourceCols());

      if (Array.isArray(nestedHeaders)) {
        this.detectedOverlappedHeaders = _classPrivateFieldGet(this, _stateManager).setState(nestedHeaders);
      }

      if (this.detectedOverlappedHeaders) {
        (0, _console.warn)((0, _templateLiteralTag.toSingleLine)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["Your Nested Headers plugin setup contains overlapping headers. This kind of configuration \n                        is currently not supported."], ["Your Nested Headers plugin setup contains overlapping headers. This kind of configuration\\x20\n                        is currently not supported."]))));
      }

      if (this.enabled) {
        // This line covers the case when a developer uses the external hiding maps to manipulate
        // the columns' visibility. The tree state built from the settings - which is always built
        // as if all the columns are visible, needs to be modified to be in sync with a dataset.
        this.hot.columnIndexMapper.hidingMapsCollection.getMergedValues().forEach(function (isColumnHidden, physicalColumnIndex) {
          var actionName = isColumnHidden === true ? 'hide-column' : 'show-column';

          _classPrivateFieldGet(_this3, _stateManager).triggerColumnModification(actionName, physicalColumnIndex);
        });
      }

      if (!_classPrivateFieldGet(this, _hidingIndexMapObserver) && this.enabled) {
        _classPrivateFieldSet(this, _hidingIndexMapObserver, this.hot.columnIndexMapper.createChangesObserver('hiding').subscribe(function (changes) {
          changes.forEach(function (_ref) {
            var op = _ref.op,
                columnIndex = _ref.index,
                newValue = _ref.newValue;

            if (op === 'replace') {
              var actionName = newValue === true ? 'hide-column' : 'show-column';

              _classPrivateFieldGet(_this3, _stateManager).triggerColumnModification(actionName, columnIndex);
            }
          });
        }));
      }

      this.ghostTable.buildWidthsMapper();

      _get(_getPrototypeOf(NestedHeaders.prototype), "updatePlugin", this).call(this);
    }
    /**
     * Disables the plugin functionality for this Handsontable instance.
     */

  }, {
    key: "disablePlugin",
    value: function disablePlugin() {
      this.clearColspans();

      _classPrivateFieldGet(this, _stateManager).clear();

      _classPrivateFieldGet(this, _hidingIndexMapObserver).unsubscribe();

      _classPrivateFieldSet(this, _hidingIndexMapObserver, null);

      this.ghostTable.clear();

      _get(_getPrototypeOf(NestedHeaders.prototype), "disablePlugin", this).call(this);
    }
    /**
     * Returns an instance of the internal state manager of the plugin.
     *
     * @private
     * @returns {StateManager}
     */

  }, {
    key: "getStateManager",
    value: function getStateManager() {
      return _classPrivateFieldGet(this, _stateManager);
    }
    /**
     * Gets a total number of headers levels.
     *
     * @private
     * @returns {number}
     */

  }, {
    key: "getLayersCount",
    value: function getLayersCount() {
      return _classPrivateFieldGet(this, _stateManager).getLayersCount();
    }
    /**
     * Gets column settings for a specified header. The returned object contains
     * information about the header label, its colspan length, or if it is hidden
     * in the header renderers.
     *
     * @private
     * @param {number} headerLevel Header level (0 = most distant to the table).
     * @param {number} columnIndex A visual column index.
     * @returns {object}
     */

  }, {
    key: "getHeaderSettings",
    value: function getHeaderSettings(headerLevel, columnIndex) {
      return _classPrivateFieldGet(this, _stateManager).getHeaderSettings(headerLevel, columnIndex);
    }
    /**
     * Clear the colspans remaining after plugin usage.
     *
     * @private
     */

  }, {
    key: "clearColspans",
    value: function clearColspans() {
      if (!this.hot.view) {
        return;
      }

      var wt = this.hot.view.wt;
      var headerLevels = wt.getSetting('columnHeaders').length;
      var mainHeaders = wt.wtTable.THEAD;
      var topHeaders = wt.wtOverlays.topOverlay.clone.wtTable.THEAD;
      var topLeftCornerHeaders = wt.wtOverlays.topLeftCornerOverlay ? wt.wtOverlays.topLeftCornerOverlay.clone.wtTable.THEAD : null;

      for (var i = 0; i < headerLevels; i++) {
        var masterLevel = mainHeaders.childNodes[i];

        if (!masterLevel) {
          break;
        }

        var topLevel = topHeaders.childNodes[i];
        var topLeftCornerLevel = topLeftCornerHeaders ? topLeftCornerHeaders.childNodes[i] : null;

        for (var j = 0, masterNodes = masterLevel.childNodes.length; j < masterNodes; j++) {
          masterLevel.childNodes[j].removeAttribute('colspan');
          (0, _element.removeClass)(masterLevel.childNodes[j], 'hiddenHeader');

          if (topLevel && topLevel.childNodes[j]) {
            topLevel.childNodes[j].removeAttribute('colspan');
            (0, _element.removeClass)(topLevel.childNodes[j], 'hiddenHeader');
          }

          if (topLeftCornerHeaders && topLeftCornerLevel && topLeftCornerLevel.childNodes[j]) {
            topLeftCornerLevel.childNodes[j].removeAttribute('colspan');
            (0, _element.removeClass)(topLeftCornerLevel.childNodes[j], 'hiddenHeader');
          }
        }
      }
    }
    /**
     * Generates the appropriate header renderer for a header row.
     *
     * @private
     * @param {number} headerLevel The index of header level counting from the top (positive
     *                             values counting from 0 to N).
     * @returns {Function}
     * @fires Hooks#afterGetColHeader
     */

  }, {
    key: "headerRendererFactory",
    value: function headerRendererFactory(headerLevel) {
      var _this4 = this;

      var fixedColumnsLeft = this.hot.view.wt.getSetting('fixedColumnsLeft');
      return function (renderedColumnIndex, TH) {
        var _classPrivateFieldGet2;

        var _this4$hot = _this4.hot,
            rootDocument = _this4$hot.rootDocument,
            columnIndexMapper = _this4$hot.columnIndexMapper,
            view = _this4$hot.view;
        var visualColumnsIndex = columnIndexMapper.getVisualFromRenderableIndex(renderedColumnIndex);

        if (visualColumnsIndex === null) {
          visualColumnsIndex = renderedColumnIndex;
        }

        TH.removeAttribute('colspan');
        (0, _element.removeClass)(TH, 'hiddenHeader');

        var _ref2 = (_classPrivateFieldGet2 = _classPrivateFieldGet(_this4, _stateManager).getHeaderSettings(headerLevel, visualColumnsIndex)) !== null && _classPrivateFieldGet2 !== void 0 ? _classPrivateFieldGet2 : {
          label: ''
        },
            colspan = _ref2.colspan,
            label = _ref2.label,
            isHidden = _ref2.isHidden,
            isPlaceholder = _ref2.isPlaceholder;

        if (isPlaceholder || isHidden) {
          (0, _element.addClass)(TH, 'hiddenHeader');
        } else if (colspan > 1) {
          var _view$wt$wtOverlays$t, _view$wt$wtOverlays$l;

          var isTopLeftOverlay = (_view$wt$wtOverlays$t = view.wt.wtOverlays.topLeftCornerOverlay) === null || _view$wt$wtOverlays$t === void 0 ? void 0 : _view$wt$wtOverlays$t.clone.wtTable.THEAD.contains(TH);
          var isLeftOverlay = (_view$wt$wtOverlays$l = view.wt.wtOverlays.leftOverlay) === null || _view$wt$wtOverlays$l === void 0 ? void 0 : _view$wt$wtOverlays$l.clone.wtTable.THEAD.contains(TH); // Check if there is a fixed column enabled, if so then reduce colspan to fixed column width.

          var correctedColspan = isTopLeftOverlay || isLeftOverlay ? Math.min(colspan, fixedColumnsLeft - renderedColumnIndex) : colspan;

          if (correctedColspan > 1) {
            TH.setAttribute('colspan', correctedColspan);
          }
        }

        var divEl = rootDocument.createElement('div');
        var spanEl = rootDocument.createElement('span');
        (0, _element.addClass)(divEl, 'relative');
        (0, _element.addClass)(spanEl, 'colHeader');
        (0, _element.fastInnerHTML)(spanEl, label);
        divEl.appendChild(spanEl);
        (0, _element.empty)(TH);
        TH.appendChild(divEl);

        _this4.hot.runHooks('afterGetColHeader', visualColumnsIndex, TH);
      };
    }
    /**
     * Allows to control which header DOM element will be used to highlight.
     *
     * @private
     * @param {number} visualColumn A visual column index of the highlighted row header.
     * @param {number} headerLevel A row header level that is currently highlighted.
     * @param {object} highlightMeta An object with meta data that describes the highlight state.
     * @returns {number}
     */

  }, {
    key: "onBeforeHighlightingColumnHeader",
    value: function onBeforeHighlightingColumnHeader(visualColumn, headerLevel, highlightMeta) {
      var headerNodeData = _classPrivateFieldGet(this, _stateManager).getHeaderTreeNodeData(headerLevel, visualColumn);

      if (!headerNodeData) {
        return visualColumn;
      }

      var classNames = highlightMeta.classNames,
          columnCursor = highlightMeta.columnCursor,
          selectionType = highlightMeta.selectionType,
          selectionWidth = highlightMeta.selectionWidth;

      var _classPrivateFieldGet3 = _classPrivateFieldGet(this, _stateManager).getHeaderSettings(headerLevel, visualColumn),
          isRoot = _classPrivateFieldGet3.isRoot,
          colspan = _classPrivateFieldGet3.colspan;

      if (selectionType === _selection.HEADER_TYPE) {
        if (!isRoot) {
          return headerNodeData.columnIndex;
        }
      } else if (selectionType === _selection.ACTIVE_HEADER_TYPE) {
        if (colspan > selectionWidth - columnCursor || !isRoot) {
          // Reset the class names array so the generated TH element won't be modified.
          classNames.length = 0;
        }
      }

      return visualColumn;
    }
    /**
     * Allows to block the column selection that is controlled by the core Selection module.
     *
     * @private
     * @param {MouseEvent} event Mouse event.
     * @param {CellCoords} coords Cell coords object containing the visual coordinates of the clicked cell.
     * @param {CellCoords} TD The table cell or header element.
     * @param {object} controller An object with properties `row`, `column` and `cell`. Each property contains
     *                            a boolean value that allows or disallows changing the selection for that particular area.
     */

  }, {
    key: "onBeforeOnCellMouseDown",
    value: function onBeforeOnCellMouseDown(event, coords, TD, controller) {
      var headerNodeData = this._getHeaderTreeNodeDataByCoords(coords);

      if (headerNodeData) {
        // Block the Selection module in controlling how the columns are selected. Pass the
        // responsibility of the column selection to this plugin (see "onAfterOnCellMouseDown" hook).
        controller.column = true;
      }
    }
    /**
     * Allows to control how the column selection based on the coordinates and the nested headers is made.
     *
     * @private
     * @param {MouseEvent} event Mouse event.
     * @param {CellCoords} coords Cell coords object containing the visual coordinates of the clicked cell.
     */

  }, {
    key: "onAfterOnCellMouseDown",
    value: function onAfterOnCellMouseDown(event, coords) {
      var headerNodeData = this._getHeaderTreeNodeDataByCoords(coords);

      if (!headerNodeData) {
        return;
      }

      var selection = this.hot.selection;
      var currentSelection = selection.isSelected() ? selection.getSelectedRange().current() : null;
      var columnsToSelect = [];
      var columnIndex = headerNodeData.columnIndex,
          origColspan = headerNodeData.origColspan; // The Selection module doesn't allow it to extend its behavior easily. That's why here we need
      // to re-implement the "click" and "shift" behavior. As a workaround, the logic for the nested
      // headers must implement a similar logic as in the original Selection handler
      // (see src/selection/mouseEventHandler.js).

      var allowRightClickSelection = !selection.inInSelection(coords);

      if (event.shiftKey && currentSelection) {
        if (coords.col < currentSelection.from.col) {
          columnsToSelect.push(currentSelection.getTopRightCorner().col, columnIndex, coords.row);
        } else if (coords.col > currentSelection.from.col) {
          columnsToSelect.push(currentSelection.getTopLeftCorner().col, columnIndex + origColspan - 1, coords.row);
        } else {
          columnsToSelect.push(columnIndex, columnIndex + origColspan - 1, coords.row);
        }
      } else if ((0, _event.isLeftClick)(event) || (0, _event.isRightClick)(event) && allowRightClickSelection) {
        columnsToSelect.push(columnIndex, columnIndex + origColspan - 1, coords.row);
      } // The plugin takes control of the how the columns are selected.


      selection.selectColumns.apply(selection, columnsToSelect);
    }
    /**
     * Makes the header-selection properly select the nested headers.
     *
     * @private
     * @param {MouseEvent} event Mouse event.
     * @param {CellCoords} coords Cell coords object containing the visual coordinates of the clicked cell.
     * @param {HTMLElement} TD The cell element.
     * @param {object} controller An object with properties `row`, `column` and `cell`. Each property contains
     *                            a boolean value that allows or disallows changing the selection for that particular area.
     */

  }, {
    key: "onBeforeOnCellMouseOver",
    value: function onBeforeOnCellMouseOver(event, coords, TD, controller) {
      var _this$hot;

      if (!this.hot.view.isMouseDown()) {
        return;
      }

      var headerNodeData = this._getHeaderTreeNodeDataByCoords(coords);

      if (!headerNodeData) {
        return;
      }

      var columnIndex = headerNodeData.columnIndex,
          origColspan = headerNodeData.origColspan;
      var selectedRange = this.hot.getSelectedRangeLast();
      var topLeftCoords = selectedRange.getTopLeftCorner();
      var bottomRightCoords = selectedRange.getBottomRightCorner();
      var from = selectedRange.from; // Block the Selection module in controlling how the columns and cells are selected.
      // From now on, the plugin is responsible for the selection.

      controller.column = true;
      controller.cell = true;
      var columnsToSelect = [];

      if (coords.col < from.col) {
        columnsToSelect.push(bottomRightCoords.col, columnIndex);
      } else if (coords.col > from.col) {
        columnsToSelect.push(topLeftCoords.col, columnIndex + origColspan - 1);
      } else {
        columnsToSelect.push(columnIndex, columnIndex + origColspan - 1);
      }

      (_this$hot = this.hot).selectColumns.apply(_this$hot, columnsToSelect);
    }
    /**
     * `afterGetColumnHeader` hook callback - prepares the header structure.
     *
     * @private
     * @param {Array} renderersArray Array of renderers.
     */

  }, {
    key: "onAfterGetColumnHeaderRenderers",
    value: function onAfterGetColumnHeaderRenderers(renderersArray) {
      if (renderersArray) {
        renderersArray.length = 0;

        for (var headerLayer = 0; headerLayer < _classPrivateFieldGet(this, _stateManager).getLayersCount(); headerLayer++) {
          renderersArray.push(this.headerRendererFactory(headerLayer));
        }
      }
    }
    /**
     * Make the renderer render the first nested column in its entirety.
     *
     * @private
     * @param {object} calc Viewport column calculator.
     */

  }, {
    key: "onAfterViewportColumnCalculatorOverride",
    value: function onAfterViewportColumnCalculatorOverride(calc) {
      var headerLayersCount = _classPrivateFieldGet(this, _stateManager).getLayersCount();

      var newStartColumn = calc.startColumn;
      var nonRenderable = !!headerLayersCount;

      for (var headerLayer = 0; headerLayer < headerLayersCount; headerLayer++) {
        var startColumn = _classPrivateFieldGet(this, _stateManager).findLeftMostColumnIndex(headerLayer, calc.startColumn);

        var renderedStartColumn = this.hot.columnIndexMapper.getRenderableFromVisualIndex(startColumn); // If any of the headers for that column index is rendered, all of them should be rendered properly, see
        // comment below.

        if (startColumn >= 0) {
          nonRenderable = false;
        } // `renderedStartColumn` can be `null` if the leftmost columns are hidden. In that case -> ignore that header
        // level, as it should be handled by the "parent" header


        if ((0, _number.isNumeric)(renderedStartColumn) && renderedStartColumn < calc.startColumn) {
          newStartColumn = renderedStartColumn;
          break;
        }
      } // If no headers for the provided column index are renderable, start rendering from the beginning of the upmost
      // header for that position.


      calc.startColumn = nonRenderable ? _classPrivateFieldGet(this, _stateManager).getHeaderTreeNodeData(0, newStartColumn).columnIndex : newStartColumn;
    }
    /**
     * `modifyColWidth` hook callback - returns width from cache, when is greater than incoming from hook.
     *
     * @private
     * @param {number} width Width from hook.
     * @param {number} column Visual index of an column.
     * @returns {number}
     */

  }, {
    key: "onModifyColWidth",
    value: function onModifyColWidth(width, column) {
      var cachedWidth = this.ghostTable.widthsCache[column];
      return width > cachedWidth ? width : cachedWidth;
    }
    /**
     * Updates the plugin state after HoT initialization.
     *
     * @private
     */

  }, {
    key: "onInit",
    value: function onInit() {
      // @TODO: Workaround for broken plugin initialization abstraction.
      this.updatePlugin();
    }
    /**
     * Updates the plugin state after new dataset load.
     *
     * @private
     * @param {Array[]} sourceData Array of arrays or array of objects containing data.
     * @param {boolean} initialLoad Flag that determines whether the data has been loaded
     *                              during the initialization.
     */

  }, {
    key: "onAfterLoadData",
    value: function onAfterLoadData(sourceData, initialLoad) {
      if (!initialLoad) {
        this.updatePlugin();
      }
    }
    /**
     * Destroys the plugin instance.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      _classPrivateFieldSet(this, _stateManager, null);

      if (_classPrivateFieldGet(this, _hidingIndexMapObserver) !== null) {
        _classPrivateFieldGet(this, _hidingIndexMapObserver).unsubscribe();

        _classPrivateFieldSet(this, _hidingIndexMapObserver, null);
      }

      _get(_getPrototypeOf(NestedHeaders.prototype), "destroy", this).call(this);
    }
    /**
     * Gets the tree data that belongs to the column headers pointed by the passed coordinates.
     *
     * @private
     * @param {CellCoords} coords The CellCoords instance.
     * @returns {object|undefined}
     */

  }, {
    key: "_getHeaderTreeNodeDataByCoords",
    value: function _getHeaderTreeNodeDataByCoords(coords) {
      if (coords.row >= 0 || coords.col < 0) {
        return;
      }

      return _classPrivateFieldGet(this, _stateManager).getHeaderTreeNodeData(coords.row, coords.col);
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
     * The state manager for the nested headers.
     *
     * @private
     * @type {StateManager}
     */

  }]);

  return NestedHeaders;
}(_base.BasePlugin);

exports.NestedHeaders = NestedHeaders;