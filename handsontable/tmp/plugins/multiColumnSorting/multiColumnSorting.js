"use strict";

exports.__esModule = true;
var _columnSorting = require("../columnSorting");
var _sortService = require("../columnSorting/sortService");
var _utils = require("../columnSorting/utils");
var _element = require("../../helpers/dom/element");
var _rootComparator = require("./rootComparator");
var _utils2 = require("./utils");
var _domHelpers = require("./domHelpers");
const PLUGIN_KEY = 'multiColumnSorting';
exports.PLUGIN_KEY = PLUGIN_KEY;
const PLUGIN_PRIORITY = 170;
exports.PLUGIN_PRIORITY = PLUGIN_PRIORITY;
const APPEND_COLUMN_CONFIG_STRATEGY = 'append';
const CONFLICTED_PLUGIN_KEY = 'columnSorting';
(0, _sortService.registerRootComparator)(PLUGIN_KEY, _rootComparator.rootComparator);

/**
 * @plugin MultiColumnSorting
 * @class MultiColumnSorting
 *
 * @description
 * This plugin sorts the view by columns (but does not sort the data source!). To enable the plugin, set the
 * {@link Options#multiColumnSorting} property to the correct value (see the examples below).
 *
 * @example
 * ```js
 * // as boolean
 * multiColumnSorting: true
 *
 * // as an object with initial sort config (sort ascending for column at index 1 and then sort descending for column at index 0)
 * multiColumnSorting: {
 *   initialConfig: [{
 *     column: 1,
 *     sortOrder: 'asc'
 *   }, {
 *     column: 0,
 *     sortOrder: 'desc'
 *   }]
 * }
 *
 * // as an object which define specific sorting options for all columns
 * multiColumnSorting: {
 *   sortEmptyCells: true, // true = the table sorts empty cells, false = the table moves all empty cells to the end of the table (by default)
 *   indicator: true, // true = shows indicator for all columns (by default), false = don't show indicator for columns
 *   headerAction: true, // true = allow to click on the headers to sort (by default), false = turn off possibility to click on the headers to sort
 *   compareFunctionFactory: function(sortOrder, columnMeta) {
 *     return function(value, nextValue) {
 *       // Some value comparisons which will return -1, 0 or 1...
 *     }
 *   }
 * }
 *
 * // as an object passed to the `column` property, allows specifying a custom options for the desired column.
 * // please take a look at documentation of `column` property: {@link Options#columns}
 * columns: [{
 *   multiColumnSorting: {
 *     indicator: false, // disable indicator for the first column,
 *     sortEmptyCells: true,
 *     headerAction: false, // clicks on the first column won't sort
 *     compareFunctionFactory: function(sortOrder, columnMeta) {
 *       return function(value, nextValue) {
 *         return 0; // Custom compare function for the first column (don't sort)
 *       }
 *     }
 *   }
 * }]
 * ```
 */
class MultiColumnSorting extends _columnSorting.ColumnSorting {
  static get PLUGIN_KEY() {
    return PLUGIN_KEY;
  }
  static get PLUGIN_PRIORITY() {
    return PLUGIN_PRIORITY;
  }
  constructor(hotInstance) {
    super(hotInstance);
    /**
     * Main settings key designed for the plugin.
     *
     * @private
     * @type {string}
     */
    this.pluginKey = PLUGIN_KEY;
  }

  /**
   * Checks if the plugin is enabled in the Handsontable settings. This method is executed in {@link Hooks#beforeInit}
   * hook and if it returns `true` then the {@link MultiColumnSorting#enablePlugin} method is called.
   *
   * @returns {boolean}
   */
  isEnabled() {
    return super.isEnabled();
  }

  /**
   * Enables the plugin functionality for this Handsontable instance.
   */
  enablePlugin() {
    if (!this.enabled && this.hot.getSettings()[this.pluginKey] && this.hot.getSettings()[CONFLICTED_PLUGIN_KEY]) {
      (0, _utils2.warnAboutPluginsConflict)();
    }
    super.enablePlugin();
  }

  /**
   * Disables the plugin functionality for this Handsontable instance.
   */
  disablePlugin() {
    super.disablePlugin();
  }

  /**
   * Sorts the table by chosen columns and orders.
   *
   * @param {undefined|object|Array} sortConfig Single column sort configuration or full sort configuration (for all sorted columns).
   * The configuration object contains `column` and `sortOrder` properties. First of them contains visual column index, the second one contains
   * sort order (`asc` for ascending, `desc` for descending).
   *
   * **Note**: Please keep in mind that every call of `sort` function set an entirely new sort order. Previous sort configs aren't preserved.
   *
   * @example
   * ```js
   * // sort ascending first visual column
   * hot.getPlugin('multiColumnSorting').sort({ column: 0, sortOrder: 'asc' });
   *
   * // sort first two visual column in the defined sequence
   * hot.getPlugin('multiColumnSorting').sort([{
   *   column: 1, sortOrder: 'asc'
   * }, {
   *   column: 0, sortOrder: 'desc'
   * }]);
   * ```
   *
   * @fires Hooks#beforeColumnSort
   * @fires Hooks#afterColumnSort
   */
  sort(sortConfig) {
    super.sort(sortConfig);
  }

  /**
   * Clear the sort performed on the table.
   */
  clearSort() {
    super.clearSort();
  }

  /**
   * Checks if the table is sorted (any column have to be sorted).
   *
   * @returns {boolean}
   */
  isSorted() {
    return super.isSorted();
  }

  /**
   * Get sort configuration for particular column or for all sorted columns. Objects contain `column` and `sortOrder` properties.
   *
   * **Note**: Please keep in mind that returned objects expose **visual** column index under the `column` key. They are handled by the `sort` function.
   *
   * @param {number} [column] Visual column index.
   * @returns {undefined|object|Array}
   */
  getSortConfig(column) {
    return super.getSortConfig(column);
  }

  /**
   * @description
   * Warn: Useful mainly for providing server side sort implementation (see in the example below). It doesn't sort the data set. It just sets sort configuration for all sorted columns.
   * Note: Please keep in mind that this method doesn't re-render the table.
   *
   * @example
   * ```js
   * beforeColumnSort: function(currentSortConfig, destinationSortConfigs) {
   *   const columnSortPlugin = this.getPlugin('multiColumnSorting');
   *
   *   columnSortPlugin.setSortConfig(destinationSortConfigs);
   *
   *   // const newData = ... // Calculated data set, ie. from an AJAX call.
   *
   *   this.loadData(newData); // Load new data set and re-render the table.
   *
   *   return false; // The blockade for the default sort action.
   * }
   * ```
   *
   * @param {undefined|object|Array} sortConfig Single column sort configuration or full sort configuration (for all sorted columns).
   * The configuration object contains `column` and `sortOrder` properties. First of them contains visual column index, the second one contains
   * sort order (`asc` for ascending, `desc` for descending).
   */
  setSortConfig(sortConfig) {
    super.setSortConfig(sortConfig);
  }

  /**
   * Get normalized sort configs.
   *
   * @private
   * @param {object|Array} [sortConfig=[]] Single column sort configuration or full sort configuration (for all sorted columns).
   * The configuration object contains `column` and `sortOrder` properties. First of them contains visual column index, the second one contains
   * sort order (`asc` for ascending, `desc` for descending).
   * @returns {Array}
   */
  getNormalizedSortConfigs() {
    let sortConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    if (Array.isArray(sortConfig)) {
      return sortConfig;
    }
    return [sortConfig];
  }

  /**
   * Update header classes.
   *
   * @private
   * @param {HTMLElement} headerSpanElement Header span element.
   * @param {...*} args Extra arguments for helpers.
   */
  updateHeaderClasses(headerSpanElement) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    super.updateHeaderClasses(headerSpanElement, ...args);
    (0, _element.removeClass)(headerSpanElement, (0, _domHelpers.getClassesToRemove)(headerSpanElement));
    if (this.enabled !== false) {
      (0, _element.addClass)(headerSpanElement, (0, _domHelpers.getClassesToAdd)(...args));
    }
  }

  /**
   * Overwriting base plugin's `onUpdateSettings` method. Please keep in mind that `onAfterUpdateSettings` isn't called
   * for `updateSettings` in specific situations.
   *
   * @private
   * @param {object} newSettings New settings object.
   */
  onUpdateSettings(newSettings) {
    if (this.hot.getSettings()[this.pluginKey] && this.hot.getSettings()[CONFLICTED_PLUGIN_KEY]) {
      (0, _utils2.warnAboutPluginsConflict)();
    }
    super.onUpdateSettings(newSettings);
  }

  /**
   * Callback for the `onAfterOnCellMouseDown` hook.
   *
   * @private
   * @param {Event} event Event which are provided by hook.
   * @param {CellCoords} coords Visual coords of the selected cell.
   */
  onAfterOnCellMouseDown(event, coords) {
    if ((0, _utils.wasHeaderClickedProperly)(coords.row, coords.col, event) === false) {
      return;
    }
    if (this.wasClickableHeaderClicked(event, coords.col)) {
      if (this.hot.getShortcutManager().isCtrlPressed()) {
        this.hot.deselectCell();
        this.hot.selectColumns(coords.col);
        this.sort(this.getNextSortConfig(coords.col, APPEND_COLUMN_CONFIG_STRATEGY));
      } else {
        this.sort(this.getColumnNextConfig(coords.col));
      }
    }
  }
}
exports.MultiColumnSorting = MultiColumnSorting;