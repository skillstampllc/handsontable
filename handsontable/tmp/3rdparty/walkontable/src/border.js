"use strict";

exports.__esModule = true;
var _element = require("../../../helpers/dom/element");
var _event = require("../../../helpers/dom/event");
var _object = require("../../../helpers/object");
var _browser = require("../../../helpers/browser");
/**
 *
 */
class Border {
  // TODO As this is an internal class, should be designed for using {Walkontable}. It uses the facade,
  // TODO Con. Because the class is created on place where the instance reference comes from external origin.
  // TODO Imho, the discrimination for handling both, facade and non-facade should be handled.
  /**
   * @param {WalkontableFacade} wotInstance The Walkontable instance.
   * @param {object} settings The border settings.
   */
  constructor(wotInstance, settings) {
    if (!settings) {
      return;
    }
    this.eventManager = wotInstance.eventManager;
    this.instance = wotInstance;
    this.wot = wotInstance;
    this.settings = settings;
    this.mouseDown = false;
    this.main = null;
    this.top = null;
    this.bottom = null;
    this.start = null;
    this.end = null;
    this.topStyle = null;
    this.bottomStyle = null;
    this.startStyle = null;
    this.endStyle = null;
    this.cornerDefaultStyle = {
      width: '6px',
      height: '6px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#FFF'
    };
    // Offset to moving the corner to be centered relative to the grid.
    this.cornerCenterPointOffset = -(parseInt(this.cornerDefaultStyle.width, 10) / 2);
    this.corner = null;
    this.cornerStyle = null;
    this.createBorders(settings);
    this.registerListeners();
  }

  /**
   * Register all necessary events.
   */
  registerListeners() {
    const documentBody = this.wot.rootDocument.body;
    this.eventManager.addEventListener(documentBody, 'mousedown', () => this.onMouseDown());
    this.eventManager.addEventListener(documentBody, 'mouseup', () => this.onMouseUp());
    for (let c = 0, len = this.main.childNodes.length; c < len; c++) {
      const element = this.main.childNodes[c];
      this.eventManager.addEventListener(element, 'mouseenter', event => this.onMouseEnter(event, this.main.childNodes[c]));
    }
  }

  /**
   * Mouse down listener.
   *
   * @private
   */
  onMouseDown() {
    this.mouseDown = true;
  }

  /**
   * Mouse up listener.
   *
   * @private
   */
  onMouseUp() {
    this.mouseDown = false;
  }

  /**
   * Mouse enter listener for fragment selection functionality.
   *
   * @private
   * @param {Event} event Dom event.
   * @param {HTMLElement} parentElement Part of border element.
   */
  onMouseEnter(event, parentElement) {
    if (!this.mouseDown || !this.wot.getSetting('hideBorderOnMouseDownOver')) {
      return;
    }
    event.preventDefault();
    (0, _event.stopImmediatePropagation)(event);
    const _this = this;
    const documentBody = this.wot.rootDocument.body;
    const bounds = parentElement.getBoundingClientRect();

    // Hide border to prevents selection jumping when fragmentSelection is enabled.
    parentElement.style.display = 'none';

    /**
     * @param {Event} mouseEvent The mouse event object.
     * @returns {boolean}
     */
    function isOutside(mouseEvent) {
      if (mouseEvent.clientY < Math.floor(bounds.top)) {
        return true;
      }
      if (mouseEvent.clientY > Math.ceil(bounds.top + bounds.height)) {
        return true;
      }
      if (mouseEvent.clientX < Math.floor(bounds.left)) {
        return true;
      }
      if (mouseEvent.clientX > Math.ceil(bounds.left + bounds.width)) {
        return true;
      }
    }

    /**
     * @param {Event} handlerEvent The mouse event object.
     */
    function handler(handlerEvent) {
      if (isOutside(handlerEvent)) {
        _this.eventManager.removeEventListener(documentBody, 'mousemove', handler);
        parentElement.style.display = 'block';
      }
    }
    this.eventManager.addEventListener(documentBody, 'mousemove', handler);
  }

  /**
   * Create border elements.
   *
   * @param {object} settings The border settings.
   */
  createBorders(settings) {
    const {
      rootDocument
    } = this.wot;
    this.main = rootDocument.createElement('div');
    const borderDivs = ['top', 'start', 'bottom', 'end', 'corner'];
    let style = this.main.style;
    style.position = 'absolute';
    style.top = 0;
    style.left = 0;
    for (let i = 0; i < 5; i++) {
      const position = borderDivs[i];
      const div = rootDocument.createElement('div');
      div.className = `wtBorder ${this.settings.className || ''}`; // + borderDivs[i];

      if (this.settings[position] && this.settings[position].hide) {
        div.className += ' hidden';
      }
      style = div.style;
      style.backgroundColor = this.settings[position] && this.settings[position].color ? this.settings[position].color : settings.border.color;
      style.height = this.settings[position] && this.settings[position].width ? `${this.settings[position].width}px` : `${settings.border.width}px`;
      style.width = this.settings[position] && this.settings[position].width ? `${this.settings[position].width}px` : `${settings.border.width}px`;
      this.main.appendChild(div);
    }
    this.top = this.main.childNodes[0];
    this.start = this.main.childNodes[1];
    this.bottom = this.main.childNodes[2];
    this.end = this.main.childNodes[3];
    this.topStyle = this.top.style;
    this.startStyle = this.start.style;
    this.bottomStyle = this.bottom.style;
    this.endStyle = this.end.style;
    this.corner = this.main.childNodes[4];
    this.corner.className += ' corner';
    this.cornerStyle = this.corner.style;
    this.cornerStyle.width = this.cornerDefaultStyle.width;
    this.cornerStyle.height = this.cornerDefaultStyle.height;
    this.cornerStyle.border = [this.cornerDefaultStyle.borderWidth, this.cornerDefaultStyle.borderStyle, this.cornerDefaultStyle.borderColor].join(' ');
    if ((0, _browser.isMobileBrowser)()) {
      this.createMultipleSelectorHandles();
    }
    this.disappear();
    const {
      wtTable
    } = this.wot;
    let bordersHolder = wtTable.bordersHolder;
    if (!bordersHolder) {
      bordersHolder = rootDocument.createElement('div');
      bordersHolder.className = 'htBorders';
      wtTable.bordersHolder = bordersHolder;
      wtTable.spreader.appendChild(bordersHolder);
    }
    bordersHolder.appendChild(this.main);
  }

  /**
   * Create multiple selector handler for mobile devices.
   */
  createMultipleSelectorHandles() {
    const {
      rootDocument
    } = this.wot;
    this.selectionHandles = {
      top: rootDocument.createElement('DIV'),
      topHitArea: rootDocument.createElement('DIV'),
      bottom: rootDocument.createElement('DIV'),
      bottomHitArea: rootDocument.createElement('DIV')
    };
    const width = 10;
    const hitAreaWidth = 40;
    this.selectionHandles.top.className = 'topSelectionHandle topLeftSelectionHandle';
    this.selectionHandles.topHitArea.className = 'topSelectionHandle-HitArea topLeftSelectionHandle-HitArea';
    this.selectionHandles.bottom.className = 'bottomSelectionHandle bottomRightSelectionHandle';
    this.selectionHandles.bottomHitArea.className = 'bottomSelectionHandle-HitArea bottomRightSelectionHandle-HitArea';
    this.selectionHandles.styles = {
      top: this.selectionHandles.top.style,
      topHitArea: this.selectionHandles.topHitArea.style,
      bottom: this.selectionHandles.bottom.style,
      bottomHitArea: this.selectionHandles.bottomHitArea.style
    };
    const hitAreaStyle = {
      position: 'absolute',
      height: `${hitAreaWidth}px`,
      width: `${hitAreaWidth}px`,
      'border-radius': `${parseInt(hitAreaWidth / 1.5, 10)}px`
    };
    (0, _object.objectEach)(hitAreaStyle, (value, key) => {
      this.selectionHandles.styles.bottomHitArea[key] = value;
      this.selectionHandles.styles.topHitArea[key] = value;
    });
    const handleStyle = {
      position: 'absolute',
      height: `${width}px`,
      width: `${width}px`,
      'border-radius': `${parseInt(width / 1.5, 10)}px`,
      background: '#F5F5FF',
      border: '1px solid #4285c8'
    };
    (0, _object.objectEach)(handleStyle, (value, key) => {
      this.selectionHandles.styles.bottom[key] = value;
      this.selectionHandles.styles.top[key] = value;
    });
    this.main.appendChild(this.selectionHandles.top);
    this.main.appendChild(this.selectionHandles.bottom);
    this.main.appendChild(this.selectionHandles.topHitArea);
    this.main.appendChild(this.selectionHandles.bottomHitArea);
  }

  /**
   * @param {number} row The visual row index.
   * @param {number} col The visual column index.
   * @returns {boolean}
   */
  isPartRange(row, col) {
    const areaSelection = this.wot.selections.createOrGetArea();
    if (areaSelection.cellRange) {
      if (row !== areaSelection.cellRange.to.row || col !== areaSelection.cellRange.to.col) {
        return true;
      }
    }
    return false;
  }

  /**
   * @param {number} row The visual row index.
   * @param {number} col The visual column index.
   * @param {number} top The top position of the handler.
   * @param {number} left The left position of the handler.
   * @param {number} width The width of the handler.
   * @param {number} height The height of the handler.
   */
  updateMultipleSelectionHandlesPosition(row, col, top, left, width, height) {
    const isRtl = this.wot.wtSettings.getSetting('rtlMode');
    const inlinePosProperty = isRtl ? 'right' : 'left';
    const {
      top: topStyles,
      topHitArea: topHitAreaStyles,
      bottom: bottomStyles,
      bottomHitArea: bottomHitAreaStyles
    } = this.selectionHandles.styles;
    const handleBorderSize = parseInt(topStyles.borderWidth, 10);
    const handleSize = parseInt(topStyles.width, 10);
    const hitAreaSize = parseInt(topHitAreaStyles.width, 10);
    const totalTableWidth = this.wot.wtTable.getWidth();
    const totalTableHeight = this.wot.wtTable.getHeight();
    topStyles.top = `${parseInt(top - handleSize - 1, 10)}px`;
    topStyles[inlinePosProperty] = `${parseInt(left - handleSize - 1, 10)}px`;
    topHitAreaStyles.top = `${parseInt(top - hitAreaSize / 4 * 3, 10)}px`;
    topHitAreaStyles[inlinePosProperty] = `${parseInt(left - hitAreaSize / 4 * 3, 10)}px`;
    const bottomHandlerInline = Math.min(parseInt(left + width, 10), totalTableWidth - handleSize - handleBorderSize * 2);
    const bottomHandlerAreaInline = Math.min(parseInt(left + width - hitAreaSize / 4, 10), totalTableWidth - hitAreaSize - handleBorderSize * 2);
    bottomStyles[inlinePosProperty] = `${bottomHandlerInline}px`;
    bottomHitAreaStyles[inlinePosProperty] = `${bottomHandlerAreaInline}px`;
    const bottomHandlerTop = Math.min(parseInt(top + height, 10), totalTableHeight - handleSize - handleBorderSize * 2);
    const bottomHandlerAreaTop = Math.min(parseInt(top + height - hitAreaSize / 4, 10), totalTableHeight - hitAreaSize - handleBorderSize * 2);
    bottomStyles.top = `${bottomHandlerTop}px`;
    bottomHitAreaStyles.top = `${bottomHandlerAreaTop}px`;
    if (this.settings.border.cornerVisible && this.settings.border.cornerVisible()) {
      topStyles.display = 'block';
      topHitAreaStyles.display = 'block';
      if (this.isPartRange(row, col)) {
        bottomStyles.display = 'none';
        bottomHitAreaStyles.display = 'none';
      } else {
        bottomStyles.display = 'block';
        bottomHitAreaStyles.display = 'block';
      }
    } else {
      topStyles.display = 'none';
      bottomStyles.display = 'none';
      topHitAreaStyles.display = 'none';
      bottomHitAreaStyles.display = 'none';
    }
    if (row === this.wot.wtSettings.getSetting('fixedRowsTop') || col === this.wot.wtSettings.getSetting('fixedColumnsStart')) {
      topStyles.zIndex = '9999';
      topHitAreaStyles.zIndex = '9999';
    } else {
      topStyles.zIndex = '';
      topHitAreaStyles.zIndex = '';
    }
  }

  /**
   * Show border around one or many cells.
   *
   * @param {Array} corners The corner coordinates.
   */
  appear(corners) {
    if (this.disabled) {
      return;
    }
    const {
      wtTable,
      rootDocument,
      rootWindow
    } = this.wot; // todo refactoring: consider about using internal facade (it is given by external code)
    let fromRow;
    let toRow;
    let fromColumn;
    let toColumn;
    let rowHeader;
    let columnHeader;
    const rowsCount = wtTable.getRenderedRowsCount();
    for (let i = 0; i < rowsCount; i += 1) {
      const s = wtTable.rowFilter.renderedToSource(i);
      if (s >= corners[0] && s <= corners[2]) {
        fromRow = s;
        rowHeader = corners[0];
        break;
      }
    }
    for (let i = rowsCount - 1; i >= 0; i -= 1) {
      const s = wtTable.rowFilter.renderedToSource(i);
      if (s >= corners[0] && s <= corners[2]) {
        toRow = s;
        break;
      }
    }
    const columnsCount = wtTable.getRenderedColumnsCount();
    for (let i = 0; i < columnsCount; i += 1) {
      const s = wtTable.columnFilter.renderedToSource(i);
      if (s >= corners[1] && s <= corners[3]) {
        fromColumn = s;
        columnHeader = corners[1];
        break;
      }
    }
    for (let i = columnsCount - 1; i >= 0; i -= 1) {
      const s = wtTable.columnFilter.renderedToSource(i);
      if (s >= corners[1] && s <= corners[3]) {
        toColumn = s;
        break;
      }
    }
    if (fromRow === void 0 || fromColumn === void 0) {
      this.disappear();
      return;
    }
    let fromTD = wtTable.getCell(this.wot.createCellCoords(fromRow, fromColumn));
    const isMultiple = fromRow !== toRow || fromColumn !== toColumn;
    const toTD = isMultiple ? wtTable.getCell(this.wot.createCellCoords(toRow, toColumn)) : fromTD;
    const fromOffset = (0, _element.offset)(fromTD);
    const toOffset = isMultiple ? (0, _element.offset)(toTD) : fromOffset;
    const containerOffset = (0, _element.offset)(wtTable.TABLE);
    const containerWidth = (0, _element.outerWidth)(wtTable.TABLE);
    const minTop = fromOffset.top;
    const minLeft = fromOffset.left;
    const isRtl = this.wot.wtSettings.getSetting('rtlMode');
    let inlineStartPos = 0;
    let width = 0;
    if (isRtl) {
      const fromWidth = (0, _element.outerWidth)(fromTD);
      const gridRightPos = rootWindow.innerWidth - containerOffset.left - containerWidth;
      width = minLeft + fromWidth - toOffset.left;
      inlineStartPos = rootWindow.innerWidth - minLeft - fromWidth - gridRightPos - 1;
    } else {
      width = toOffset.left + (0, _element.outerWidth)(toTD) - minLeft;
      inlineStartPos = minLeft - containerOffset.left - 1;
    }
    if (this.isEntireColumnSelected(fromRow, toRow)) {
      const modifiedValues = this.getDimensionsFromHeader('columns', fromColumn, toColumn, rowHeader, containerOffset);
      let fromTH = null;
      if (modifiedValues) {
        [fromTH, inlineStartPos, width] = modifiedValues;
      }
      if (fromTH) {
        fromTD = fromTH;
      }
    }
    let top = minTop - containerOffset.top - 1;
    let height = toOffset.top + (0, _element.outerHeight)(toTD) - minTop;
    if (this.isEntireRowSelected(fromColumn, toColumn)) {
      const modifiedValues = this.getDimensionsFromHeader('rows', fromRow, toRow, columnHeader, containerOffset);
      let fromTH = null;
      if (modifiedValues) {
        [fromTH, top, height] = modifiedValues;
      }
      if (fromTH) {
        fromTD = fromTH;
      }
    }
    const style = (0, _element.getComputedStyle)(fromTD, rootWindow);
    if (parseInt(style.borderTopWidth, 10) > 0) {
      top += 1;
      height = height > 0 ? height - 1 : 0;
    }
    if (parseInt(style[isRtl ? 'borderRightWidth' : 'borderLeftWidth'], 10) > 0) {
      inlineStartPos += 1;
      width = width > 0 ? width - 1 : 0;
    }
    const inlinePosProperty = isRtl ? 'right' : 'left';
    this.topStyle.top = `${top}px`;
    this.topStyle[inlinePosProperty] = `${inlineStartPos}px`;
    this.topStyle.width = `${width}px`;
    this.topStyle.display = 'block';
    this.startStyle.top = `${top}px`;
    this.startStyle[inlinePosProperty] = `${inlineStartPos}px`;
    this.startStyle.height = `${height}px`;
    this.startStyle.display = 'block';
    const delta = Math.floor(this.settings.border.width / 2);
    this.bottomStyle.top = `${top + height - delta}px`;
    this.bottomStyle[inlinePosProperty] = `${inlineStartPos}px`;
    this.bottomStyle.width = `${width}px`;
    this.bottomStyle.display = 'block';
    this.endStyle.top = `${top}px`;
    this.endStyle[inlinePosProperty] = `${inlineStartPos + width - delta}px`;
    this.endStyle.height = `${height + 1}px`;
    this.endStyle.display = 'block';
    let cornerVisibleSetting = this.settings.border.cornerVisible;
    cornerVisibleSetting = typeof cornerVisibleSetting === 'function' ? cornerVisibleSetting(this.settings.layerLevel) : cornerVisibleSetting;
    const hookResult = this.wot.getSetting('onModifyGetCellCoords', toRow, toColumn);
    let [checkRow, checkCol] = [toRow, toColumn];
    if (hookResult && Array.isArray(hookResult)) {
      [,, checkRow, checkCol] = hookResult;
    }
    if ((0, _browser.isMobileBrowser)() || !cornerVisibleSetting || this.isPartRange(checkRow, checkCol)) {
      this.cornerStyle.display = 'none';
    } else {
      this.cornerStyle.top = `${top + height + this.cornerCenterPointOffset - 1}px`;
      this.cornerStyle[inlinePosProperty] = `${inlineStartPos + width + this.cornerCenterPointOffset - 1}px`;
      this.cornerStyle.borderRightWidth = this.cornerDefaultStyle.borderWidth;
      this.cornerStyle.width = this.cornerDefaultStyle.width;

      // Hide the fill handle, so the possible further adjustments won't force unneeded scrollbars.
      this.cornerStyle.display = 'none';
      let trimmingContainer = (0, _element.getTrimmingContainer)(wtTable.TABLE);
      const trimToWindow = trimmingContainer === rootWindow;
      if (trimToWindow) {
        trimmingContainer = rootDocument.documentElement;
      }
      const cornerHalfWidth = parseInt(this.cornerDefaultStyle.width, 10) / 2;
      const cornerHalfHeight = parseInt(this.cornerDefaultStyle.height, 10) / 2;
      if (toColumn === this.wot.getSetting('totalColumns') - 1) {
        const toTdOffsetLeft = trimToWindow ? toTD.getBoundingClientRect().left : toTD.offsetLeft;
        let cornerOverlappingContainer = false;
        let cornerEdge = 0;
        if (isRtl) {
          cornerEdge = toTdOffsetLeft - parseInt(this.cornerDefaultStyle.width, 10) / 2;
          cornerOverlappingContainer = cornerEdge < 0;
        } else {
          cornerEdge = toTdOffsetLeft + (0, _element.outerWidth)(toTD) + parseInt(this.cornerDefaultStyle.width, 10) / 2;
          cornerOverlappingContainer = cornerEdge >= (0, _element.innerWidth)(trimmingContainer);
        }
        if (cornerOverlappingContainer) {
          this.cornerStyle[inlinePosProperty] = `${Math.floor(inlineStartPos + width + this.cornerCenterPointOffset - cornerHalfWidth)}px`;
          this.cornerStyle[isRtl ? 'borderLeftWidth' : 'borderRightWidth'] = 0;
        }
      }
      if (toRow === this.wot.getSetting('totalRows') - 1) {
        const toTdOffsetTop = trimToWindow ? toTD.getBoundingClientRect().top : toTD.offsetTop;
        const cornerBottomEdge = toTdOffsetTop + (0, _element.outerHeight)(toTD) + parseInt(this.cornerDefaultStyle.height, 10) / 2;
        const cornerOverlappingContainer = cornerBottomEdge >= (0, _element.innerHeight)(trimmingContainer);
        if (cornerOverlappingContainer) {
          this.cornerStyle.top = `${Math.floor(top + height + this.cornerCenterPointOffset - cornerHalfHeight)}px`;
          this.cornerStyle.borderBottomWidth = 0;
        }
      }
      this.cornerStyle.display = 'block';
    }
    if ((0, _browser.isMobileBrowser)()) {
      this.updateMultipleSelectionHandlesPosition(toRow, toColumn, top, inlineStartPos, width, height);
    }
  }

  /**
   * Check whether an entire column of cells is selected.
   *
   * @private
   * @param {number} startRowIndex Start row index.
   * @param {number} endRowIndex End row index.
   * @returns {boolean}
   */
  isEntireColumnSelected(startRowIndex, endRowIndex) {
    return startRowIndex === this.wot.wtTable.getFirstRenderedRow() && endRowIndex === this.wot.wtTable.getLastRenderedRow();
  }

  /**
   * Check whether an entire row of cells is selected.
   *
   * @private
   * @param {number} startColumnIndex Start column index.
   * @param {number} endColumnIndex End column index.
   * @returns {boolean}
   */
  isEntireRowSelected(startColumnIndex, endColumnIndex) {
    return startColumnIndex === this.wot.wtTable.getFirstRenderedColumn() && endColumnIndex === this.wot.wtTable.getLastRenderedColumn();
  }

  /**
   * Get left/top index and width/height depending on the `direction` provided.
   *
   * @private
   * @param {string} direction `rows` or `columns`, defines if an entire column or row is selected.
   * @param {number} fromIndex Start index of the selection.
   * @param {number} toIndex End index of the selection.
   * @param {number} headerIndex The header index as negative value.
   * @param {number} containerOffset Offset of the container.
   * @returns {Array|boolean} Returns an array of [headerElement, left, width] or [headerElement, top, height], depending on `direction` (`false` in case of an error getting the headers).
   */
  getDimensionsFromHeader(direction, fromIndex, toIndex, headerIndex, containerOffset) {
    const {
      wtTable
    } = this.wot;
    const rootHotElement = wtTable.wtRootElement.parentNode;
    let getHeaderFn = null;
    let dimensionFn = null;
    let entireSelectionClassname = null;
    let index = null;
    let dimension = null;
    let dimensionProperty = null;
    let startHeader = null;
    let endHeader = null;
    switch (direction) {
      case 'rows':
        getHeaderFn = function () {
          return wtTable.getRowHeader(...arguments);
        };
        dimensionFn = function () {
          return (0, _element.outerHeight)(...arguments);
        };
        entireSelectionClassname = 'ht__selection--rows';
        dimensionProperty = 'top';
        break;
      case 'columns':
        getHeaderFn = function () {
          return wtTable.getColumnHeader(...arguments);
        };
        dimensionFn = function () {
          return (0, _element.outerWidth)(...arguments);
        };
        entireSelectionClassname = 'ht__selection--columns';
        dimensionProperty = 'left';
        break;
      default:
    }
    if (rootHotElement.classList.contains(entireSelectionClassname)) {
      const columnHeaderLevelCount = this.wot.getSetting('columnHeaders').length;
      startHeader = getHeaderFn(fromIndex, columnHeaderLevelCount - headerIndex);
      endHeader = getHeaderFn(toIndex, columnHeaderLevelCount - headerIndex);
      if (!startHeader || !endHeader) {
        return false;
      }
      const startHeaderOffset = (0, _element.offset)(startHeader);
      const endOffset = (0, _element.offset)(endHeader);
      if (startHeader && endHeader) {
        index = startHeaderOffset[dimensionProperty] - containerOffset[dimensionProperty] - 1;
        dimension = endOffset[dimensionProperty] + dimensionFn(endHeader) - startHeaderOffset[dimensionProperty];
      }
      return [startHeader, index, dimension];
    }
    return false;
  }

  /**
   * Change border style.
   *
   * @private
   * @param {string} borderElement Coordinate where add/remove border: top, bottom, start, end.
   * @param {object} border The border object descriptor.
   */
  changeBorderStyle(borderElement, border) {
    const style = this[borderElement].style;
    const borderStyle = border[borderElement];
    if (!borderStyle || borderStyle.hide) {
      (0, _element.addClass)(this[borderElement], 'hidden');
    } else {
      if ((0, _element.hasClass)(this[borderElement], 'hidden')) {
        (0, _element.removeClass)(this[borderElement], 'hidden');
      }
      style.backgroundColor = borderStyle.color;
      if (borderElement === 'top' || borderElement === 'bottom') {
        style.height = `${borderStyle.width}px`;
      }
      if (borderElement === 'start' || borderElement === 'end') {
        style.width = `${borderStyle.width}px`;
      }
    }
  }

  /**
   * Change border style to default.
   *
   * @private
   * @param {string} position The position type ("top", "bottom", "start", "end") to change.
   */
  changeBorderToDefaultStyle(position) {
    const defaultBorder = {
      width: 1,
      color: '#000'
    };
    const style = this[position].style;
    style.backgroundColor = defaultBorder.color;
    style.width = `${defaultBorder.width}px`;
    style.height = `${defaultBorder.width}px`;
  }

  /**
   * Toggle class 'hidden' to element.
   *
   * @private
   * @param {string} borderElement Coordinate where add/remove border: top, bottom, start, end.
   * @param {boolean} [remove] Defines type of the action to perform.
   */
  toggleHiddenClass(borderElement, remove) {
    this.changeBorderToDefaultStyle(borderElement);
    if (remove) {
      (0, _element.addClass)(this[borderElement], 'hidden');
    } else {
      (0, _element.removeClass)(this[borderElement], 'hidden');
    }
  }

  /**
   * Hide border.
   */
  disappear() {
    this.topStyle.display = 'none';
    this.bottomStyle.display = 'none';
    this.startStyle.display = 'none';
    this.endStyle.display = 'none';
    this.cornerStyle.display = 'none';
    if ((0, _browser.isMobileBrowser)()) {
      this.selectionHandles.styles.top.display = 'none';
      this.selectionHandles.styles.topHitArea.display = 'none';
      this.selectionHandles.styles.bottom.display = 'none';
      this.selectionHandles.styles.bottomHitArea.display = 'none';
    }
  }

  /**
   * Cleans up all the DOM state related to a Border instance. Call this prior to deleting a Border instance.
   */
  destroy() {
    this.eventManager.destroyWithOwnEventsOnly();
    this.main.parentNode.removeChild(this.main);
  }
}
var _default = Border;
exports.default = _default;