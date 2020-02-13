import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.index-of";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.reverse";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.object.freeze";
import "core-js/modules/es.object.get-own-property-descriptor";
import "core-js/modules/es.object.get-prototype-of";
import "core-js/modules/es.object.set-prototype-of";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.reflect.get";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/es.weak-map";
import "core-js/modules/web.dom-collections.iterator";
import "core-js/modules/web.timers";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _templateObject() {
  var data = _taggedTemplateLiteral(["Since version 8.0.0 of the Handsontable the 'moveRows' method isn't used for moving rows when the NestedRows plugin is enabled. \n      Please use the 'dragRows' method instead."]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

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

import BasePlugin from '../_base';
import { registerPlugin } from '../../plugins';
import { rangeEach } from '../../helpers/number';
import { arrayEach } from '../../helpers/array';
import { isUndefined } from '../../helpers/mixed';
import { warn } from '../../helpers/console';
import { toSingleLine } from '../../helpers/templateLiteralTag';
import { CellCoords } from '../../3rdparty/walkontable/src';
import DataManager from './data/dataManager';
import CollapsingUI from './ui/collapsing';
import HeadersUI from './ui/headers';
import ContextMenuUI from './ui/contextMenu';
import { SkipMap } from '../../translations';
var privatePool = new WeakMap();
/**
 * @plugin NestedRows
 * @experimental
 *
 * @description
 * Plugin responsible for displaying and operating on data sources with nested structures.
 *
 * @dependencies BindRowsWithHeaders
 */

var NestedRows =
/*#__PURE__*/
function (_BasePlugin) {
  _inherits(NestedRows, _BasePlugin);

  function NestedRows(hotInstance) {
    var _this;

    _classCallCheck(this, NestedRows);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NestedRows).call(this, hotInstance));
    /**
     * Source data object.
     *
     * @private
     * @type {Object}
     */

    _this.sourceData = null;
    /**
     * Reference to the BindRowsWithHeaders plugin.
     *
     * @private
     * @type {Object}
     */

    _this.bindRowsWithHeadersPlugin = null;
    /**
     * Reference to the DataManager instance.
     *
     * @private
     * @type {Object}
     */

    _this.dataManager = null;
    /**
     * Reference to the HeadersUI instance.
     *
     * @private
     * @type {Object}
     */

    _this.headersUI = null;
    /**
     * Map of skipped rows by plugin.
     *
     * @private
     * @type {null|SkipMap}
     */

    _this.collapsedRowsMap = null;
    privatePool.set(_assertThisInitialized(_this), {
      changeSelection: false,
      movedToFirstChild: false,
      movedToCollapsed: false,
      skipRender: null
    });
    return _this;
  }
  /**
   * Checks if the plugin is enabled in the handsontable settings. This method is executed in {@link Hooks#beforeInit}
   * hook and if it returns `true` than the {@link NestedRows#enablePlugin} method is called.
   *
   * @returns {Boolean}
   */


  _createClass(NestedRows, [{
    key: "isEnabled",
    value: function isEnabled() {
      return !!this.hot.getSettings().nestedRows;
    }
    /**
     * Enables the plugin functionality for this Handsontable instance.
     */

  }, {
    key: "enablePlugin",
    value: function enablePlugin() {
      var _this2 = this;

      this.sourceData = this.hot.getSourceData();
      this.bindRowsWithHeadersPlugin = this.hot.getPlugin('bindRowsWithHeaders');
      this.collapsedRowsMap = this.hot.rowIndexMapper.registerMap('nestedRows', new SkipMap());
      this.dataManager = new DataManager(this, this.hot, this.sourceData);
      this.collapsingUI = new CollapsingUI(this, this.hot);
      this.headersUI = new HeadersUI(this, this.hot);
      this.contextMenuUI = new ContextMenuUI(this, this.hot);
      this.dataManager.rewriteCache();
      this.addHook('afterInit', function () {
        return _this2.onAfterInit.apply(_this2, arguments);
      });
      this.addHook('beforeRender', function () {
        return _this2.onBeforeRender.apply(_this2, arguments);
      });
      this.addHook('modifyRowData', function () {
        return _this2.onModifyRowData.apply(_this2, arguments);
      });
      this.addHook('modifySourceLength', function () {
        return _this2.onModifySourceLength.apply(_this2, arguments);
      });
      this.addHook('beforeDataSplice', function () {
        return _this2.onBeforeDataSplice.apply(_this2, arguments);
      });
      this.addHook('beforeDataFilter', function () {
        return _this2.onBeforeDataFilter.apply(_this2, arguments);
      });
      this.addHook('afterContextMenuDefaultOptions', function () {
        return _this2.onAfterContextMenuDefaultOptions.apply(_this2, arguments);
      });
      this.addHook('afterGetRowHeader', function () {
        return _this2.onAfterGetRowHeader.apply(_this2, arguments);
      });
      this.addHook('beforeOnCellMouseDown', function () {
        return _this2.onBeforeOnCellMouseDown.apply(_this2, arguments);
      });
      this.addHook('afterRemoveRow', function () {
        return _this2.onAfterRemoveRow.apply(_this2, arguments);
      });
      this.addHook('modifyRemovedAmount', function () {
        return _this2.onModifyRemovedAmount.apply(_this2, arguments);
      });
      this.addHook('beforeAddChild', function () {
        return _this2.onBeforeAddChild.apply(_this2, arguments);
      });
      this.addHook('afterAddChild', function () {
        return _this2.onAfterAddChild.apply(_this2, arguments);
      });
      this.addHook('beforeDetachChild', function () {
        return _this2.onBeforeDetachChild.apply(_this2, arguments);
      });
      this.addHook('afterDetachChild', function () {
        return _this2.onAfterDetachChild.apply(_this2, arguments);
      });
      this.addHook('modifyRowHeaderWidth', function () {
        return _this2.onModifyRowHeaderWidth.apply(_this2, arguments);
      });
      this.addHook('afterCreateRow', function () {
        return _this2.onAfterCreateRow.apply(_this2, arguments);
      });
      this.addHook('beforeRowMove', function () {
        return _this2.onBeforeRowMove.apply(_this2, arguments);
      });
      this.addHook('beforeLoadData', function (data) {
        return _this2.onBeforeLoadData(data);
      });

      _get(_getPrototypeOf(NestedRows.prototype), "enablePlugin", this).call(this);
    }
    /**
     * Disables the plugin functionality for this Handsontable instance.
     */

  }, {
    key: "disablePlugin",
    value: function disablePlugin() {
      this.hot.rowIndexMapper.unregisterMap('nestedRows');

      _get(_getPrototypeOf(NestedRows.prototype), "disablePlugin", this).call(this);
    }
    /**
     * Updates the plugin state. This method is executed when {@link Core#updateSettings} is invoked.
     */

  }, {
    key: "updatePlugin",
    value: function updatePlugin() {
      this.disablePlugin();
      this.enablePlugin();

      _get(_getPrototypeOf(NestedRows.prototype), "updatePlugin", this).call(this);
    }
    /**
     * `beforeRowMove` hook callback.
     *
     * @private
     * @param {Array} rows Array of visual row indexes to be moved.
     * @param {Number} finalIndex Visual row index, being a start index for the moved rows. Points to where the elements will be placed after the moving action.
     * To check the visualization of the final index, please take a look at [documentation](/demo-moving.html#manualRowMove).
     * @param {undefined|Number} dropIndex Visual row index, being a drop index for the moved rows. Points to where we are going to drop the moved elements.
     * To check visualization of drop index please take a look at [documentation](/demo-moving.html#manualRowMove).
     * @param {Boolean} movePossible Indicates if it's possible to move rows to the desired position.
     * @fires Hooks#afterRowMove
     */

  }, {
    key: "onBeforeRowMove",
    value: function onBeforeRowMove(rows, finalIndex, dropIndex, movePossible) {
      if (isUndefined(dropIndex)) {
        warn(toSingleLine(_templateObject())); // TODO: Trying to mock real work of the `ManualRowMove` plugin. It was blocked by returning `false` below.

        this.hot.runHooks('afterRowMove', rows, finalIndex, dropIndex, movePossible, false);
        return false;
      }

      var priv = privatePool.get(this);
      var rowsLen = rows.length;
      var translatedStartIndexes = [];
      var translatedDropIndex = this.dataManager.translateTrimmedRow(dropIndex);
      var allowMove = true;
      var i;
      var fromParent = null;
      var toParent = null;
      var sameParent = null; // We can't move rows when any of them is a parent

      for (i = 0; i < rowsLen; i++) {
        translatedStartIndexes.push(this.dataManager.translateTrimmedRow(rows[i]));

        if (this.dataManager.isParent(translatedStartIndexes[i])) {
          allowMove = false;
        }
      } // We can't move rows when any of them is tried to be moved to the position of moved row
      // TODO: Another work than the `ManualRowMove` plugin.


      if (translatedStartIndexes.indexOf(translatedDropIndex) > -1 || !allowMove) {
        return false;
      }

      fromParent = this.dataManager.getRowParent(translatedStartIndexes[0]);
      toParent = this.dataManager.getRowParent(translatedDropIndex); // We move row to the first parent of destination row whether there was a try of moving it on the row being a parent

      if (toParent === null || toParent === void 0) {
        toParent = this.dataManager.getRowParent(translatedDropIndex - 1);
      } // We add row to element as child whether there is no parent of final destination row


      if (toParent === null || toParent === void 0) {
        toParent = this.dataManager.getDataObject(translatedDropIndex - 1);
        priv.movedToFirstChild = true;
      } // Can't move row whether there was a try of moving it on the row being a parent and it has no rows above.


      if (!toParent) {
        return false;
      }

      sameParent = fromParent === toParent;
      priv.movedToCollapsed = this.collapsingUI.areChildrenCollapsed(toParent);
      this.collapsingUI.collapsedRowsStash.stash();

      if (!sameParent) {
        if (Math.max.apply(Math, translatedStartIndexes) <= translatedDropIndex) {
          this.collapsingUI.collapsedRowsStash.shiftStash(translatedStartIndexes[0], -1 * rows.length);
        } else {
          this.collapsingUI.collapsedRowsStash.shiftStash(translatedDropIndex, rows.length);
        }
      }

      priv.changeSelection = true;

      if (translatedStartIndexes[rowsLen - 1] <= translatedDropIndex && sameParent || priv.movedToFirstChild === true) {
        rows.reverse();
        translatedStartIndexes.reverse();

        if (priv.movedToFirstChild !== true) {
          translatedDropIndex -= 1;
        }
      }

      for (i = 0; i < rowsLen; i++) {
        this.dataManager.moveRow(translatedStartIndexes[i], translatedDropIndex);
      }

      var movingDown = translatedStartIndexes[translatedStartIndexes.length - 1] < translatedDropIndex;

      if (movingDown) {
        for (i = rowsLen - 1; i >= 0; i--) {
          this.dataManager.moveCellMeta(translatedStartIndexes[i], translatedDropIndex);
        }
      } else {
        for (i = 0; i < rowsLen; i++) {
          this.dataManager.moveCellMeta(translatedStartIndexes[i], translatedDropIndex);
        }
      }

      if (translatedStartIndexes[rowsLen - 1] <= translatedDropIndex && sameParent || this.dataManager.isParent(translatedDropIndex)) {
        rows.reverse();
      }

      this.dataManager.rewriteCache(); // TODO: Trying to mock real work of the `ManualRowMove` plugin. It was blocked by returning `false` below.

      this.hot.runHooks('afterRowMove', rows, finalIndex, dropIndex, movePossible, movePossible && this.isRowOrderChanged(rows, finalIndex));
      this.selectCells(rows, dropIndex);
      return false;
    } // TODO: Reimplementation of function which is inside the `ManualRowMove` plugin.

    /**
     * Indicates if order of rows was changed.
     *
     * @private
     * @param {Array} movedRows Array of visual row indexes to be moved.
     * @param {Number} finalIndex Visual row index, being a start index for the moved rows. Points to where the elements will be placed after the moving action.
     * To check the visualization of the final index, please take a look at [documentation](/demo-moving.html#manualRowMove).
     * @returns {Boolean}
     */

  }, {
    key: "isRowOrderChanged",
    value: function isRowOrderChanged(movedRows, finalIndex) {
      return movedRows.some(function (row, nrOfMovedElement) {
        return row - nrOfMovedElement !== finalIndex;
      });
    }
    /**
     * Select cells after the move.
     *
     * @private
     * @param {Array} rows Array of visual row indexes to be moved.
     * @param {undefined|Number} dropIndex Visual row index, being a drop index for the moved rows. Points to where we are going to drop the moved elements.
     * To check visualization of drop index please take a look at [documentation](/demo-moving.html#manualRowMove).
     */

  }, {
    key: "selectCells",
    value: function selectCells(rows, dropIndex) {
      var priv = privatePool.get(this);

      if (!priv.changeSelection) {
        return;
      }

      var rowsLen = rows.length;
      var startRow = 0;
      var endRow = 0;
      var translatedDropIndex = null;
      var selection = null;
      var lastColIndex = null;
      this.collapsingUI.collapsedRowsStash.applyStash();
      translatedDropIndex = this.dataManager.translateTrimmedRow(dropIndex);

      if (priv.movedToFirstChild) {
        priv.movedToFirstChild = false;
        startRow = dropIndex;
        endRow = dropIndex + rowsLen - 1;

        if (dropIndex >= Math.max.apply(Math, _toConsumableArray(rows))) {
          startRow -= rowsLen;
          endRow -= rowsLen;
        }
      } else if (priv.movedToCollapsed) {
        var parentObject = this.dataManager.getRowParent(translatedDropIndex - 1);

        if (parentObject === null || parentObject === void 0) {
          parentObject = this.dataManager.getDataObject(translatedDropIndex - 1);
        }

        var parentIndex = this.dataManager.getRowIndex(parentObject);
        startRow = parentIndex;
        endRow = startRow;
      } else if (rows[rowsLen - 1] < dropIndex) {
        endRow = dropIndex - 1;
        startRow = endRow - rowsLen + 1;
      } else {
        startRow = dropIndex;
        endRow = startRow + rowsLen - 1;
      }

      selection = this.hot.selection;
      lastColIndex = this.hot.countCols() - 1;
      selection.setRangeStart(new CellCoords(startRow, 0));
      selection.setRangeEnd(new CellCoords(endRow, lastColIndex), true);
      priv.changeSelection = false;
    }
    /**
     * `beforeOnCellMousedown` hook callback.
     *
     * @private
     * @param {MouseEvent} event Mousedown event.
     * @param {Object} coords Cell coords.
     * @param {HTMLElement} TD clicked cell.
     */

  }, {
    key: "onBeforeOnCellMouseDown",
    value: function onBeforeOnCellMouseDown(event, coords, TD) {
      this.collapsingUI.toggleState(event, coords, TD);
    }
    /**
     * The modifyRowData hook callback.
     *
     * @private
     * @param {Number} row Visual row index.
     */

  }, {
    key: "onModifyRowData",
    value: function onModifyRowData(row) {
      return this.dataManager.getDataObject(row);
    }
    /**
     * Modify the source data length to match the length of the nested structure.
     *
     * @private
     * @returns {Number}
     */

  }, {
    key: "onModifySourceLength",
    value: function onModifySourceLength() {
      return this.dataManager.countAllRows();
    }
    /**
     * @private
     * @param {Number} index
     * @param {Number} amount
     * @param {Object} element
     * @returns {Boolean}
     */

  }, {
    key: "onBeforeDataSplice",
    value: function onBeforeDataSplice(index, amount, element) {
      this.dataManager.spliceData(index, amount, element);
      return false;
    }
    /**
     * Called before the source data filtering. Returning `false` stops the native filtering.
     *
     * @private
     * @param {Number} index
     * @param {Number} amount
     * @returns {Boolean}
     */

  }, {
    key: "onBeforeDataFilter",
    value: function onBeforeDataFilter(index, amount) {
      var realLogicRows = [];
      var startIndex = this.dataManager.translateTrimmedRow(index);
      var priv = privatePool.get(this);
      rangeEach(startIndex, startIndex + amount - 1, function (i) {
        realLogicRows.push(i);
      });
      this.collapsingUI.collapsedRowsStash.stash();
      this.collapsingUI.collapsedRowsStash.trimStash(startIndex, amount);
      this.collapsingUI.collapsedRowsStash.shiftStash(startIndex, -1 * amount);
      this.dataManager.filterData(index, amount, realLogicRows);
      priv.skipRender = true;
      return false;
    }
    /**
     * `afterContextMenuDefaultOptions` hook callback.
     *
     * @private
     * @param {Object} defaultOptions
     */

  }, {
    key: "onAfterContextMenuDefaultOptions",
    value: function onAfterContextMenuDefaultOptions(defaultOptions) {
      return this.contextMenuUI.appendOptions(defaultOptions);
    }
    /**
     * `afterGetRowHeader` hook callback.
     *
     * @private
     * @param {Number} row Row index.
     * @param {HTMLElement} TH row header element.
     */

  }, {
    key: "onAfterGetRowHeader",
    value: function onAfterGetRowHeader(row, TH) {
      this.headersUI.appendLevelIndicators(row, TH);
    }
    /**
     * `modifyRowHeaderWidth` hook callback.
     *
     * @private
     * @param {Number} rowHeaderWidth The initial row header width(s).
     * @returns {Number}
     */

  }, {
    key: "onModifyRowHeaderWidth",
    value: function onModifyRowHeaderWidth(rowHeaderWidth) {
      return this.headersUI.rowHeaderWidthCache || rowHeaderWidth;
    }
    /**
     * `onAfterRemoveRow` hook callback.
     *
     * @private
     * @param {Number} index Removed row.
     * @param {Number} amount Amount of removed rows.
     * @param {Array} logicRows
     * @param {String} source Source of action.
     */

  }, {
    key: "onAfterRemoveRow",
    value: function onAfterRemoveRow(index, amount, logicRows, source) {
      var _this3 = this;

      if (source === this.pluginName) {
        return;
      }

      var priv = privatePool.get(this);
      setTimeout(function () {
        priv.skipRender = null;

        _this3.headersUI.updateRowHeaderWidth();

        _this3.collapsingUI.collapsedRowsStash.applyStash();
      }, 0);
    }
    /**
     * `modifyRemovedAmount` hook callback.
     *
     * @private
     * @param {Number} amount Initial amount.
     * @param {Number} index Index of the starting row.
     * @returns {Number} Modified amount.
     */

  }, {
    key: "onModifyRemovedAmount",
    value: function onModifyRemovedAmount(amount, index) {
      var _this4 = this;

      var lastParents = [];
      var childrenCount = 0;
      rangeEach(index, index + amount - 1, function (i) {
        var isChild = false;

        var translated = _this4.collapsingUI.translateTrimmedRow(i);

        var currentDataObj = _this4.dataManager.getDataObject(translated);

        if (_this4.dataManager.hasChildren(currentDataObj)) {
          lastParents.push(currentDataObj);
          arrayEach(lastParents, function (elem) {
            if (elem.__children.indexOf(currentDataObj) > -1) {
              isChild = true;
              return false;
            }
          });

          if (!isChild) {
            childrenCount += _this4.dataManager.countChildren(currentDataObj);
          }
        }

        isChild = false;
        arrayEach(lastParents, function (elem) {
          if (elem.__children.indexOf(currentDataObj) > -1) {
            isChild = true;
            return false;
          }
        });

        if (isChild) {
          childrenCount -= 1;
        }
      });
      return amount + childrenCount;
    }
    /**
     * `beforeAddChild` hook callback.
     *
     * @private
     */

  }, {
    key: "onBeforeAddChild",
    value: function onBeforeAddChild() {
      this.collapsingUI.collapsedRowsStash.stash();
    }
    /**
     * `afterAddChild` hook callback.
     *
     * @private
     * @param {Object} parent Parent element.
     * @param {Object} element New child element.
     */

  }, {
    key: "onAfterAddChild",
    value: function onAfterAddChild(parent, element) {
      this.collapsingUI.collapsedRowsStash.shiftStash(this.dataManager.getRowIndex(element));
      this.collapsingUI.collapsedRowsStash.applyStash();
      this.headersUI.updateRowHeaderWidth();
    }
    /**
     * `beforeDetachChild` hook callback.
     *
     * @private
     */

  }, {
    key: "onBeforeDetachChild",
    value: function onBeforeDetachChild() {
      this.collapsingUI.collapsedRowsStash.stash();
    }
    /**
     * `afterDetachChild` hook callback.
     *
     * @private
     * @param {Object} parent Parent element.
     * @param {Object} element New child element.
     */

  }, {
    key: "onAfterDetachChild",
    value: function onAfterDetachChild(parent, element) {
      this.collapsingUI.collapsedRowsStash.shiftStash(this.dataManager.getRowIndex(element));
      this.collapsingUI.collapsedRowsStash.applyStash();
      this.headersUI.updateRowHeaderWidth();
    }
    /**
     * `afterCreateRow` hook callback.
     *
     * @private
     * @param {Number} index
     * @param {Number} amount
     * @param {String} source
     */

  }, {
    key: "onAfterCreateRow",
    value: function onAfterCreateRow(index, amount, source) {
      if (source === this.pluginName) {
        return;
      }

      this.dataManager.rewriteCache();
    }
    /**
     * `afterInit` hook callback.
     *
     * @private
     */

  }, {
    key: "onAfterInit",
    value: function onAfterInit() {
      var deepestLevel = Math.max.apply(Math, _toConsumableArray(this.dataManager.cache.levels));

      if (deepestLevel > 0) {
        this.headersUI.updateRowHeaderWidth(deepestLevel);
      }
    }
    /**
     * `beforeRender` hook callback.
     *
     * @param {Boolean} force
     * @param {Object} skipRender
     * @private
     */

  }, {
    key: "onBeforeRender",
    value: function onBeforeRender(force, skipRender) {
      var priv = privatePool.get(this);

      if (priv.skipRender) {
        skipRender.skipRender = true;
      }
    }
    /**
     * Destroys the plugin instance.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.hot.rowIndexMapper.unregisterMap('nestedRows');

      _get(_getPrototypeOf(NestedRows.prototype), "destroy", this).call(this);
    }
    /**
     * `beforeLoadData` hook callback.
     *
     * @param {Array} data
     * @private
     */

  }, {
    key: "onBeforeLoadData",
    value: function onBeforeLoadData(data) {
      this.dataManager.data = data;
      this.dataManager.rewriteCache();
    }
  }]);

  return NestedRows;
}(BasePlugin);

registerPlugin('nestedRows', NestedRows);
export default NestedRows;