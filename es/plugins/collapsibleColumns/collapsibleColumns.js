import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.index-of";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.splice";
import "core-js/modules/es.map";
import "core-js/modules/es.object.get-own-property-descriptor";
import "core-js/modules/es.object.get-prototype-of";
import "core-js/modules/es.object.set-prototype-of";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.reflect.get";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.set";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

import { objectEach, deepClone } from '../../helpers/object';
import { arrayEach } from '../../helpers/array';
import { rangeEach } from '../../helpers/number';
import { warn } from '../../helpers/console';
import { addClass, hasClass, fastInnerText } from '../../helpers/dom/element';
import EventManager from '../../eventManager';
import { registerPlugin } from '../../plugins';
import { stopImmediatePropagation } from '../../helpers/dom/event';
import BasePlugin from '../_base';
/**
 * @plugin CollapsibleColumns
 * @dependencies NestedHeaders HiddenColumns
 *
 * @description
 * The {@link CollapsibleColumns} plugin allows collapsing of columns, covered by a header with the `colspan` property defined.
 *
 * Clicking the "collapse/expand" button collapses (or expands) all "child" headers except the first one.
 *
 * Setting the {@link Options#collapsibleColumns} property to `true` will display a "collapse/expand" button in every header
 * with a defined `colspan` property.
 *
 * To limit this functionality to a smaller group of headers, define the `collapsibleColumns` property as an array
 * of objects, as in the example below.
 *
 * @example
 * ```js
 * const container = document.getElementById('example');
 * const hot = new Handsontable(container, {
 *   data: generateDataObj(),
 *   colHeaders: true,
 *   rowHeaders: true,
 *   // enable plugin
 *   collapsibleColumns: true,
 * });
 *
 * // or
 * const hot = new Handsontable(container, {
 *   data: generateDataObj(),
 *   colHeaders: true,
 *   rowHeaders: true,
 *   // enable and configure which columns can be collapsed
 *   collapsibleColumns: [
 *     {row: -4, col: 1, collapsible: true},
 *     {row: -3, col: 5, collapsible: true}
 *   ],
 * });
 * ```
 */

var CollapsibleColumns =
/*#__PURE__*/
function (_BasePlugin) {
  _inherits(CollapsibleColumns, _BasePlugin);

  function CollapsibleColumns(hotInstance) {
    var _this;

    _classCallCheck(this, CollapsibleColumns);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CollapsibleColumns).call(this, hotInstance));
    /**
     * Cached plugin settings.
     *
     * @private
     * @type {Boolean|Array}
     */

    _this.settings = null;
    /**
     * Map listing headers with buttons enabled.
     *
     * @private
      * @type {Map<number, Set<number>>}
     */

    _this.buttonEnabledList = new Map();
    /**
     * Cached reference to the HiddenColumns plugin.
     *
     * @private
     * @type {Object}
     */

    _this.hiddenColumnsPlugin = null;
    /**
     * Cached reference to the NestedHeaders plugin.
     *
     * @private
     * @type {Object}
     */

    _this.nestedHeadersPlugin = null;
    /**
     * Map listing the currently collapsed sections.
     *
     * @private
      * @type {Map<number, any[]>}
     */

    _this.collapsedSections = new Map();
    /**
     * Number of column header levels.
     *
     * @private
     * @type {Number}
     */

    _this.columnHeaderLevelCount = null;
    /**
     * Event manager instance reference.
     *
     * @private
     * @type {EventManager}
     */

    _this.eventManager = null;
    /**
     * List of currently collapsed columns.
     *
     * @private
     * @type {Number[]}
     */

    _this.collapsedColumns = [];
    /**
     * List of collapsable coords.
     *
     * @private
     * @type {Map<number, Set<number>>}
     */

    _this.collapsableCoordsList = new Map();
    return _this;
  }
  /**
   * Checks if the plugin is enabled in the handsontable settings. This method is executed in {@link Hooks#beforeInit}
   * hook and if it returns `true` than the {@link CollapsibleColumns#enablePlugin} method is called.
   *
   * @returns {Boolean}
   */


  _createClass(CollapsibleColumns, [{
    key: "isEnabled",
    value: function isEnabled() {
      return !!this.hot.getSettings().collapsibleColumns;
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

      this.settings = this.hot.getSettings().collapsibleColumns;

      if (typeof this.settings !== 'boolean') {
        this.parseSettings();
      }

      this.hiddenColumnsPlugin = this.hot.getPlugin('hiddenColumns');
      this.nestedHeadersPlugin = this.hot.getPlugin('nestedHeaders');
      this.checkDependencies();
      this.addHook('afterRender', function () {
        return _this2.onAfterRender();
      });
      this.addHook('afterInit', function () {
        return _this2.onAfterInit();
      });
      this.addHook('afterGetColHeader', function (col, TH) {
        return _this2.onAfterGetColHeader(col, TH);
      });
      this.addHook('beforeOnCellMouseDown', function (event, coords, TD) {
        return _this2.onBeforeOnCellMouseDown(event, coords, TD);
      });
      this.eventManager = new EventManager(this.hot);

      _get(_getPrototypeOf(CollapsibleColumns.prototype), "enablePlugin", this).call(this);
    }
    /**
     * Disables the plugin functionality for this Handsontable instance.
     */

  }, {
    key: "disablePlugin",
    value: function disablePlugin() {
      this.settings = null;
      this.buttonEnabledList.clear();
      this.hiddenColumnsPlugin = null;
      this.collapsedSections.clear();
      this.clearButtons();

      _get(_getPrototypeOf(CollapsibleColumns.prototype), "disablePlugin", this).call(this);
    }
    /**
     * Clears the expand/collapse buttons.
     *
     * @private
     */

  }, {
    key: "clearButtons",
    value: function clearButtons() {
      if (!this.hot.view) {
        return;
      }

      var headerLevels = this.hot.view.wt.getSetting('columnHeaders').length;
      var mainHeaders = this.hot.view.wt.wtTable.THEAD;
      var topHeaders = this.hot.view.wt.wtOverlays.topOverlay.clone.wtTable.THEAD;
      var topLeftCornerHeaders = this.hot.view.wt.wtOverlays.topLeftCornerOverlay ? this.hot.view.wt.wtOverlays.topLeftCornerOverlay.clone.wtTable.THEAD : null;

      var removeButton = function removeButton(button) {
        if (button) {
          button.parentNode.removeChild(button);
        }
      };

      rangeEach(0, headerLevels - 1, function (i) {
        var masterLevel = mainHeaders.childNodes[i];
        var topLevel = topHeaders.childNodes[i];
        var topLeftCornerLevel = topLeftCornerHeaders ? topLeftCornerHeaders.childNodes[i] : null;
        rangeEach(0, masterLevel.childNodes.length - 1, function (j) {
          var button = masterLevel.childNodes[j].querySelector('.collapsibleIndicator');
          removeButton(button);

          if (topLevel && topLevel.childNodes[j]) {
            button = topLevel.childNodes[j].querySelector('.collapsibleIndicator');
            removeButton(button);
          }

          if (topLeftCornerHeaders && topLeftCornerLevel && topLeftCornerLevel.childNodes[j]) {
            button = topLeftCornerLevel.childNodes[j].querySelector('.collapsibleIndicator');
            removeButton(button);
          }
        });
      }, true);
    }
    /**
     * Parses the plugin settings and create a button configuration array.
     *
     * @private
     */

  }, {
    key: "parseSettings",
    value: function parseSettings() {
      var _this3 = this;

      objectEach(this.settings, function (val) {
        if (!_this3.buttonEnabledList.has(val.row)) {
          _this3.buttonEnabledList.set(val.row, new Set());
        }

        _this3.buttonEnabledList.get(val.row).add(val.col);
      });
      this.collapsableCoordsList = this.buttonEnabledList;
    }
    /**
     * Checks if plugin dependencies are met.
     *
     * @private
     * @returns {Boolean}
     */

  }, {
    key: "meetsDependencies",
    value: function meetsDependencies() {
      var settings = this.hot.getSettings();
      return settings.nestedHeaders && settings.hiddenColumns;
    }
    /**
     * Checks if all the required dependencies are enabled.
     *
     * @private
     */

  }, {
    key: "checkDependencies",
    value: function checkDependencies() {
      var settings = this.hot.getSettings();

      if (this.meetsDependencies()) {
        return;
      }

      if (!settings.nestedHeaders) {
        warn('You need to configure the Nested Headers plugin in order to use collapsible headers.');
      }

      if (!settings.hiddenColumns) {
        warn('You need to configure the Hidden Columns plugin in order to use collapsible headers.');
      }
    }
    /**
     * Generates the indicator element.
     *
     * @private
     * @param {Number} column Column index.
     * @param {HTMLElement} TH TH Element.
     * @returns {HTMLElement}
     */

  }, {
    key: "generateIndicator",
    value: function generateIndicator(column, TH) {
      var TR = TH.parentNode;
      var THEAD = TR.parentNode;
      var row = -1 * THEAD.childNodes.length + Array.prototype.indexOf.call(THEAD.childNodes, TR);

      if (this.buttonEnabledList.size > 0 && (!this.buttonEnabledList.has(row) || !this.buttonEnabledList.get(row).has(column))) {
        return null;
      }

      var divEl = this.hot.rootDocument.createElement('DIV');
      addClass(divEl, 'collapsibleIndicator');

      if (this.collapsedSections.has(row) && this.collapsedSections.get(row)[column] === true) {
        addClass(divEl, 'collapsed');
        fastInnerText(divEl, '+');
      } else {
        addClass(divEl, 'expanded');
        fastInnerText(divEl, '-');
      }

      return divEl;
    }
    /**
     * Generates the list of collapsable coords.
     *
     * @private
     * @param {Number} column Column index.
     * @param {HTMLElement} TH TH Element.
     */

  }, {
    key: "generateCollapsableCoordsList",
    value: function generateCollapsableCoordsList(column, TH) {
      var TR = TH.parentNode;
      var THEAD = TR.parentNode;
      var row = -1 * THEAD.childNodes.length + Array.from(THEAD.childNodes).indexOf(TR);

      if (!this.collapsableCoordsList.has(row)) {
        this.collapsableCoordsList.set(row, new Set());
      }

      this.collapsableCoordsList.get(row).add(column);
    }
    /**
     * Marks (internally) a section as 'collapsed' or 'expanded' (optionally, also mark the 'child' headers).
     *
     * @private
     * @param {String} state State ('collapsed' or 'expanded').
     * @param {Number} row Row index.
     * @param {Number} column Column index.
     * @param {Boolean} recursive If `true`, it will also attempt to mark the child sections.
     */

  }, {
    key: "markSectionAs",
    value: function markSectionAs(state, row, column, recursive) {
      if (!this.collapsedSections.has(row)) {
        this.collapsedSections.set(row, []);
      }

      switch (state) {
        case 'collapsed':
          this.collapsedSections.get(row)[column] = true;
          break;

        case 'expanded':
          this.collapsedSections.get(row)[column] = void 0;
          break;

        default:
          break;
      }

      if (recursive) {
        var nestedHeadersColspans = this.nestedHeadersPlugin.colspanArray;
        var level = this.nestedHeadersPlugin.rowCoordsToLevel(row);
        var childHeaders = this.nestedHeadersPlugin.getChildHeaders(row, column);
        var childColspanLevel = nestedHeadersColspans[level + 1];

        for (var i = 1; i < childHeaders.length; i++) {
          if (childColspanLevel && childColspanLevel[childHeaders[i]].colspan > 1) {
            this.markSectionAs(state, row + 1, childHeaders[i], true);
          }
        }
      }
    }
    /**
     * Expands section at the provided coords.
     *
     * @param {Object} coords Contains coordinates information. (`coords.row`, `coords.col`)
     */

  }, {
    key: "expandSection",
    value: function expandSection(coords) {
      this.toggleCollapsibleSection([coords], 'expand');
    }
    /**
     * Collapses section at the provided coords.
     *
     * @param {Object} coords Contains coordinates information. (`coords.row`, `coords.col`)
     */

  }, {
    key: "collapseSection",
    value: function collapseSection(coords) {
      this.toggleCollapsibleSection([coords], 'collapse');
    }
    /**
     * Collapses or expand all collapsible sections, depending on the action parameter.
     *
     * @param {String} action 'collapse' or 'expand'.
     */

  }, {
    key: "toggleAllCollapsibleSections",
    value: function toggleAllCollapsibleSections(action) {
      var _this4 = this;

      var nestedHeadersColspanArray = this.nestedHeadersPlugin.colspanArray;
      var sectionToToggle = [];

      if (this.settings === true) {
        arrayEach(nestedHeadersColspanArray, function (headerLevel, i) {
          arrayEach(headerLevel, function (header, j) {
            if (header.colspan > 1) {
              var row = _this4.nestedHeadersPlugin.levelToRowCoords(parseInt(i, 10));

              var col = parseInt(j, 10);
              sectionToToggle.push({
                row: row,
                col: col
              });
            }
          });
        });
      } else {
        arrayEach(this.buttonEnabledList, function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              headerRowIndex = _ref2[0],
              columnIndexes = _ref2[1];

          arrayEach(columnIndexes, function (columnIndex) {
            var rowIndex = parseInt(headerRowIndex, 10);
            sectionToToggle.push({
              row: rowIndex,
              col: columnIndex
            });
          });
        });
      }

      this.toggleCollapsibleSection(sectionToToggle, action);
    }
    /**
     * Collapses all collapsible sections.
     */

  }, {
    key: "collapseAll",
    value: function collapseAll() {
      this.toggleAllCollapsibleSections('collapse');
    }
    /**
     * Expands all collapsible sections.
     */

  }, {
    key: "expandAll",
    value: function expandAll() {
      this.toggleAllCollapsibleSections('expand');
    }
    /**
     * Collapses/Expands a section.
     *
     * @param {Array} coords Array of coords - section coordinates.
     * @param {String} action Action definition ('collapse' or 'expand').
     * @fires Hooks#beforeColumnCollapse
     * @fires Hooks#beforeColumnExpand
     * @fires Hooks#afterColumnCollapse
     * @fires Hooks#afterColumnExpand
     */

  }, {
    key: "toggleCollapsibleSection",
    value: function toggleCollapsibleSection(coords, action) {
      var _this5 = this;

      if (!Array.isArray(coords)) {
        return;
      }

      var currentCollapsedColumns = this.collapsedColumns;
      var hiddenColumns = this.hiddenColumnsPlugin.hiddenColumns;
      var cloneCollapsedSections = new Map(deepClone(Array.from(this.collapsedSections)));
      var collapsePossible;
      arrayEach(coords, function (currentCoords) {
        if (currentCoords.row) {
          currentCoords.row = parseInt(currentCoords.row, 10);
        }

        if (currentCoords.col) {
          currentCoords.col = parseInt(currentCoords.col, 10);
        }

        if (!_this5.collapsableCoordsList.has(currentCoords.row) || _this5.collapsableCoordsList.has(currentCoords.row) && !_this5.collapsableCoordsList.get(currentCoords.row).has(currentCoords.col)) {
          collapsePossible = false;
          return false;
        }

        collapsePossible = _this5.collapsableCoordsList.get(currentCoords.row).has(currentCoords.col);
        var colspanArray = _this5.nestedHeadersPlugin.colspanArray;

        var level = _this5.nestedHeadersPlugin.rowCoordsToLevel(currentCoords.row);

        var currentHeaderColspan = colspanArray[level][currentCoords.col].colspan;

        var childHeaders = _this5.nestedHeadersPlugin.getChildHeaders(currentCoords.row, currentCoords.col);

        var nextLevel = level + 1;
        var childColspanLevel = colspanArray[nextLevel];
        var firstChildColspan = childColspanLevel ? childColspanLevel[childHeaders[0]].colspan || 1 : 1;

        while (firstChildColspan === currentHeaderColspan && nextLevel < _this5.columnHeaderLevelCount) {
          nextLevel += 1;
          childColspanLevel = colspanArray[nextLevel];
          firstChildColspan = childColspanLevel ? childColspanLevel[childHeaders[0]].colspan || 1 : 1;
        }

        rangeEach(firstChildColspan, currentHeaderColspan - 1, function (i) {
          var colToHide = currentCoords.col + i;

          switch (action) {
            case 'collapse':
              if (!_this5.hiddenColumnsPlugin.isHidden(colToHide)) {
                hiddenColumns.push(colToHide);
              }

              _this5.markSectionAs('collapsed', currentCoords.row, currentCoords.col, true);

              break;

            case 'expand':
              if (_this5.hiddenColumnsPlugin.isHidden(colToHide)) {
                hiddenColumns.splice(hiddenColumns.indexOf(colToHide), 1);
              }

              _this5.markSectionAs('expanded', currentCoords.row, currentCoords.col, true);

              break;

            default:
              break;
          }
        });
      });
      var destinationCollapsedColumns = Array.from(hiddenColumns);

      if (action === 'collapse') {
        var allowColumnCollapse = this.hot.runHooks('beforeColumnCollapse', currentCollapsedColumns, destinationCollapsedColumns, collapsePossible);

        if (allowColumnCollapse === false) {
          this.hiddenColumnsPlugin.hiddenColumns = Array.from(this.collapsedColumns);
          this.collapsedSections = cloneCollapsedSections;
          return;
        }
      } else {
        var allowColumnExpand = this.hot.runHooks('beforeColumnExpand', currentCollapsedColumns, destinationCollapsedColumns, collapsePossible);

        if (allowColumnExpand === false) {
          this.hiddenColumnsPlugin.hiddenColumns = Array.from(this.collapsedColumns);
          this.collapsedSections = cloneCollapsedSections;
          return;
        }
      }

      this.collapsedColumns = destinationCollapsedColumns;

      if (action === 'collapse') {
        this.hot.runHooks('afterColumnCollapse', currentCollapsedColumns, destinationCollapsedColumns, collapsePossible, destinationCollapsedColumns.length > currentCollapsedColumns.length);
      } else {
        this.hot.runHooks('afterColumnExpand', currentCollapsedColumns, destinationCollapsedColumns, collapsePossible, destinationCollapsedColumns.length < currentCollapsedColumns.length);
      }

      this.hot.render();
      this.hot.view.wt.wtOverlays.adjustElementsSize(true);
    }
    /**
     * Adds the indicator to the headers.
     *
     * @private
     * @param {Number} column Column index.
     * @param {HTMLElement} TH TH element.
     */

  }, {
    key: "onAfterGetColHeader",
    value: function onAfterGetColHeader(column, TH) {
      if (TH.hasAttribute('colspan') && TH.getAttribute('colspan') > 1 && column >= this.hot.getSettings().fixedColumnsLeft) {
        var button = this.generateIndicator(column, TH);

        if (this.buttonEnabledList.size === 0) {
          this.generateCollapsableCoordsList(column, TH);
        }

        if (button !== null) {
          TH.querySelector('div:first-child').appendChild(button);
        }
      }
    }
    /**
     * Indicator mouse event callback.
     *
     * @private
     * @param {Object} event Mouse event.
     * @param {Object} coords Event coordinates.
     */

  }, {
    key: "onBeforeOnCellMouseDown",
    value: function onBeforeOnCellMouseDown(event, coords) {
      if (hasClass(event.target, 'collapsibleIndicator')) {
        if (hasClass(event.target, 'expanded')) {
          // mark section as collapsed
          if (!this.collapsedSections.has(coords.row)) {
            this.collapsedSections.set(coords.row, []);
          }

          this.eventManager.fireEvent(event.target, 'mouseup');
          this.toggleCollapsibleSection([coords], 'collapse');
        } else if (hasClass(event.target, 'collapsed')) {
          this.eventManager.fireEvent(event.target, 'mouseup');
          this.toggleCollapsibleSection([coords], 'expand');
        }

        stopImmediatePropagation(event);
        return false;
      }
    }
    /**
     * AfterInit hook callback.
     *
     * @private
     */

  }, {
    key: "onAfterInit",
    value: function onAfterInit() {
      this.columnHeaderLevelCount = this.hot.view.wt.getSetting('columnHeaders').length;
    }
    /**
     * AfterRender hook callback.
     *
     * @private
     */

  }, {
    key: "onAfterRender",
    value: function onAfterRender() {
      if (!this.nestedHeadersPlugin.enabled || !this.hiddenColumnsPlugin.enabled) {
        this.disablePlugin();
      }
    }
    /**
     * Destroys the plugin instance.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.settings = null;
      this.buttonEnabledList = null;
      this.hiddenColumnsPlugin = null;
      this.nestedHeadersPlugin = null;
      this.collapsedSections = null;
      this.columnHeaderLevelCount = null;
      this.collapsedColumns = null;
      this.collapsableCoordsList = null;

      _get(_getPrototypeOf(CollapsibleColumns.prototype), "destroy", this).call(this);
    }
  }]);

  return CollapsibleColumns;
}(BasePlugin);

registerPlugin('collapsibleColumns', CollapsibleColumns);
export default CollapsibleColumns;