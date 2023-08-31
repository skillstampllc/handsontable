"use strict";

exports.__esModule = true;
var C = _interopRequireWildcard(require("../constants"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * @preserve
 * Authors: Handsoncode
 * Last updated: Nov 15, 2017
 *
 * Description: Definition file for English - United States language-country.
 */

const dictionary = {
  languageCode: 'en-US',
  [C.CONTEXTMENU_ITEMS_NO_ITEMS]: 'No available options',
  [C.CONTEXTMENU_ITEMS_ROW_ABOVE]: 'Insert row above',
  [C.CONTEXTMENU_ITEMS_ROW_BELOW]: 'Insert row below',
  [C.CONTEXTMENU_ITEMS_INSERT_LEFT]: 'Insert column left',
  [C.CONTEXTMENU_ITEMS_INSERT_RIGHT]: 'Insert column right',
  [C.CONTEXTMENU_ITEMS_REMOVE_ROW]: ['Remove row', 'Remove rows'],
  [C.CONTEXTMENU_ITEMS_REMOVE_COLUMN]: ['Remove column', 'Remove columns'],
  [C.CONTEXTMENU_ITEMS_UNDO]: 'Undo',
  [C.CONTEXTMENU_ITEMS_REDO]: 'Redo',
  [C.CONTEXTMENU_ITEMS_READ_ONLY]: 'Read only',
  [C.CONTEXTMENU_ITEMS_CLEAR_COLUMN]: 'Clear column',
  [C.CONTEXTMENU_ITEMS_ALIGNMENT]: 'Alignment',
  [C.CONTEXTMENU_ITEMS_ALIGNMENT_LEFT]: 'Left',
  [C.CONTEXTMENU_ITEMS_ALIGNMENT_CENTER]: 'Center',
  [C.CONTEXTMENU_ITEMS_ALIGNMENT_RIGHT]: 'Right',
  [C.CONTEXTMENU_ITEMS_ALIGNMENT_JUSTIFY]: 'Justify',
  [C.CONTEXTMENU_ITEMS_ALIGNMENT_TOP]: 'Top',
  [C.CONTEXTMENU_ITEMS_ALIGNMENT_MIDDLE]: 'Middle',
  [C.CONTEXTMENU_ITEMS_ALIGNMENT_BOTTOM]: 'Bottom',
  [C.CONTEXTMENU_ITEMS_FREEZE_COLUMN]: 'Freeze column',
  [C.CONTEXTMENU_ITEMS_UNFREEZE_COLUMN]: 'Unfreeze column',
  [C.CONTEXTMENU_ITEMS_BORDERS]: 'Borders',
  [C.CONTEXTMENU_ITEMS_BORDERS_TOP]: 'Top',
  [C.CONTEXTMENU_ITEMS_BORDERS_RIGHT]: 'Right',
  [C.CONTEXTMENU_ITEMS_BORDERS_BOTTOM]: 'Bottom',
  [C.CONTEXTMENU_ITEMS_BORDERS_LEFT]: 'Left',
  [C.CONTEXTMENU_ITEMS_REMOVE_BORDERS]: 'Remove border(s)',
  [C.CONTEXTMENU_ITEMS_ADD_COMMENT]: 'Add comment',
  [C.CONTEXTMENU_ITEMS_EDIT_COMMENT]: 'Edit comment',
  [C.CONTEXTMENU_ITEMS_REMOVE_COMMENT]: 'Delete comment',
  [C.CONTEXTMENU_ITEMS_READ_ONLY_COMMENT]: 'Read-only comment',
  [C.CONTEXTMENU_ITEMS_MERGE_CELLS]: 'Merge cells',
  [C.CONTEXTMENU_ITEMS_UNMERGE_CELLS]: 'Unmerge cells',
  [C.CONTEXTMENU_ITEMS_COPY]: 'Copy',
  [C.CONTEXTMENU_ITEMS_COPY_WITH_COLUMN_HEADERS]: ['Copy with header', 'Copy with headers'],
  [C.CONTEXTMENU_ITEMS_COPY_WITH_COLUMN_GROUP_HEADERS]: ['Copy with group header', 'Copy with group headers'],
  [C.CONTEXTMENU_ITEMS_COPY_COLUMN_HEADERS_ONLY]: ['Copy header only', 'Copy headers only'],
  [C.CONTEXTMENU_ITEMS_CUT]: 'Cut',
  [C.CONTEXTMENU_ITEMS_NESTED_ROWS_INSERT_CHILD]: 'Insert child row',
  [C.CONTEXTMENU_ITEMS_NESTED_ROWS_DETACH_CHILD]: 'Detach from parent',
  [C.CONTEXTMENU_ITEMS_HIDE_COLUMN]: ['Hide column', 'Hide columns'],
  [C.CONTEXTMENU_ITEMS_SHOW_COLUMN]: ['Show column', 'Show columns'],
  [C.CONTEXTMENU_ITEMS_HIDE_ROW]: ['Hide row', 'Hide rows'],
  [C.CONTEXTMENU_ITEMS_SHOW_ROW]: ['Show row', 'Show rows'],
  [C.FILTERS_CONDITIONS_NONE]: 'None',
  [C.FILTERS_CONDITIONS_EMPTY]: 'Is empty',
  [C.FILTERS_CONDITIONS_NOT_EMPTY]: 'Is not empty',
  [C.FILTERS_CONDITIONS_EQUAL]: 'Is equal to',
  [C.FILTERS_CONDITIONS_NOT_EQUAL]: 'Is not equal to',
  [C.FILTERS_CONDITIONS_BEGINS_WITH]: 'Begins with',
  [C.FILTERS_CONDITIONS_ENDS_WITH]: 'Ends with',
  [C.FILTERS_CONDITIONS_CONTAINS]: 'Contains',
  [C.FILTERS_CONDITIONS_NOT_CONTAIN]: 'Does not contain',
  [C.FILTERS_CONDITIONS_GREATER_THAN]: 'Greater than',
  [C.FILTERS_CONDITIONS_GREATER_THAN_OR_EQUAL]: 'Greater than or equal to',
  [C.FILTERS_CONDITIONS_LESS_THAN]: 'Less than',
  [C.FILTERS_CONDITIONS_LESS_THAN_OR_EQUAL]: 'Less than or equal to',
  [C.FILTERS_CONDITIONS_BETWEEN]: 'Is between',
  [C.FILTERS_CONDITIONS_NOT_BETWEEN]: 'Is not between',
  [C.FILTERS_CONDITIONS_AFTER]: 'After',
  [C.FILTERS_CONDITIONS_BEFORE]: 'Before',
  [C.FILTERS_CONDITIONS_TODAY]: 'Today',
  [C.FILTERS_CONDITIONS_TOMORROW]: 'Tomorrow',
  [C.FILTERS_CONDITIONS_YESTERDAY]: 'Yesterday',
  [C.FILTERS_VALUES_BLANK_CELLS]: 'Blank cells',
  [C.FILTERS_DIVS_FILTER_BY_CONDITION]: 'Filter by condition',
  [C.FILTERS_DIVS_FILTER_BY_VALUE]: 'Filter by value',
  [C.FILTERS_LABELS_CONJUNCTION]: 'And',
  [C.FILTERS_LABELS_DISJUNCTION]: 'Or',
  [C.FILTERS_BUTTONS_SELECT_ALL]: 'Select all',
  [C.FILTERS_BUTTONS_CLEAR]: 'Clear',
  [C.FILTERS_BUTTONS_OK]: 'OK',
  [C.FILTERS_BUTTONS_CANCEL]: 'Cancel',
  [C.FILTERS_BUTTONS_PLACEHOLDER_SEARCH]: 'Search',
  [C.FILTERS_BUTTONS_PLACEHOLDER_VALUE]: 'Value',
  [C.FILTERS_BUTTONS_PLACEHOLDER_SECOND_VALUE]: 'Second value'
};
var _default = dictionary;
exports.default = _default;