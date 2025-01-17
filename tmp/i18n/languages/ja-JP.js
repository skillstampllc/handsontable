"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

exports.__esModule = true;
exports.default = void 0;

var C = _interopRequireWildcard(require("../constants"));

var _dictionary;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var dictionary = (_dictionary = {
  languageCode: 'ja-JP'
}, _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ROW_ABOVE, '行を上に挿入'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ROW_BELOW, '行を下に挿入'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_INSERT_LEFT, '列を左に挿入'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_INSERT_RIGHT, '列を右に挿入'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_REMOVE_ROW, ['行を削除', '行を削除']), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_REMOVE_COLUMN, ['列を削除', '列を削除']), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_UNDO, '元に戻す'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_REDO, 'やり直し'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_READ_ONLY, '読み取り専用'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_CLEAR_COLUMN, '列をクリア'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT, '配置'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_LEFT, '左揃え'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_CENTER, '中央揃え'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_RIGHT, '右揃え'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_JUSTIFY, '両端揃え'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_TOP, '上揃え'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_MIDDLE, '中央揃え(垂直)'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_BOTTOM, '下揃え'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_FREEZE_COLUMN, '列を固定'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_UNFREEZE_COLUMN, '列の固定を解除'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_BORDERS, '枠線'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_BORDERS_TOP, '上'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_BORDERS_RIGHT, '右'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_BORDERS_BOTTOM, '下'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_BORDERS_LEFT, '左'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_REMOVE_BORDERS, '枠線を削除'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ADD_COMMENT, 'コメントを追加'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_EDIT_COMMENT, 'コメントを編集'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_REMOVE_COMMENT, 'コメントを削除'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_READ_ONLY_COMMENT, '読み取り専用コメント'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_MERGE_CELLS, 'セルを結合'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_UNMERGE_CELLS, 'セルの結合を解除'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_COPY, 'コピー'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_CUT, '切り取り'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_NESTED_ROWS_INSERT_CHILD, '子の行を挿入'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_NESTED_ROWS_DETACH_CHILD, '親の行と切り離す'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_HIDE_COLUMN, ['列を非表示', '列を非表示']), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_SHOW_COLUMN, ['列を表示', '列を表示']), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_HIDE_ROW, ['行を非表示', '行を非表示']), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_SHOW_ROW, ['行を表示', '行を表示']), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_NONE, 'なし'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_EMPTY, '空白'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_NOT_EMPTY, '空白ではない'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_EQUAL, '次と等しい'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_NOT_EQUAL, '次と等しくない'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_BEGINS_WITH, '次で始まる'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_ENDS_WITH, '次で終わる'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_CONTAINS, '次を含む'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_NOT_CONTAIN, '次を含まない'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_GREATER_THAN, '次より大きい'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_GREATER_THAN_OR_EQUAL, '以上'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_LESS_THAN, '次より小さい'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_LESS_THAN_OR_EQUAL, '以下'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_BETWEEN, '次の間にある'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_NOT_BETWEEN, '次の間にない'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_AFTER, '次より後の日付'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_BEFORE, '次より前の日付'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_TODAY, '今日'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_TOMORROW, '明日'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_YESTERDAY, '昨日'), _defineProperty(_dictionary, C.FILTERS_VALUES_BLANK_CELLS, '空白のセル'), _defineProperty(_dictionary, C.FILTERS_DIVS_FILTER_BY_CONDITION, '条件でフィルタ'), _defineProperty(_dictionary, C.FILTERS_DIVS_FILTER_BY_VALUE, '値でフィルタ'), _defineProperty(_dictionary, C.FILTERS_LABELS_CONJUNCTION, 'かつ'), _defineProperty(_dictionary, C.FILTERS_LABELS_DISJUNCTION, 'もしくは'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_SELECT_ALL, 'すべて選択'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_CLEAR, 'クリア'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_OK, 'OK'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_CANCEL, 'キャンセル'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_PLACEHOLDER_SEARCH, '検索'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_PLACEHOLDER_VALUE, '値'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_PLACEHOLDER_SECOND_VALUE, '値2'), _dictionary);
var _default = dictionary;
exports.default = _default;