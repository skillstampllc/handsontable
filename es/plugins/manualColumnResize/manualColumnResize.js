import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.for-each";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.object.get-own-property-descriptor";
import "core-js/modules/es.object.get-prototype-of";
import "core-js/modules/es.object.set-prototype-of";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.reflect.get";
import "core-js/modules/es.string.iterator";
import "core-js/modules/es.weak-map";
import "core-js/modules/web.dom-collections.for-each";
import "core-js/modules/web.dom-collections.iterator";
import "core-js/modules/web.timers";

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

import BasePlugin from './../_base';
import { addClass, hasClass, removeClass, outerHeight } from './../../helpers/dom/element';
import EventManager from './../../eventManager';
import { pageX } from './../../helpers/dom/event';
import { arrayEach } from './../../helpers/array';
import { rangeEach } from './../../helpers/number';
import { registerPlugin } from './../../plugins';
import { PhysicalIndexToValueMap as IndexToValueMap } from './../../translations'; // Developer note! Whenever you make a change in this file, make an analogous change in manualRowResize.js

var COLUMN_WIDTHS_MAP_NAME = 'manualColumnResize';
var PERSISTENT_STATE_KEY = 'manualColumnWidths';
var privatePool = new WeakMap();
/**
 * @description
 * This plugin allows to change columns width. To make columns width persistent the {@link Options#persistentState}
 * plugin should be enabled.
 *
 * The plugin creates additional components to make resizing possibly using user interface:
 * - handle - the draggable element that sets the desired width of the column.
 * - guide - the helper guide that shows the desired width as a vertical guide.
 *
 * @plugin ManualColumnResize
 */

var ManualColumnResize =
/*#__PURE__*/
function (_BasePlugin) {
  _inherits(ManualColumnResize, _BasePlugin);

  function ManualColumnResize(hotInstance) {
    var _this;

    _classCallCheck(this, ManualColumnResize);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ManualColumnResize).call(this, hotInstance));
    var rootDocument = _this.hot.rootDocument;
    _this.currentTH = null;
    _this.currentCol = null;
    _this.selectedCols = [];
    _this.currentWidth = null;
    _this.newSize = null;
    _this.startY = null;
    _this.startWidth = null;
    _this.startOffset = null;
    _this.handle = rootDocument.createElement('DIV');
    _this.guide = rootDocument.createElement('DIV');
    _this.eventManager = new EventManager(_assertThisInitialized(_this));
    _this.pressed = null;
    _this.dblclick = 0;
    _this.autoresizeTimeout = null;
    /**
     * PhysicalIndexToValueMap to keep and track widths for physical column indexes.
     *
     * @private
     * @type {PhysicalIndexToValueMap}
     */

    _this.columnWidthsMap = void 0;
    /**
     * Private pool to save configuration from updateSettings.
     */

    privatePool.set(_assertThisInitialized(_this), {
      config: void 0
    });
    addClass(_this.handle, 'manualColumnResizer');
    addClass(_this.guide, 'manualColumnResizerGuide');
    return _this;
  }
  /**
   * Checks if the plugin is enabled in the handsontable settings. This method is executed in {@link Hooks#beforeInit}
   * hook and if it returns `true` than the {@link ManualColumnResize#enablePlugin} method is called.
   *
   * @returns {Boolean}
   */


  _createClass(ManualColumnResize, [{
    key: "isEnabled",
    value: function isEnabled() {
      return this.hot.getSettings().manualColumnResize;
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

      this.columnWidthsMap = new IndexToValueMap();
      this.columnWidthsMap.addLocalHook('init', function () {
        return _this2.onMapInit();
      });
      this.hot.columnIndexMapper.registerMap(COLUMN_WIDTHS_MAP_NAME, this.columnWidthsMap);
      this.addHook('modifyColWidth', function (width, col) {
        return _this2.onModifyColWidth(width, col);
      });
      this.addHook('beforeStretchingColumnWidth', function (stretchedWidth, column) {
        return _this2.onBeforeStretchingColumnWidth(stretchedWidth, column);
      });
      this.addHook('beforeColumnResize', function (newSize, column, isDoubleClick) {
        return _this2.onBeforeColumnResize(newSize, column, isDoubleClick);
      });
      this.bindEvents();

      _get(_getPrototypeOf(ManualColumnResize.prototype), "enablePlugin", this).call(this);
    }
    /**
     * Updates the plugin state. This method is executed when {@link Core#updateSettings} is invoked.
     */

  }, {
    key: "updatePlugin",
    value: function updatePlugin() {
      this.disablePlugin();
      this.enablePlugin();

      _get(_getPrototypeOf(ManualColumnResize.prototype), "updatePlugin", this).call(this);
    }
    /**
     * Disables the plugin functionality for this Handsontable instance.
     */

  }, {
    key: "disablePlugin",
    value: function disablePlugin() {
      var priv = privatePool.get(this);
      priv.config = this.columnWidthsMap.getValues();
      this.hot.columnIndexMapper.unregisterMap(COLUMN_WIDTHS_MAP_NAME);

      _get(_getPrototypeOf(ManualColumnResize.prototype), "disablePlugin", this).call(this);
    }
    /**
     * Saves the current sizes using the persistentState plugin (the {@link Options#persistentState} option has to be enabled).
     *
     * @fires Hooks#persistentStateSave
     */

  }, {
    key: "saveManualColumnWidths",
    value: function saveManualColumnWidths() {
      this.hot.runHooks('persistentStateSave', PERSISTENT_STATE_KEY, this.columnWidthsMap.getValues());
    }
    /**
     * Loads the previously saved sizes using the persistentState plugin (the {@link Options#persistentState} option has to be enabled).
     *
     * @returns {Array}
     * @fires Hooks#persistentStateLoad
     */

  }, {
    key: "loadManualColumnWidths",
    value: function loadManualColumnWidths() {
      var storedState = {};
      this.hot.runHooks('persistentStateLoad', PERSISTENT_STATE_KEY, storedState);
      return storedState.value;
    }
    /**
     * Sets the new width for specified column index.
     *
     * @param {Number} column Visual column index.
     * @param {Number} width Column width (no less than 20px).
     * @returns {Number} Returns new width.
     */

  }, {
    key: "setManualSize",
    value: function setManualSize(column, width) {
      var newWidth = Math.max(width, 20);
      var physicalColumn = this.hot.toPhysicalColumn(column);
      this.columnWidthsMap.setValueAtIndex(physicalColumn, newWidth);
      return newWidth;
    }
    /**
     * Clears the cache for the specified column index.
     *
     * @param {Number} column Visual column index.
     */

  }, {
    key: "clearManualSize",
    value: function clearManualSize(column) {
      var physicalColumn = this.hot.toPhysicalColumn(column);
      this.columnWidthsMap.setValueAtIndex(physicalColumn, null);
    }
    /**
     * Callback to call on map's `init` local hook.
     *
     * @private
     */

  }, {
    key: "onMapInit",
    value: function onMapInit() {
      var _this3 = this;

      var priv = privatePool.get(this);
      var initialSetting = this.hot.getSettings().manualColumnResize;
      var loadedManualColumnWidths = this.loadManualColumnWidths();

      if (typeof loadedManualColumnWidths !== 'undefined') {
        this.hot.executeBatchOperations(function () {
          loadedManualColumnWidths.forEach(function (width, index) {
            _this3.columnWidthsMap.setValueAtIndex(index, width);
          });
        });
      } else if (Array.isArray(initialSetting)) {
        this.hot.executeBatchOperations(function () {
          initialSetting.forEach(function (width, index) {
            _this3.columnWidthsMap.setValueAtIndex(index, width);
          });
        });
        priv.config = initialSetting;
      } else if (initialSetting === true && Array.isArray(priv.config)) {
        this.hot.executeBatchOperations(function () {
          priv.config.forEach(function (width, index) {
            _this3.columnWidthsMap.setValueAtIndex(index, width);
          });
        });
      }
    }
    /**
     * Set the resize handle position.
     *
     * @private
     * @param {HTMLCellElement} TH TH HTML element.
     */

  }, {
    key: "setupHandlePosition",
    value: function setupHandlePosition(TH) {
      var _this4 = this;

      if (!TH.parentNode) {
        return false;
      }

      this.currentTH = TH;
      var cellCoords = this.hot.view.wt.wtTable.getCoords(this.currentTH);
      var col = cellCoords.col;
      var headerHeight = outerHeight(this.currentTH);

      if (col >= 0) {
        // if col header
        var box = this.currentTH.getBoundingClientRect();
        var fixedColumn = col < this.hot.getSettings().fixedColumnsLeft;
        var parentOverlay = fixedColumn ? this.hot.view.wt.wtOverlays.topLeftCornerOverlay : this.hot.view.wt.wtOverlays.topOverlay;
        var relativeHeaderPosition = parentOverlay.getRelativeCellPosition(this.currentTH, cellCoords.row, cellCoords.col); // If the TH is not a child of the top/top-left overlay, recalculate using the top-most header

        if (!relativeHeaderPosition) {
          var topMostHeader = parentOverlay.clone.wtTable.THEAD.lastChild.children[+!!this.hot.getSettings().rowHeaders + col];
          relativeHeaderPosition = parentOverlay.getRelativeCellPosition(topMostHeader, cellCoords.row, cellCoords.col);
        }

        this.currentCol = col;
        this.selectedCols = [];

        if (this.hot.selection.isSelected() && this.hot.selection.isSelectedByColumnHeader()) {
          var _this$hot$getSelected = this.hot.getSelectedRangeLast(),
              from = _this$hot$getSelected.from,
              to = _this$hot$getSelected.to;

          var start = from.col;
          var end = to.col;

          if (start >= end) {
            start = to.col;
            end = from.col;
          }

          if (this.currentCol >= start && this.currentCol <= end) {
            rangeEach(start, end, function (i) {
              return _this4.selectedCols.push(i);
            });
          } else {
            this.selectedCols.push(this.currentCol);
          }
        } else {
          this.selectedCols.push(this.currentCol);
        }

        this.startOffset = relativeHeaderPosition.left - 6;
        this.startWidth = parseInt(box.width, 10);
        this.handle.style.top = "".concat(relativeHeaderPosition.top, "px");
        this.handle.style.left = "".concat(this.startOffset + this.startWidth, "px");
        this.handle.style.height = "".concat(headerHeight, "px");
        this.hot.rootElement.appendChild(this.handle);
      }
    }
    /**
     * Refresh the resize handle position.
     *
     * @private
     */

  }, {
    key: "refreshHandlePosition",
    value: function refreshHandlePosition() {
      this.handle.style.left = "".concat(this.startOffset + this.currentWidth, "px");
    }
    /**
     * Sets the resize guide position.
     *
     * @private
     */

  }, {
    key: "setupGuidePosition",
    value: function setupGuidePosition() {
      var handleHeight = parseInt(outerHeight(this.handle), 10);
      var handleBottomPosition = parseInt(this.handle.style.top, 10) + handleHeight;
      var maximumVisibleElementHeight = parseInt(this.hot.view.maximumVisibleElementHeight(0), 10);
      addClass(this.handle, 'active');
      addClass(this.guide, 'active');
      this.guide.style.top = "".concat(handleBottomPosition, "px");
      this.guide.style.left = this.handle.style.left;
      this.guide.style.height = "".concat(maximumVisibleElementHeight - handleHeight, "px");
      this.hot.rootElement.appendChild(this.guide);
    }
    /**
     * Refresh the resize guide position.
     *
     * @private
     */

  }, {
    key: "refreshGuidePosition",
    value: function refreshGuidePosition() {
      this.guide.style.left = this.handle.style.left;
    }
    /**
     * Hides both the resize handle and resize guide.
     *
     * @private
     */

  }, {
    key: "hideHandleAndGuide",
    value: function hideHandleAndGuide() {
      removeClass(this.handle, 'active');
      removeClass(this.guide, 'active');
    }
    /**
     * Checks if provided element is considered a column header.
     *
     * @private
     * @param {HTMLElement} element HTML element.
     * @returns {Boolean}
     */

  }, {
    key: "checkIfColumnHeader",
    value: function checkIfColumnHeader(element) {
      if (element !== this.hot.rootElement) {
        var parent = element.parentNode;

        if (parent.tagName === 'THEAD') {
          return true;
        }

        return this.checkIfColumnHeader(parent);
      }

      return false;
    }
    /**
     * Gets the TH element from the provided element.
     *
     * @private
     * @param {HTMLElement} element HTML element.
     * @returns {HTMLElement}
     */

  }, {
    key: "getTHFromTargetElement",
    value: function getTHFromTargetElement(element) {
      if (element.tagName !== 'TABLE') {
        if (element.tagName === 'TH') {
          return element;
        }

        return this.getTHFromTargetElement(element.parentNode);
      }

      return null;
    }
    /**
     * 'mouseover' event callback - set the handle position.
     *
     * @private
     * @param {MouseEvent} event
     */

  }, {
    key: "onMouseOver",
    value: function onMouseOver(event) {
      if (this.checkIfColumnHeader(event.target)) {
        var th = this.getTHFromTargetElement(event.target);

        if (!th) {
          return;
        }

        var colspan = th.getAttribute('colspan');

        if (th && (colspan === null || colspan === 1)) {
          if (!this.pressed) {
            this.setupHandlePosition(th);
          }
        }
      }
    }
    /**
     * Auto-size row after doubleclick - callback.
     *
     * @private
     * @fires Hooks#beforeColumnResize
     * @fires Hooks#afterColumnResize
     */

  }, {
    key: "afterMouseDownTimeout",
    value: function afterMouseDownTimeout() {
      var _this5 = this;

      var render = function render() {
        _this5.hot.forceFullRender = true;

        _this5.hot.view.render(); // updates all


        _this5.hot.view.wt.wtOverlays.adjustElementsSize(true);
      };

      var resize = function resize(column, forceRender) {
        var hookNewSize = _this5.hot.runHooks('beforeColumnResize', _this5.newSize, column, true);

        if (hookNewSize !== void 0) {
          _this5.newSize = hookNewSize;
        }

        if (_this5.hot.getSettings().stretchH === 'all') {
          _this5.clearManualSize(column);
        } else {
          _this5.setManualSize(column, _this5.newSize); // double click sets by auto row size plugin

        }

        _this5.saveManualColumnWidths();

        _this5.hot.runHooks('afterColumnResize', _this5.newSize, column, true);

        if (forceRender) {
          render();
        }
      };

      if (this.dblclick >= 2) {
        var selectedColsLength = this.selectedCols.length;

        if (selectedColsLength > 1) {
          arrayEach(this.selectedCols, function (selectedCol) {
            resize(selectedCol);
          });
          render();
        } else {
          arrayEach(this.selectedCols, function (selectedCol) {
            resize(selectedCol, true);
          });
        }
      }

      this.dblclick = 0;
      this.autoresizeTimeout = null;
    }
    /**
     * 'mousedown' event callback.
     *
     * @private
     * @param {MouseEvent} event
     */

  }, {
    key: "onMouseDown",
    value: function onMouseDown(event) {
      var _this6 = this;

      if (hasClass(event.target, 'manualColumnResizer')) {
        this.setupGuidePosition();
        this.pressed = this.hot;

        if (this.autoresizeTimeout === null) {
          this.autoresizeTimeout = setTimeout(function () {
            return _this6.afterMouseDownTimeout();
          }, 500);

          this.hot._registerTimeout(this.autoresizeTimeout);
        }

        this.dblclick += 1;
        this.startX = pageX(event);
        this.newSize = this.startWidth;
      }
    }
    /**
     * 'mousemove' event callback - refresh the handle and guide positions, cache the new column width.
     *
     * @private
     * @param {MouseEvent} event
     */

  }, {
    key: "onMouseMove",
    value: function onMouseMove(event) {
      var _this7 = this;

      if (this.pressed) {
        this.currentWidth = this.startWidth + (pageX(event) - this.startX);
        arrayEach(this.selectedCols, function (selectedCol) {
          _this7.newSize = _this7.setManualSize(selectedCol, _this7.currentWidth);
        });
        this.refreshHandlePosition();
        this.refreshGuidePosition();
      }
    }
    /**
     * 'mouseup' event callback - apply the column resizing.
     *
     * @private
     *
     * @fires Hooks#beforeColumnResize
     * @fires Hooks#afterColumnResize
     */

  }, {
    key: "onMouseUp",
    value: function onMouseUp() {
      var _this8 = this;

      var render = function render() {
        _this8.hot.forceFullRender = true;

        _this8.hot.view.render(); // updates all


        _this8.hot.view.wt.wtOverlays.adjustElementsSize(true);
      };

      var resize = function resize(column, forceRender) {
        _this8.hot.runHooks('beforeColumnResize', _this8.newSize, column, false);

        if (forceRender) {
          render();
        }

        _this8.saveManualColumnWidths();

        _this8.hot.runHooks('afterColumnResize', _this8.newSize, column, false);
      };

      if (this.pressed) {
        this.hideHandleAndGuide();
        this.pressed = false;

        if (this.newSize !== this.startWidth) {
          var selectedColsLength = this.selectedCols.length;

          if (selectedColsLength > 1) {
            arrayEach(this.selectedCols, function (selectedCol) {
              resize(selectedCol);
            });
            render();
          } else {
            arrayEach(this.selectedCols, function (selectedCol) {
              resize(selectedCol, true);
            });
          }
        }

        this.setupHandlePosition(this.currentTH);
      }
    }
    /**
     * Binds the mouse events.
     *
     * @private
     */

  }, {
    key: "bindEvents",
    value: function bindEvents() {
      var _this9 = this;

      var _this$hot = this.hot,
          rootWindow = _this$hot.rootWindow,
          rootElement = _this$hot.rootElement;
      this.eventManager.addEventListener(rootElement, 'mouseover', function (e) {
        return _this9.onMouseOver(e);
      });
      this.eventManager.addEventListener(rootElement, 'mousedown', function (e) {
        return _this9.onMouseDown(e);
      });
      this.eventManager.addEventListener(rootWindow, 'mousemove', function (e) {
        return _this9.onMouseMove(e);
      });
      this.eventManager.addEventListener(rootWindow, 'mouseup', function () {
        return _this9.onMouseUp();
      });
    }
    /**
     * Modifies the provided column width, based on the plugin settings
     *
     * @private
     * @param {Number} width Column width.
     * @param {Number} column Visual column index.
     * @returns {Number}
     */

  }, {
    key: "onModifyColWidth",
    value: function onModifyColWidth(width, column) {
      var newWidth = width;

      if (this.enabled) {
        var physicalColumn = this.hot.toPhysicalColumn(column);
        var columnWidth = this.columnWidthsMap.getValueAtIndex(physicalColumn);

        if (this.hot.getSettings().manualColumnResize && columnWidth) {
          newWidth = columnWidth;
        }
      }

      return newWidth;
    }
    /**
     * Modifies the provided column stretched width. This hook decides if specified column should be stretched or not.
     *
     * @private
     * @param {Number} stretchedWidth Stretched width.
     * @param {Number} column Physical column index.
     * @returns {Number}
     */

  }, {
    key: "onBeforeStretchingColumnWidth",
    value: function onBeforeStretchingColumnWidth(stretchedWidth, column) {
      var width = this.columnWidthsMap.getValueAtIndex(column);

      if (width === null) {
        width = stretchedWidth;
      }

      return width;
    }
    /**
     * `beforeColumnResize` hook callback.
     *
     * @private
     */

  }, {
    key: "onBeforeColumnResize",
    value: function onBeforeColumnResize() {
      // clear the header height cache information
      this.hot.view.wt.wtViewport.hasOversizedColumnHeadersMarked = {};
    }
    /**
     * Destroys the plugin instance.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.hot.columnIndexMapper.unregisterMap(COLUMN_WIDTHS_MAP_NAME);

      _get(_getPrototypeOf(ManualColumnResize.prototype), "destroy", this).call(this);
    }
  }]);

  return ManualColumnResize;
}(BasePlugin);

registerPlugin('manualColumnResize', ManualColumnResize);
export default ManualColumnResize;