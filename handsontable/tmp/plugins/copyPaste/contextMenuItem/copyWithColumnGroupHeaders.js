"use strict";

exports.__esModule = true;
exports.default = copyWithColumnGroupHeadersItem;
var _constants = require("../../../i18n/constants");
/**
 * @param {CopyPaste} copyPastePlugin The plugin instance.
 * @returns {object}
 */
function copyWithColumnGroupHeadersItem(copyPastePlugin) {
  return {
    key: 'copy_with_column_group_headers',
    name() {
      const selectedRange = this.getSelectedRangeLast();
      const nounForm = selectedRange ? Math.min(selectedRange.getWidth() - 1, 1) : 0;
      return this.getTranslatedPhrase(_constants.CONTEXTMENU_ITEMS_COPY_WITH_COLUMN_GROUP_HEADERS, nounForm);
    },
    callback() {
      copyPastePlugin.copyWithAllColumnHeaders();
    },
    disabled() {
      if (!this.hasColHeaders() || !this.getSettings().nestedHeaders) {
        return true;
      }
      const selected = this.getSelected();

      // Disable for no selection or for non-contiguous selection.
      if (!selected || selected.length > 1) {
        return true;
      }
      return false;
    },
    hidden: false
  };
}