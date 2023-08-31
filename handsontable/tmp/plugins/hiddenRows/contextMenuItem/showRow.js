"use strict";

exports.__esModule = true;
exports.default = showRowItem;
require("core-js/modules/es.array.push.js");
var _array = require("../../../helpers/array");
var C = _interopRequireWildcard(require("../../../i18n/constants"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @param {HiddenRows} hiddenRowsPlugin The plugin instance.
 * @returns {object}
 */
function showRowItem(hiddenRowsPlugin) {
  const rows = [];
  return {
    key: 'hidden_rows_show',
    name() {
      const pluralForm = rows.length > 1 ? 1 : 0;
      return this.getTranslatedPhrase(C.CONTEXTMENU_ITEMS_SHOW_ROW, pluralForm);
    },
    callback() {
      var _this$rowIndexMapper$, _this$rowIndexMapper$2;
      if (rows.length === 0) {
        return;
      }
      let startVisualRow = rows[0];
      let endVisualRow = rows[rows.length - 1];

      // Add to the selection one more visual row on the top.
      startVisualRow = (_this$rowIndexMapper$ = this.rowIndexMapper.getNearestNotHiddenIndex(startVisualRow - 1, -1)) !== null && _this$rowIndexMapper$ !== void 0 ? _this$rowIndexMapper$ : 0;
      // Add to the selection one more visual row on the bottom.
      endVisualRow = (_this$rowIndexMapper$2 = this.rowIndexMapper.getNearestNotHiddenIndex(endVisualRow + 1, 1)) !== null && _this$rowIndexMapper$2 !== void 0 ? _this$rowIndexMapper$2 : this.countRows() - 1;
      hiddenRowsPlugin.showRows(rows);

      // We render rows at first. It was needed for getting fixed rows.
      // Please take a look at #6864 for broader description.
      this.render();
      this.view.adjustElementsSize(true);
      const allRowsSelected = endVisualRow - startVisualRow + 1 === this.countRows();

      // When all headers needs to be selected then do nothing. The header selection is
      // automatically handled by corner click.
      if (!allRowsSelected) {
        this.selectRows(startVisualRow, endVisualRow);
      }
    },
    disabled: false,
    hidden() {
      const hiddenPhysicalRows = (0, _array.arrayMap)(hiddenRowsPlugin.getHiddenRows(), visualRowIndex => {
        return this.toPhysicalRow(visualRowIndex);
      });
      if (!(this.selection.isSelectedByRowHeader() || this.selection.isSelectedByCorner()) || hiddenPhysicalRows.length < 1) {
        return true;
      }
      rows.length = 0;
      const selectedRangeLast = this.getSelectedRangeLast();
      const visualStartRow = selectedRangeLast.getTopStartCorner().row;
      const visualEndRow = selectedRangeLast.getBottomEndCorner().row;
      const rowIndexMapper = this.rowIndexMapper;
      const renderableStartRow = rowIndexMapper.getRenderableFromVisualIndex(visualStartRow);
      const renderableEndRow = rowIndexMapper.getRenderableFromVisualIndex(visualEndRow);
      const notTrimmedRowIndexes = rowIndexMapper.getNotTrimmedIndexes();
      const physicalRowIndexes = [];
      if (visualStartRow !== visualEndRow) {
        const visualRowsInRange = visualEndRow - visualStartRow + 1;
        const renderedRowsInRange = renderableEndRow - renderableStartRow + 1;

        // Collect not trimmed rows if there are some hidden rows in the selection range.
        if (visualRowsInRange > renderedRowsInRange) {
          const physicalIndexesInRange = notTrimmedRowIndexes.slice(visualStartRow, visualEndRow + 1);
          physicalRowIndexes.push(...physicalIndexesInRange.filter(physicalIndex => hiddenPhysicalRows.includes(physicalIndex)));
        }

        // Handled row is the first rendered index and there are some visual indexes before it.
      } else if (renderableStartRow === 0 && renderableStartRow < visualStartRow) {
        // not trimmed indexes -> array of mappings from visual (native array's index) to physical indexes (value).
        physicalRowIndexes.push(...notTrimmedRowIndexes.slice(0, visualStartRow)); // physical indexes

        // When all rows are hidden and the context menu is triggered using top-left corner.
      } else if (renderableStartRow === null) {
        // Show all hidden rows.
        physicalRowIndexes.push(...notTrimmedRowIndexes.slice(0, this.countRows()));
      } else {
        const lastVisualIndex = this.countRows() - 1;
        const lastRenderableIndex = rowIndexMapper.getRenderableFromVisualIndex(rowIndexMapper.getNearestNotHiddenIndex(lastVisualIndex, -1));

        // Handled row is the last rendered index and there are some visual indexes after it.
        if (renderableEndRow === lastRenderableIndex && lastVisualIndex > visualEndRow) {
          physicalRowIndexes.push(...notTrimmedRowIndexes.slice(visualEndRow + 1));
        }
      }
      (0, _array.arrayEach)(physicalRowIndexes, physicalRowIndex => {
        rows.push(this.toVisualRow(physicalRowIndex));
      });
      return rows.length === 0;
    }
  };
}