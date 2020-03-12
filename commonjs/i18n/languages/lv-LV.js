"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

exports.__esModule = true;
exports.default = void 0;

var C = _interopRequireWildcard(require("../constants"));

var _dictionary;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var dictionary = (_dictionary = {
  languageCode: 'lv-LV'
}, _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ROW_ABOVE, 'Ievietot rindu augšā'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ROW_BELOW, 'Ievietot rindu apakšā'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_INSERT_LEFT, 'Ievietot kolonnu pa kreisi'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_INSERT_RIGHT, 'Ievietot kolonnu pa labi'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_REMOVE_ROW, ['Dzēst rindu', 'Dzēst rindas']), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_REMOVE_COLUMN, ['Dzēst kolonnu', 'Dzēst kolonnas']), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_UNDO, 'Atsaukt'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_REDO, 'Pārtaisīt'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_READ_ONLY, 'Lasīšanas režīms'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_CLEAR_COLUMN, 'Notīrīt kolonnu'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT, 'Izvietojums'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_LEFT, 'Pa kreisi'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_CENTER, 'Centrēts'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_RIGHT, 'Pa labi'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_JUSTIFY, 'Izlīdzināts'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_TOP, 'Augšā'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_MIDDLE, 'Pa vidu'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_BOTTOM, 'Apakšā'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_FREEZE_COLUMN, 'Iesaldēt kolonnu'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_UNFREEZE_COLUMN, 'Atsaldēt kolonnu'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_BORDERS, 'Robežas'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_BORDERS_TOP, 'Augšā'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_BORDERS_RIGHT, 'Pa labi'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_BORDERS_BOTTOM, 'Apakšā'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_BORDERS_LEFT, 'Pa kreisi'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_REMOVE_BORDERS, 'Noņemt robežu(-as)'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ADD_COMMENT, 'Pievienot komentāru'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_EDIT_COMMENT, 'Labot komentāru'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_REMOVE_COMMENT, 'Dzēst komentāru'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_READ_ONLY_COMMENT, 'Lasīšanas režīma komentārs'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_MERGE_CELLS, 'Sapludināt šūnas'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_UNMERGE_CELLS, 'Nesapludināt šunas'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_COPY, 'Kopēt'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_CUT, 'Izgriezt'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_NESTED_ROWS_INSERT_CHILD, 'Ievietot pakārtoto rindu'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_NESTED_ROWS_DETACH_CHILD, 'Atdalīt no vecāka'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_HIDE_COLUMN, ['Palēpt kolonnu', 'Palēpt kolonnas']), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_SHOW_COLUMN, ['Rādīt kolonnu', 'Rādīt kolonnas']), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_HIDE_ROW, ['Palēpt rindu', 'Paslēpt rindas']), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_SHOW_ROW, ['Rādīt rindu', 'Rādīt rindas']), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_NONE, 'Nekas'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_EMPTY, 'Ir tukšs'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_NOT_EMPTY, 'Nav tukšs'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_EQUAL, 'Vienāds ar'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_NOT_EQUAL, 'Nav vienāds ar'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_BEGINS_WITH, 'Sākas ar'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_ENDS_WITH, 'Beidzas ar'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_CONTAINS, 'Satur'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_NOT_CONTAIN, 'Nesatur'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_GREATER_THAN, 'Lielāks par'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_GREATER_THAN_OR_EQUAL, 'Lielāks vai vienāds ar'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_LESS_THAN, 'Mazāks par'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_LESS_THAN_OR_EQUAL, 'Mazāks vai vienāds ar'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_BETWEEN, 'Ir starp'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_NOT_BETWEEN, 'Nav starp'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_AFTER, 'Pēc'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_BEFORE, 'Pirms'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_TODAY, 'Šodien'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_TOMORROW, 'Rītdien'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_YESTERDAY, 'Vakar'), _defineProperty(_dictionary, C.FILTERS_VALUES_BLANK_CELLS, 'Tukšas šūnas'), _defineProperty(_dictionary, C.FILTERS_DIVS_FILTER_BY_CONDITION, 'Filtrēt pēc nosacījuma'), _defineProperty(_dictionary, C.FILTERS_DIVS_FILTER_BY_VALUE, 'Filtrēt pēc vērtības'), _defineProperty(_dictionary, C.FILTERS_LABELS_CONJUNCTION, 'Un'), _defineProperty(_dictionary, C.FILTERS_LABELS_DISJUNCTION, 'Vai'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_SELECT_ALL, 'Izvēlēties visu'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_CLEAR, 'Notīrīt'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_OK, 'Labi'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_CANCEL, 'Atcelt'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_PLACEHOLDER_SEARCH, 'Meklēt'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_PLACEHOLDER_VALUE, 'Vērtība'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_PLACEHOLDER_SECOND_VALUE, 'Otra vērtība'), _dictionary);
var _default = dictionary;
exports.default = _default;