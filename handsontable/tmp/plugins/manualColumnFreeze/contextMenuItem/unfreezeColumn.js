"use strict";

exports.__esModule = true;
exports.default = unfreezeColumnItem;
var C = _interopRequireWildcard(require("../../../i18n/constants"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @param {ManualColumnFreeze} manualColumnFreezePlugin The plugin instance.
 * @returns {object}
 */
function unfreezeColumnItem(manualColumnFreezePlugin) {
  return {
    key: 'unfreeze_column',
    name() {
      return this.getTranslatedPhrase(C.CONTEXTMENU_ITEMS_UNFREEZE_COLUMN);
    },
    callback(key, selected) {
      const [{
        start: {
          col: selectedColumn
        }
      }] = selected;
      manualColumnFreezePlugin.unfreezeColumn(selectedColumn);
      this.render();
      this.view.adjustElementsSize(true);
    },
    hidden() {
      const selection = this.getSelectedRange();
      let hide = false;
      if (selection === void 0) {
        hide = true;
      } else if (selection.length > 1) {
        hide = true;
      } else if (selection[0].from.col !== selection[0].to.col || selection[0].from.col >= this.getSettings().fixedColumnsStart) {
        hide = true;
      }
      return hide;
    }
  };
}