"use strict";

exports.__esModule = true;
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.error.cause.js");
var _base = require("../base");
var _element = require("../../helpers/dom/element");
var _number = require("../../helpers/number");
var _array = require("../../helpers/array");
var _object = require("../../helpers/object");
var _mixed = require("../../helpers/mixed");
var _predefinedItems = require("../contextMenu/predefinedItems");
var _pluginHooks = _interopRequireDefault(require("../../pluginHooks"));
var _hideColumn = _interopRequireDefault(require("./contextMenuItem/hideColumn"));
var _showColumn = _interopRequireDefault(require("./contextMenuItem/showColumn"));
var _translations = require("../../translations");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
_pluginHooks.default.getSingleton().register('beforeHideColumns');
_pluginHooks.default.getSingleton().register('afterHideColumns');
_pluginHooks.default.getSingleton().register('beforeUnhideColumns');
_pluginHooks.default.getSingleton().register('afterUnhideColumns');
const PLUGIN_KEY = 'hiddenColumns';
exports.PLUGIN_KEY = PLUGIN_KEY;
const PLUGIN_PRIORITY = 310;

/* eslint-disable jsdoc/require-description-complete-sentence */

/**
 * @plugin HiddenColumns
 * @class HiddenColumns
 *
 * @description
 * The `HiddenColumns` plugin lets you [hide specified columns](@/guides/columns/column-hiding.md).
 *
 * "Hiding a column" means that the hidden column doesn't get rendered as a DOM element.
 *
 * The `HiddenColumns` plugin doesn't modify the source data,
 * and doesn't participate in data transformation
 * (the shape of the data returned by the [`getData*()` methods](@/api/core.md#getdata) stays intact).
 *
 * You can set the following configuration options:
 *
 * | Option | Required | Type | Default | Description |
 * |---|---|---|---|---|
 * | `columns` | No | Array | - | [Hides specified columns by default](@/guides/columns/column-hiding.md#step-1-specify-columns-hidden-by-default) |
 * | `indicators` | No | Boolean | `false` | [Shows UI indicators](@/guides/columns/column-hiding.md#step-2-show-ui-indicators) |
 * | `copyPasteEnabled` | No | Boolean | `true` | [Sets up copy/paste behavior](@/guides/columns/column-hiding.md#step-4-set-up-copy-and-paste-behavior) |
 *
 * @example
 *
 * ::: only-for javascript
 * ```js
 * const container = document.getElementById('example');
 * const hot = new Handsontable(container, {
 *   data: getData(),
 *   hiddenColumns: {
 *     copyPasteEnabled: true,
 *     indicators: true,
 *     columns: [1, 2, 5]
 *   }
 * });
 *
 * // access the `HiddenColumns` plugin's instance
 * const hiddenColumnsPlugin = hot.getPlugin('hiddenColumns');
 *
 * // hide a single column
 * hiddenColumnsPlugin.hideColumn(1);
 *
 * // hide multiple columns
 * hiddenColumnsPlugin.hideColumn(1, 2, 9);
 *
 * // hide multiple columns as an array
 * hiddenColumnsPlugin.hideColumns([1, 2, 9]);
 *
 * // unhide a single column
 * hiddenColumnsPlugin.showColumn(1);
 *
 * // unhide multiple columns
 * hiddenColumnsPlugin.showColumn(1, 2, 9);
 *
 * // unhide multiple columns as an array
 * hiddenColumnsPlugin.showColumns([1, 2, 9]);
 *
 * // to see your changes, re-render your Handsontable instance
 * hot.render();
 * ```
 * :::
 *
 * ::: only-for react
 * ```jsx
 * const hotRef = useRef(null);
 *
 * ...
 *
 * <HotTable
 *   ref={hotRef}
 *   data={getData()}
 *   hiddenColumns={{
 *     copyPasteEnabled: true,
 *     indicators: true,
 *     columns: [1, 2, 5]
 *   }}
 * />
 *
 * // access the `HiddenColumns` plugin's instance
 * const hot = hotRef.current.hotInstance;
 * const hiddenColumnsPlugin = hot.getPlugin('hiddenColumns');
 *
 * // hide a single column
 * hiddenColumnsPlugin.hideColumn(1);
 *
 * // hide multiple columns
 * hiddenColumnsPlugin.hideColumn(1, 2, 9);
 *
 * // hide multiple columns as an array
 * hiddenColumnsPlugin.hideColumns([1, 2, 9]);
 *
 * // unhide a single column
 * hiddenColumnsPlugin.showColumn(1);
 *
 * // unhide multiple columns
 * hiddenColumnsPlugin.showColumn(1, 2, 9);
 *
 * // unhide multiple columns as an array
 * hiddenColumnsPlugin.showColumns([1, 2, 9]);
 *
 * // to see your changes, re-render your Handsontable instance
 * hot.render();
 * ```
 * :::
 */
exports.PLUGIN_PRIORITY = PLUGIN_PRIORITY;
var _settings = /*#__PURE__*/new WeakMap();
var _hiddenColumnsMap = /*#__PURE__*/new WeakMap();
class HiddenColumns extends _base.BasePlugin {
  constructor() {
    super(...arguments);
    /**
     * Cached plugin settings.
     *
     * @private
     * @type {object}
     */
    _classPrivateFieldInitSpec(this, _settings, {
      writable: true,
      value: {}
    });
    /**
     * Map of hidden columns by the plugin.
     *
     * @private
     * @type {null|HidingMap}
     */
    _classPrivateFieldInitSpec(this, _hiddenColumnsMap, {
      writable: true,
      value: null
    });
  }
  static get PLUGIN_KEY() {
    return PLUGIN_KEY;
  }
  static get PLUGIN_PRIORITY() {
    return PLUGIN_PRIORITY;
  }
  /**
   * Checks if the plugin is enabled in the handsontable settings. This method is executed in {@link Hooks#beforeInit}
   * hook and if it returns `true` then the {@link HiddenColumns#enablePlugin} method is called.
   *
   * @returns {boolean}
   */
  isEnabled() {
    return !!this.hot.getSettings()[PLUGIN_KEY];
  }

  /**
   * Enables the plugin functionality for this Handsontable instance.
   */
  enablePlugin() {
    var _this = this;
    if (this.enabled) {
      return;
    }
    const pluginSettings = this.hot.getSettings()[PLUGIN_KEY];
    if ((0, _object.isObject)(pluginSettings)) {
      _classPrivateFieldSet(this, _settings, pluginSettings);
      if ((0, _mixed.isUndefined)(pluginSettings.copyPasteEnabled)) {
        pluginSettings.copyPasteEnabled = true;
      }
    }
    _classPrivateFieldSet(this, _hiddenColumnsMap, new _translations.HidingMap());
    _classPrivateFieldGet(this, _hiddenColumnsMap).addLocalHook('init', () => this.onMapInit());
    this.hot.columnIndexMapper.registerMap(this.pluginName, _classPrivateFieldGet(this, _hiddenColumnsMap));
    this.addHook('afterContextMenuDefaultOptions', function () {
      return _this.onAfterContextMenuDefaultOptions(...arguments);
    });
    this.addHook('afterGetCellMeta', (row, col, cellProperties) => this.onAfterGetCellMeta(row, col, cellProperties));
    this.addHook('modifyColWidth', (width, col) => this.onModifyColWidth(width, col));
    this.addHook('afterGetColHeader', function () {
      return _this.onAfterGetColHeader(...arguments);
    });
    this.addHook('modifyCopyableRange', ranges => this.onModifyCopyableRange(ranges));
    super.enablePlugin();
  }

  /**
   * Updates the plugin's state.
   *
   * This method is executed when [`updateSettings()`](@/api/core.md#updatesettings) is invoked with any of the following configuration options:
   *  - [`hiddenColumns`](@/api/options.md#hiddencolumns)
   */
  updatePlugin() {
    this.disablePlugin();
    this.enablePlugin();
    super.updatePlugin();
  }

  /**
   * Disables the plugin functionality for this Handsontable instance.
   */
  disablePlugin() {
    this.hot.columnIndexMapper.unregisterMap(this.pluginName);
    _classPrivateFieldSet(this, _settings, {});
    super.disablePlugin();
    this.resetCellsMeta();
  }

  /**
   * Shows the provided columns.
   *
   * @param {number[]} columns Array of visual column indexes.
   */
  showColumns(columns) {
    const currentHideConfig = this.getHiddenColumns();
    const isValidConfig = this.isValidConfig(columns);
    let destinationHideConfig = currentHideConfig;
    const hidingMapValues = _classPrivateFieldGet(this, _hiddenColumnsMap).getValues().slice();
    const isAnyColumnShowed = columns.length > 0;
    if (isValidConfig && isAnyColumnShowed) {
      const physicalColumns = columns.map(visualColumn => this.hot.toPhysicalColumn(visualColumn));

      // Preparing new values for hiding map.
      (0, _array.arrayEach)(physicalColumns, physicalColumn => {
        hidingMapValues[physicalColumn] = false;
      });

      // Preparing new hiding config.
      destinationHideConfig = (0, _array.arrayReduce)(hidingMapValues, (hiddenIndexes, isHidden, physicalIndex) => {
        if (isHidden) {
          hiddenIndexes.push(this.hot.toVisualColumn(physicalIndex));
        }
        return hiddenIndexes;
      }, []);
    }
    const continueHiding = this.hot.runHooks('beforeUnhideColumns', currentHideConfig, destinationHideConfig, isValidConfig && isAnyColumnShowed);
    if (continueHiding === false) {
      return;
    }
    if (isValidConfig && isAnyColumnShowed) {
      _classPrivateFieldGet(this, _hiddenColumnsMap).setValues(hidingMapValues);
    }

    // @TODO Should call once per render cycle, currently fired separately in different plugins
    this.hot.view.adjustElementsSize();
    this.hot.runHooks('afterUnhideColumns', currentHideConfig, destinationHideConfig, isValidConfig && isAnyColumnShowed, isValidConfig && destinationHideConfig.length < currentHideConfig.length);
  }

  /**
   * Shows a single column.
   *
   * @param {...number} column Visual column index.
   */
  showColumn() {
    for (var _len = arguments.length, column = new Array(_len), _key = 0; _key < _len; _key++) {
      column[_key] = arguments[_key];
    }
    this.showColumns(column);
  }

  /**
   * Hides the columns provided in the array.
   *
   * @param {number[]} columns Array of visual column indexes.
   */
  hideColumns(columns) {
    const currentHideConfig = this.getHiddenColumns();
    const isConfigValid = this.isValidConfig(columns);
    let destinationHideConfig = currentHideConfig;
    if (isConfigValid) {
      destinationHideConfig = Array.from(new Set(currentHideConfig.concat(columns)));
    }
    const continueHiding = this.hot.runHooks('beforeHideColumns', currentHideConfig, destinationHideConfig, isConfigValid);
    if (continueHiding === false) {
      return;
    }
    if (isConfigValid) {
      this.hot.batchExecution(() => {
        (0, _array.arrayEach)(columns, visualColumn => {
          _classPrivateFieldGet(this, _hiddenColumnsMap).setValueAtIndex(this.hot.toPhysicalColumn(visualColumn), true);
        });
      }, true);
    }
    this.hot.runHooks('afterHideColumns', currentHideConfig, destinationHideConfig, isConfigValid, isConfigValid && destinationHideConfig.length > currentHideConfig.length);
  }

  /**
   * Hides a single column.
   *
   * @param {...number} column Visual column index.
   */
  hideColumn() {
    for (var _len2 = arguments.length, column = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      column[_key2] = arguments[_key2];
    }
    this.hideColumns(column);
  }

  /**
   * Returns an array of visual indexes of hidden columns.
   *
   * @returns {number[]}
   */
  getHiddenColumns() {
    return (0, _array.arrayMap)(_classPrivateFieldGet(this, _hiddenColumnsMap).getHiddenIndexes(), physicalColumnIndex => {
      return this.hot.toVisualColumn(physicalColumnIndex);
    });
  }

  /**
   * Checks if the provided column is hidden.
   *
   * @param {number} column Visual column index.
   * @returns {boolean}
   */
  isHidden(column) {
    return _classPrivateFieldGet(this, _hiddenColumnsMap).getValueAtIndex(this.hot.toPhysicalColumn(column)) || false;
  }

  /**
   * Get if trim config is valid. Check whether all of the provided column indexes are within the bounds of the table.
   *
   * @param {Array} hiddenColumns List of hidden column indexes.
   * @returns {boolean}
   */
  isValidConfig(hiddenColumns) {
    const nrOfColumns = this.hot.countCols();
    if (Array.isArray(hiddenColumns) && hiddenColumns.length > 0) {
      return hiddenColumns.every(visualColumn => Number.isInteger(visualColumn) && visualColumn >= 0 && visualColumn < nrOfColumns);
    }
    return false;
  }

  /**
   * Reset all rendered cells meta.
   *
   * @private
   */
  resetCellsMeta() {
    (0, _array.arrayEach)(this.hot.getCellsMeta(), meta => {
      if (meta) {
        meta.skipColumnOnPaste = false;
      }
    });
  }

  /**
   * Adds the additional column width for the hidden column indicators.
   *
   * @private
   * @param {number|undefined} width Column width.
   * @param {number} column Visual column index.
   * @returns {number}
   */
  onModifyColWidth(width, column) {
    // Hook is triggered internally only for the visible columns. Conditional will be handled for the API
    // calls of the `getColWidth` function on not visible indexes.
    if (this.isHidden(column)) {
      return 0;
    }
    if (_classPrivateFieldGet(this, _settings).indicators && (this.isHidden(column + 1) || this.isHidden(column - 1))) {
      // Add additional space for hidden column indicator.
      if (typeof width === 'number' && this.hot.hasColHeaders()) {
        return width + 15;
      }
    }
  }

  /**
   * Sets the copy-related cell meta.
   *
   * @private
   * @param {number} row Visual row index.
   * @param {number} column Visual column index.
   * @param {object} cellProperties Object containing the cell properties.
   */
  onAfterGetCellMeta(row, column, cellProperties) {
    if (_classPrivateFieldGet(this, _settings).copyPasteEnabled === false && this.isHidden(column)) {
      // Cell property handled by the `Autofill` and the `CopyPaste` plugins.
      cellProperties.skipColumnOnPaste = true;
    }
    if (this.isHidden(column - 1)) {
      cellProperties.className = cellProperties.className || '';
      if (cellProperties.className.indexOf('afterHiddenColumn') === -1) {
        cellProperties.className += ' afterHiddenColumn';
      }
    } else if (cellProperties.className) {
      const classArr = cellProperties.className.split(' ');
      if (classArr.length > 0) {
        const containAfterHiddenColumn = classArr.indexOf('afterHiddenColumn');
        if (containAfterHiddenColumn > -1) {
          classArr.splice(containAfterHiddenColumn, 1);
        }
        cellProperties.className = classArr.join(' ');
      }
    }
  }

  /**
   * Modifies the copyable range, accordingly to the provided config.
   *
   * @private
   * @param {Array} ranges An array of objects defining copyable cells.
   * @returns {Array}
   */
  onModifyCopyableRange(ranges) {
    // Ranges shouldn't be modified when `copyPasteEnabled` option is set to `true` (by default).
    if (_classPrivateFieldGet(this, _settings).copyPasteEnabled) {
      return ranges;
    }
    const newRanges = [];
    const pushRange = (startRow, endRow, startCol, endCol) => {
      newRanges.push({
        startRow,
        endRow,
        startCol,
        endCol
      });
    };
    (0, _array.arrayEach)(ranges, range => {
      let isHidden = true;
      let rangeStart = 0;
      (0, _number.rangeEach)(range.startCol, range.endCol, visualColumn => {
        if (this.isHidden(visualColumn)) {
          if (!isHidden) {
            pushRange(range.startRow, range.endRow, rangeStart, visualColumn - 1);
          }
          isHidden = true;
        } else {
          if (isHidden) {
            rangeStart = visualColumn;
          }
          if (visualColumn === range.endCol) {
            pushRange(range.startRow, range.endRow, rangeStart, visualColumn);
          }
          isHidden = false;
        }
      });
    });
    return newRanges;
  }

  /**
   * Adds the needed classes to the headers.
   *
   * @private
   * @param {number} column Visual column index.
   * @param {HTMLElement} TH Header's TH element.
   */
  onAfterGetColHeader(column, TH) {
    if (!_classPrivateFieldGet(this, _settings).indicators || column < 0) {
      return;
    }
    const classList = [];
    if (column >= 1 && this.isHidden(column - 1)) {
      classList.push('afterHiddenColumn');
    }
    if (column < this.hot.countCols() - 1 && this.isHidden(column + 1)) {
      classList.push('beforeHiddenColumn');
    }
    (0, _element.addClass)(TH, classList);
  }

  /**
   * Add Show-hide columns to context menu.
   *
   * @private
   * @param {object} options An array of objects containing information about the pre-defined Context Menu items.
   */
  onAfterContextMenuDefaultOptions(options) {
    options.items.push({
      name: _predefinedItems.SEPARATOR
    }, (0, _hideColumn.default)(this), (0, _showColumn.default)(this));
  }

  /**
   * On map initialized hook callback.
   *
   * @private
   */
  onMapInit() {
    if (Array.isArray(_classPrivateFieldGet(this, _settings).columns)) {
      this.hideColumns(_classPrivateFieldGet(this, _settings).columns);
    }
  }

  /**
   * Destroys the plugin instance.
   */
  destroy() {
    _classPrivateFieldSet(this, _settings, null);
    _classPrivateFieldSet(this, _hiddenColumnsMap, null);
    super.destroy();
  }
}
exports.HiddenColumns = HiddenColumns;