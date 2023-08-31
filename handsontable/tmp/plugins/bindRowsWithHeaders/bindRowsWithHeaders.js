"use strict";

exports.__esModule = true;
var _base = require("../base");
var _looseBindsMap = _interopRequireDefault(require("./maps/looseBindsMap"));
var _strictBindsMap = _interopRequireDefault(require("./maps/strictBindsMap"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const PLUGIN_KEY = 'bindRowsWithHeaders';
exports.PLUGIN_KEY = PLUGIN_KEY;
const PLUGIN_PRIORITY = 210;
exports.PLUGIN_PRIORITY = PLUGIN_PRIORITY;
const DEFAULT_BIND = 'loose';
const bindTypeToMapStrategy = new Map([['loose', _looseBindsMap.default], ['strict', _strictBindsMap.default]]);

/**
 * @plugin BindRowsWithHeaders
 * @class BindRowsWithHeaders
 *
 * @description
 * Plugin allows binding the table rows with their headers.
 *
 * If the plugin is enabled, the table row headers will "stick" to the rows, when they are hidden/moved. Basically, if
 * at the initialization row 0 has a header titled "A", it will have it no matter what you do with the table.
 *
 * @example
 * ::: only-for javascript
 * ```js
 * const container = document.getElementById('example');
 * const hot = new Handsontable(container, {
 *   data: getData(),
 *   // enable plugin
 *   bindRowsWithHeaders: true
 * });
 * ```
 * :::
 *
 * ::: only-for react
 * ```jsx
 * <HotTable
 *   data={getData()}
 *   // enable plugin
 *   bindRowsWithHeaders={true}
 * />
 * ```
 * :::
 */
class BindRowsWithHeaders extends _base.BasePlugin {
  static get PLUGIN_KEY() {
    return PLUGIN_KEY;
  }
  static get PLUGIN_PRIORITY() {
    return PLUGIN_PRIORITY;
  }
  constructor(hotInstance) {
    super(hotInstance);
    /**
     * Plugin indexes cache.
     *
     * @private
     * @type {null|IndexMap}
     */
    this.headerIndexes = null;
  }

  /**
   * Checks if the plugin is enabled in the handsontable settings. This method is executed in {@link Hooks#beforeInit}
   * hook and if it returns `true` then the {@link BindRowsWithHeaders#enablePlugin} method is called.
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
    if (this.enabled) {
      return;
    }
    let bindType = this.hot.getSettings()[PLUGIN_KEY];
    if (typeof bindType !== 'string') {
      bindType = DEFAULT_BIND;
    }
    const MapStrategy = bindTypeToMapStrategy.get(bindType);
    this.headerIndexes = this.hot.rowIndexMapper.registerMap('bindRowsWithHeaders', new MapStrategy());
    this.addHook('modifyRowHeader', row => this.onModifyRowHeader(row));
    super.enablePlugin();
  }

  /**
   * Disables the plugin functionality for this Handsontable instance.
   */
  disablePlugin() {
    this.hot.rowIndexMapper.unregisterMap('bindRowsWithHeaders');
    super.disablePlugin();
  }

  /**
   * On modify row header listener.
   *
   * @private
   * @param {number} row Row index.
   * @returns {number}
   */
  onModifyRowHeader(row) {
    return this.headerIndexes.getValueAtIndex(this.hot.toPhysicalRow(row));
  }

  /**
   * Destroys the plugin instance.
   */
  destroy() {
    super.destroy();
  }
}
exports.BindRowsWithHeaders = BindRowsWithHeaders;