"use strict";

exports.__esModule = true;
require("core-js/modules/es.array.push.js");
var _base = require("../base");
var _pluginHooks = _interopRequireDefault(require("../../pluginHooks"));
var _array = require("../../helpers/array");
var _element = require("../../helpers/dom/element");
var _number = require("../../helpers/number");
var _eventManager = _interopRequireDefault(require("../../eventManager"));
var _backlight = _interopRequireDefault(require("./ui/backlight"));
var _guideline = _interopRequireDefault(require("./ui/guideline"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_pluginHooks.default.getSingleton().register('beforeColumnMove');
_pluginHooks.default.getSingleton().register('afterColumnMove');
const PLUGIN_KEY = 'manualColumnMove';
exports.PLUGIN_KEY = PLUGIN_KEY;
const PLUGIN_PRIORITY = 120;
exports.PLUGIN_PRIORITY = PLUGIN_PRIORITY;
const privatePool = new WeakMap();
const CSS_PLUGIN = 'ht__manualColumnMove';
const CSS_SHOW_UI = 'show-ui';
const CSS_ON_MOVING = 'on-moving--columns';
const CSS_AFTER_SELECTION = 'after-selection--columns';

/* eslint-disable jsdoc/require-description-complete-sentence */

/**
 * @plugin ManualColumnMove
 * @class ManualColumnMove
 *
 * @description
 * This plugin allows to change columns order. To make columns order persistent the {@link Options#persistentState}
 * plugin should be enabled.
 *
 * API:
 * - `moveColumn` - move single column to the new position.
 * - `moveColumns` - move many columns (as an array of indexes) to the new position.
 * - `dragColumn` - drag single column to the new position.
 * - `dragColumns` - drag many columns (as an array of indexes) to the new position.
 *
 * [Documentation](@/guides/columns/column-moving.md) explain differences between drag and move actions.
 * Please keep in mind that if you want apply visual changes,
 * you have to call manually the `render` method on the instance of Handsontable.
 *
 * The plugin creates additional components to make moving possibly using user interface:
 * - backlight - highlight of selected columns.
 * - guideline - line which shows where columns has been moved.
 *
 * @class ManualColumnMove
 * @plugin ManualColumnMove
 */
class ManualColumnMove extends _base.BasePlugin {
  static get PLUGIN_KEY() {
    return PLUGIN_KEY;
  }
  static get PLUGIN_PRIORITY() {
    return PLUGIN_PRIORITY;
  }
  constructor(hotInstance) {
    super(hotInstance);

    /**
     * Set up WeakMap of plugin to sharing private parameters;.
     */
    privatePool.set(this, {
      columnsToMove: [],
      countCols: 0,
      fixedColumns: 0,
      pressed: void 0,
      target: {
        eventPageX: void 0,
        coords: void 0,
        TD: void 0,
        col: void 0
      },
      cachedDropIndex: void 0
    });

    /**
     * Event Manager object.
     *
     * @private
     * @type {object}
     */
    this.eventManager = new _eventManager.default(this);
    /**
     * Backlight UI object.
     *
     * @private
     * @type {object}
     */
    this.backlight = new _backlight.default(hotInstance);
    /**
     * Guideline UI object.
     *
     * @private
     * @type {object}
     */
    this.guideline = new _guideline.default(hotInstance);
  }

  /**
   * Checks if the plugin is enabled in the handsontable settings. This method is executed in {@link Hooks#beforeInit}
   * hook and if it returns `true` then the {@link ManualColumnMove#enablePlugin} method is called.
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
    this.addHook('beforeOnCellMouseDown', function () {
      return _this.onBeforeOnCellMouseDown(...arguments);
    });
    this.addHook('beforeOnCellMouseOver', function () {
      return _this.onBeforeOnCellMouseOver(...arguments);
    });
    this.addHook('afterScrollVertically', () => this.onAfterScrollVertically());
    this.addHook('afterLoadData', function () {
      return _this.onAfterLoadData(...arguments);
    });
    this.buildPluginUI();
    this.registerEvents();

    // TODO: move adding plugin classname to BasePlugin.
    (0, _element.addClass)(this.hot.rootElement, CSS_PLUGIN);
    super.enablePlugin();
  }

  /**
   * Updates the plugin's state.
   *
   * This method is executed when [`updateSettings()`](@/api/core.md#updatesettings) is invoked with any of the following configuration options:
   *  - [`manualColumnMove`](@/api/options.md#manualcolumnmove)
   */
  updatePlugin() {
    this.disablePlugin();
    this.enablePlugin();
    this.moveBySettingsOrLoad();
    super.updatePlugin();
  }

  /**
   * Disables the plugin functionality for this Handsontable instance.
   */
  disablePlugin() {
    (0, _element.removeClass)(this.hot.rootElement, CSS_PLUGIN);
    this.unregisterEvents();
    this.backlight.destroy();
    this.guideline.destroy();
    super.disablePlugin();
  }

  /**
   * Moves a single column.
   *
   * @param {number} column Visual column index to be moved.
   * @param {number} finalIndex Visual column index, being a start index for the moved columns. Points to where the elements will be placed after the moving action.
   * To check the visualization of the final index, please take a look at [documentation](@/guides/columns/column-moving.md#drag-and-move-actions-of-manualcolumnmove-plugin).
   * @fires Hooks#beforeColumnMove
   * @fires Hooks#afterColumnMove
   * @returns {boolean}
   */
  moveColumn(column, finalIndex) {
    return this.moveColumns([column], finalIndex);
  }

  /**
   * Moves a multiple columns.
   *
   * @param {Array} columns Array of visual column indexes to be moved.
   * @param {number} finalIndex Visual column index, being a start index for the moved columns. Points to where the elements will be placed after the moving action.
   * To check the visualization of the final index, please take a look at [documentation](@/guides/columns/column-moving.md#drag-and-move-actions-of-manualcolumnmove-plugin).
   * @fires Hooks#beforeColumnMove
   * @fires Hooks#afterColumnMove
   * @returns {boolean}
   */
  moveColumns(columns, finalIndex) {
    const priv = privatePool.get(this);
    const dropIndex = priv.cachedDropIndex;
    const movePossible = this.isMovePossible(columns, finalIndex);
    const beforeMoveHook = this.hot.runHooks('beforeColumnMove', columns, finalIndex, dropIndex, movePossible);
    priv.cachedDropIndex = void 0;
    if (beforeMoveHook === false) {
      return;
    }
    if (movePossible) {
      this.hot.columnIndexMapper.moveIndexes(columns, finalIndex);
    }
    const movePerformed = movePossible && this.isColumnOrderChanged(columns, finalIndex);
    this.hot.runHooks('afterColumnMove', columns, finalIndex, dropIndex, movePossible, movePerformed);
    return movePerformed;
  }

  /**
   * Drag a single column to drop index position.
   *
   * @param {number} column Visual column index to be dragged.
   * @param {number} dropIndex Visual column index, being a drop index for the moved columns. Points to where we are going to drop the moved elements.
   * To check visualization of drop index please take a look at [documentation](@/guides/columns/column-moving.md#drag-and-move-actions-of-manualcolumnmove-plugin).
   * @fires Hooks#beforeColumnMove
   * @fires Hooks#afterColumnMove
   * @returns {boolean}
   */
  dragColumn(column, dropIndex) {
    return this.dragColumns([column], dropIndex);
  }

  /**
   * Drag multiple columns to drop index position.
   *
   * @param {Array} columns Array of visual column indexes to be dragged.
   * @param {number} dropIndex Visual column index, being a drop index for the moved columns. Points to where we are going to drop the moved elements.
   * To check visualization of drop index please take a look at [documentation](@/guides/columns/column-moving.md#drag-and-move-actions-of-manualcolumnmove-plugin).
   * @fires Hooks#beforeColumnMove
   * @fires Hooks#afterColumnMove
   * @returns {boolean}
   */
  dragColumns(columns, dropIndex) {
    const finalIndex = this.countFinalIndex(columns, dropIndex);
    const priv = privatePool.get(this);
    priv.cachedDropIndex = dropIndex;
    return this.moveColumns(columns, finalIndex);
  }

  /**
   * Indicates if it's possible to move columns to the desired position. Some of the actions aren't
   * possible, i.e. You can’t move more than one element to the last position.
   *
   * @param {Array} movedColumns Array of visual column indexes to be moved.
   * @param {number} finalIndex Visual column index, being a start index for the moved columns. Points to where the elements will be placed after the moving action.
   * To check the visualization of the final index, please take a look at [documentation](@/guides/columns/column-moving.md#drag-and-move-actions-of-manualcolumnmove-plugin).
   * @returns {boolean}
   */
  isMovePossible(movedColumns, finalIndex) {
    const length = this.hot.columnIndexMapper.getNotTrimmedIndexesLength();

    // An attempt to transfer more columns to start destination than is possible (only when moving from the top to the bottom).
    const tooHighDestinationIndex = movedColumns.length + finalIndex > length;
    const tooLowDestinationIndex = finalIndex < 0;
    const tooLowMovedColumnIndex = movedColumns.some(movedColumn => movedColumn < 0);
    const tooHighMovedColumnIndex = movedColumns.some(movedColumn => movedColumn >= length);
    if (tooHighDestinationIndex || tooLowDestinationIndex || tooLowMovedColumnIndex || tooHighMovedColumnIndex) {
      return false;
    }
    return true;
  }

  /**
   * Indicates if order of columns was changed.
   *
   * @private
   * @param {Array} movedColumns Array of visual column indexes to be moved.
   * @param {number} finalIndex Visual column index, being a start index for the moved columns. Points to where the elements will be placed after the moving action.
   * To check the visualization of the final index, please take a look at [documentation](@/guides/columns/column-moving.md#drag-and-move-actions-of-manualcolumnmove-plugin).
   * @returns {boolean}
   */
  isColumnOrderChanged(movedColumns, finalIndex) {
    return movedColumns.some((column, nrOfMovedElement) => column - nrOfMovedElement !== finalIndex);
  }

  /**
   * Count the final column index from the drop index.
   *
   * @private
   * @param {Array} movedColumns Array of visual column indexes to be moved.
   * @param {number} dropIndex Visual column index, being a drop index for the moved columns.
   * @returns {number} Visual column index, being a start index for the moved columns.
   */
  countFinalIndex(movedColumns, dropIndex) {
    const numberOfColumnsLowerThanDropIndex = (0, _array.arrayReduce)(movedColumns, (numberOfColumns, currentColumnIndex) => {
      if (currentColumnIndex < dropIndex) {
        numberOfColumns += 1;
      }
      return numberOfColumns;
    }, 0);
    return dropIndex - numberOfColumnsLowerThanDropIndex;
  }

  /**
   * Gets the sum of the widths of columns in the provided range.
   *
   * @private
   * @param {number} fromColumn Visual column index.
   * @param {number} toColumn Visual column index.
   * @returns {number}
   */
  getColumnsWidth(fromColumn, toColumn) {
    const columnMapper = this.hot.columnIndexMapper;
    let columnsWidth = 0;
    for (let visualColumnIndex = fromColumn; visualColumnIndex <= toColumn; visualColumnIndex += 1) {
      // We can't use just `getColWidth` (even without indexes translation) as it doesn't return proper values
      // when column is stretched.
      const renderableIndex = columnMapper.getRenderableFromVisualIndex(visualColumnIndex);
      if (visualColumnIndex < 0) {
        columnsWidth += this.hot.view._wt.wtViewport.getRowHeaderWidth() || 0;
      } else if (renderableIndex !== null) {
        columnsWidth += this.hot.view._wt.wtTable.getStretchedColumnWidth(renderableIndex) || 0;
      }
    }
    return columnsWidth;
  }

  /**
   * Loads initial settings when persistent state is saved or when plugin was initialized as an array.
   *
   * @private
   */
  moveBySettingsOrLoad() {
    const pluginSettings = this.hot.getSettings()[PLUGIN_KEY];
    if (Array.isArray(pluginSettings)) {
      this.moveColumns(pluginSettings, 0);
    } else if (pluginSettings !== void 0) {
      const persistentState = this.persistentStateLoad();
      if (persistentState.length) {
        this.moveColumns(persistentState, 0);
      }
    }
  }

  /**
   * Checks if the provided column is in the fixedColumnsTop section.
   *
   * @private
   * @param {number} column Visual column index to check.
   * @returns {boolean}
   */
  isFixedColumnsStart(column) {
    return column < this.hot.getSettings().fixedColumnsStart;
  }

  /**
   * Saves the manual column positions to the persistent state (the {@link Options#persistentState} option has to be enabled).
   *
   * @private
   * @fires Hooks#persistentStateSave
   */
  persistentStateSave() {
    this.hot.runHooks('persistentStateSave', 'manualColumnMove', this.hot.columnIndexMapper.getIndexesSequence()); // The `PersistentState` plugin should be refactored.
  }

  /**
   * Loads the manual column positions from the persistent state (the {@link Options#persistentState} option has to be enabled).
   *
   * @private
   * @fires Hooks#persistentStateLoad
   * @returns {Array} Stored state.
   */
  persistentStateLoad() {
    const storedState = {};
    this.hot.runHooks('persistentStateLoad', 'manualColumnMove', storedState);
    return storedState.value ? storedState.value : [];
  }

  /**
   * Prepares an array of indexes based on actual selection.
   *
   * @private
   * @param {number} start The start index.
   * @param {number} end The end index.
   * @returns {Array}
   */
  prepareColumnsToMoving(start, end) {
    const selectedColumns = [];
    (0, _number.rangeEach)(start, end, i => {
      selectedColumns.push(i);
    });
    return selectedColumns;
  }

  /**
   * Update the UI visual position.
   *
   * @private
   */
  refreshPositions() {
    const priv = privatePool.get(this);
    const firstVisible = this.hot.view.getFirstFullyVisibleColumn();
    if (this.isFixedColumnsStart(priv.hoveredColumn) && firstVisible > 0) {
      this.hot.scrollViewportTo(void 0, this.hot.columnIndexMapper.getNearestNotHiddenIndex(firstVisible - 1, -1));
    }
    const wtTable = this.hot.view._wt.wtTable;
    const scrollableElement = this.hot.view._wt.wtOverlays.scrollableElement;
    const scrollStart = typeof scrollableElement.scrollX === 'number' ? scrollableElement.scrollX : scrollableElement.scrollLeft;
    let tdOffsetStart = this.hot.view.THEAD.offsetLeft + this.getColumnsWidth(0, priv.hoveredColumn - 1);
    const hiderWidth = wtTable.hider.offsetWidth;
    const tbodyOffsetLeft = wtTable.TBODY.offsetLeft;
    const backlightElemMarginStart = this.backlight.getOffset().start;
    const backlightElemWidth = this.backlight.getSize().width;
    let rowHeaderWidth = 0;
    let mouseOffsetStart = 0;
    if (this.hot.isRtl()) {
      const rootWindow = this.hot.rootWindow;
      const containerWidth = (0, _element.outerWidth)(this.hot.rootElement);
      const gridMostRightPos = rootWindow.innerWidth - priv.rootElementOffset - containerWidth;
      mouseOffsetStart = rootWindow.innerWidth - priv.target.eventPageX - gridMostRightPos - (scrollableElement.scrollX === void 0 ? scrollStart : 0);
    } else {
      mouseOffsetStart = priv.target.eventPageX - (priv.rootElementOffset - (scrollableElement.scrollX === void 0 ? scrollStart : 0));
    }
    if (priv.hasRowHeaders) {
      rowHeaderWidth = this.hot.view._wt.wtOverlays.inlineStartOverlay.clone.wtTable.getColumnHeader(-1).offsetWidth;
    }
    if (this.isFixedColumnsStart(priv.hoveredColumn)) {
      tdOffsetStart += scrollStart;
    }
    tdOffsetStart += rowHeaderWidth;
    if (priv.hoveredColumn < 0) {
      // if hover on rowHeader
      if (priv.fixedColumnsStart > 0) {
        priv.target.col = 0;
      } else {
        priv.target.col = firstVisible > 0 ? firstVisible - 1 : firstVisible;
      }
    } else if (priv.target.TD.offsetWidth / 2 + tdOffsetStart <= mouseOffsetStart) {
      const newCoordsCol = priv.hoveredColumn >= priv.countCols ? priv.countCols - 1 : priv.hoveredColumn;

      // if hover on right part of TD
      priv.target.col = newCoordsCol + 1;
      // unfortunately first column is bigger than rest
      tdOffsetStart += priv.target.TD.offsetWidth;
    } else {
      // elsewhere on table
      priv.target.col = priv.hoveredColumn;
    }
    let backlightStart = mouseOffsetStart;
    let guidelineStart = tdOffsetStart;
    if (mouseOffsetStart + backlightElemWidth + backlightElemMarginStart >= hiderWidth) {
      // prevent display backlight on the right side of the table
      backlightStart = hiderWidth - backlightElemWidth - backlightElemMarginStart;
    } else if (mouseOffsetStart + backlightElemMarginStart < tbodyOffsetLeft + rowHeaderWidth) {
      // prevent display backlight on the left side of the table
      backlightStart = tbodyOffsetLeft + rowHeaderWidth + Math.abs(backlightElemMarginStart);
    }
    if (tdOffsetStart >= hiderWidth - 1) {
      // prevent display guideline outside the table
      guidelineStart = hiderWidth - 1;
    } else if (guidelineStart === 0) {
      // guideline has got `margin-left: -1px` as default
      guidelineStart = 1;
    } else if (scrollableElement.scrollX !== void 0 && priv.hoveredColumn < priv.fixedColumnsStart) {
      guidelineStart -= priv.rootElementOffset <= scrollableElement.scrollX ? priv.rootElementOffset : 0;
    }
    this.backlight.setPosition(null, backlightStart);
    this.guideline.setPosition(null, guidelineStart);
  }

  /**
   * Binds the events used by the plugin.
   *
   * @private
   */
  registerEvents() {
    const {
      documentElement
    } = this.hot.rootDocument;
    this.eventManager.addEventListener(documentElement, 'mousemove', event => this.onMouseMove(event));
    this.eventManager.addEventListener(documentElement, 'mouseup', () => this.onMouseUp());
  }

  /**
   * Unbinds the events used by the plugin.
   *
   * @private
   */
  unregisterEvents() {
    this.eventManager.clear();
  }

  /**
   * Change the behavior of selection / dragging.
   *
   * @private
   * @param {MouseEvent} event `mousedown` event properties.
   * @param {CellCoords} coords Visual cell coordinates where was fired event.
   * @param {HTMLElement} TD Cell represented as HTMLElement.
   * @param {object} controller An object with properties `row`, `column` and `cell`. Each property contains
   *                            a boolean value that allows or disallows changing the selection for that particular area.
   */
  onBeforeOnCellMouseDown(event, coords, TD, controller) {
    const wtTable = this.hot.view._wt.wtTable;
    const isHeaderSelection = this.hot.selection.isSelectedByColumnHeader();
    const selection = this.hot.getSelectedRangeLast();
    const priv = privatePool.get(this);
    // This block action shouldn't be handled below.
    const isSortingElement = (0, _element.hasClass)(event.target, 'sortAction');
    if (!selection || !isHeaderSelection || priv.pressed || event.button !== 0 || isSortingElement) {
      priv.pressed = false;
      priv.columnsToMove.length = 0;
      (0, _element.removeClass)(this.hot.rootElement, [CSS_ON_MOVING, CSS_SHOW_UI]);
      return;
    }
    const guidelineIsNotReady = this.guideline.isBuilt() && !this.guideline.isAppended();
    const backlightIsNotReady = this.backlight.isBuilt() && !this.backlight.isAppended();
    if (guidelineIsNotReady && backlightIsNotReady) {
      this.guideline.appendTo(wtTable.hider);
      this.backlight.appendTo(wtTable.hider);
    }
    const {
      from,
      to
    } = selection;
    const start = Math.min(from.col, to.col);
    const end = Math.max(from.col, to.col);
    if (coords.row < 0 && coords.col >= start && coords.col <= end) {
      controller.column = true;
      priv.pressed = true;
      priv.target.eventPageX = event.pageX;
      priv.target.eventOffsetX = event.offsetX;
      priv.hoveredColumn = coords.col;
      priv.target.TD = TD;
      priv.target.col = coords.col;
      priv.columnsToMove = this.prepareColumnsToMoving(start, end);
      priv.hasRowHeaders = !!this.hot.getSettings().rowHeaders;
      priv.countCols = this.hot.countCols();
      priv.fixedColumnsStart = this.hot.getSettings().fixedColumnsStart;
      priv.rootElementOffset = (0, _element.offset)(this.hot.rootElement).left;
      const countColumnsFrom = priv.hasRowHeaders ? -1 : 0;
      const topPos = wtTable.holder.scrollTop + wtTable.getColumnHeaderHeight(0) + 1;
      const fixedColumnsStart = coords.col < priv.fixedColumnsStart;
      const horizontalScrollPosition = Math.abs(this.hot.view._wt.wtOverlays.inlineStartOverlay.getScrollPosition());
      const offsetX = Math.abs(event.offsetX - (this.hot.isRtl() ? event.target.offsetWidth : 0));
      const inlineOffset = this.getColumnsWidth(start, coords.col - 1) + offsetX;
      const inlinePos = this.getColumnsWidth(countColumnsFrom, start - 1) + (fixedColumnsStart ? horizontalScrollPosition : 0) + inlineOffset;
      this.backlight.setPosition(topPos, inlinePos);
      this.backlight.setSize(this.getColumnsWidth(start, end), wtTable.hider.offsetHeight - topPos);
      this.backlight.setOffset(null, -inlineOffset);
      (0, _element.addClass)(this.hot.rootElement, CSS_ON_MOVING);
    } else {
      (0, _element.removeClass)(this.hot.rootElement, CSS_AFTER_SELECTION);
      priv.pressed = false;
      priv.columnsToMove.length = 0;
    }
  }

  /**
   * 'mouseMove' event callback. Fired when pointer move on document.documentElement.
   *
   * @private
   * @param {MouseEvent} event `mousemove` event properties.
   */
  onMouseMove(event) {
    const priv = privatePool.get(this);
    if (!priv.pressed) {
      return;
    }

    // callback for browser which doesn't supports CSS pointer-event: none
    if (event.target === this.backlight.element) {
      const width = this.backlight.getSize().width;
      this.backlight.setSize(0);
      setTimeout(function () {
        this.backlight.setPosition(width);
      });
    }
    priv.target.eventPageX = event.pageX;
    this.refreshPositions();
  }

  /**
   * 'beforeOnCellMouseOver' hook callback. Fired when pointer was over cell.
   *
   * @private
   * @param {MouseEvent} event `mouseover` event properties.
   * @param {CellCoords} coords Visual cell coordinates where was fired event.
   * @param {HTMLElement} TD Cell represented as HTMLElement.
   * @param {object} controller An object with properties `row`, `column` and `cell`. Each property contains
   *                            a boolean value that allows or disallows changing the selection for that particular area.
   */
  onBeforeOnCellMouseOver(event, coords, TD, controller) {
    const selectedRange = this.hot.getSelectedRangeLast();
    const priv = privatePool.get(this);
    if (!selectedRange || !priv.pressed) {
      return;
    }
    if (priv.columnsToMove.indexOf(coords.col) > -1) {
      (0, _element.removeClass)(this.hot.rootElement, CSS_SHOW_UI);
    } else {
      (0, _element.addClass)(this.hot.rootElement, CSS_SHOW_UI);
    }
    controller.row = true;
    controller.column = true;
    controller.cell = true;
    priv.hoveredColumn = coords.col;
    priv.target.TD = TD;
  }

  /**
   * `onMouseUp` hook callback.
   *
   * @private
   */
  onMouseUp() {
    const priv = privatePool.get(this);
    const target = priv.target.col;
    const columnsLen = priv.columnsToMove.length;
    priv.hoveredColumn = void 0;
    priv.pressed = false;
    priv.backlightWidth = 0;
    (0, _element.removeClass)(this.hot.rootElement, [CSS_ON_MOVING, CSS_SHOW_UI, CSS_AFTER_SELECTION]);
    if (this.hot.selection.isSelectedByColumnHeader()) {
      (0, _element.addClass)(this.hot.rootElement, CSS_AFTER_SELECTION);
    }
    if (columnsLen < 1 || target === void 0) {
      return;
    }
    const firstMovedVisualColumn = priv.columnsToMove[0];
    const firstMovedPhysicalColumn = this.hot.toPhysicalColumn(firstMovedVisualColumn);
    const movePerformed = this.dragColumns(priv.columnsToMove, target);
    priv.columnsToMove.length = 0;
    if (movePerformed === true) {
      this.persistentStateSave();
      this.hot.render();
      this.hot.view.adjustElementsSize(true);
      const selectionStart = this.hot.toVisualColumn(firstMovedPhysicalColumn);
      const selectionEnd = selectionStart + columnsLen - 1;
      this.hot.selectColumns(selectionStart, selectionEnd);
    }
  }

  /**
   * `afterScrollHorizontally` hook callback. Fired the table was scrolled horizontally.
   *
   * @private
   */
  onAfterScrollVertically() {
    const wtTable = this.hot.view._wt.wtTable;
    const headerHeight = wtTable.getColumnHeaderHeight(0) + 1;
    const scrollTop = wtTable.holder.scrollTop;
    const posTop = headerHeight + scrollTop;
    this.backlight.setPosition(posTop);
    this.backlight.setSize(null, wtTable.hider.offsetHeight - posTop);
  }

  /**
   * Builds the plugin's UI.
   *
   * @private
   */
  buildPluginUI() {
    this.backlight.build();
    this.guideline.build();
  }

  /**
   * Callback for the `afterLoadData` hook.
   *
   * @private
   */
  onAfterLoadData() {
    this.moveBySettingsOrLoad();
  }

  /**
   * Destroys the plugin instance.
   */
  destroy() {
    this.backlight.destroy();
    this.guideline.destroy();
    super.destroy();
  }
}
exports.ManualColumnMove = ManualColumnMove;