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
  languageCode: 'ko-KR'
}, _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ROW_ABOVE, '위쪽에 행 삽입'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ROW_BELOW, '아래쪽에 행 삽입'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_INSERT_LEFT, '왼쪽에 열 삽입'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_INSERT_RIGHT, '오른쪽에 열 삽입'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_REMOVE_ROW, ['행 삭제', '여러 행 삭제']), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_REMOVE_COLUMN, ['열 삭제', '여러 열 삭제']), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_UNDO, '되돌리기'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_REDO, '다시하기'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_READ_ONLY, '읽기 전용'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_CLEAR_COLUMN, '열 지우기'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT, '정렬'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_LEFT, '왼쪽'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_CENTER, '중앙'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_RIGHT, '오른쪽'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_JUSTIFY, '자동'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_TOP, '위쪽'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_MIDDLE, '가운데'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_BOTTOM, '아래쪽'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_FREEZE_COLUMN, '열 고정'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_UNFREEZE_COLUMN, '열 고정 해제'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_BORDERS, '테두리'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_BORDERS_TOP, '위쪽'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_BORDERS_RIGHT, '오른쪽'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_BORDERS_BOTTOM, '아래쪽'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_BORDERS_LEFT, '왼쪽'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_REMOVE_BORDERS, '테두리 지우기'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ADD_COMMENT, '댓글 달기'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_EDIT_COMMENT, '댓글 편집'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_REMOVE_COMMENT, '댓글 삭제'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_READ_ONLY_COMMENT, '읽기 전용 댓글'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_MERGE_CELLS, '셀 병합'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_UNMERGE_CELLS, '셀 병합 해제'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_COPY, '복사'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_CUT, '잘라내기'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_NESTED_ROWS_INSERT_CHILD, '자녀 행 추가'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_NESTED_ROWS_DETACH_CHILD, '부모행에서 제거'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_HIDE_COLUMN, ['열 숨기기', '여러 열 숨기기']), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_SHOW_COLUMN, ['열 숨기기 해제', '여러 열 숨기기 해제']), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_HIDE_ROW, ['행 숨기기', '여러 행 숨기기']), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_SHOW_ROW, ['행 숨기기 해제', '여러 행 숨기기 해제']), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_NONE, '조건없음'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_EMPTY, '비어있음'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_NOT_EMPTY, '비어있지 않음'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_EQUAL, '같'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_NOT_EQUAL, '같지 않음'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_BEGINS_WITH, '시작 문자'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_ENDS_WITH, '끝 문자'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_CONTAINS, '포함'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_NOT_CONTAIN, '포함하지 않음'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_GREATER_THAN, '보다 큼'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_GREATER_THAN_OR_EQUAL, '크거나 같음'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_LESS_THAN, '보다 작'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_LESS_THAN_OR_EQUAL, '작거나 같음'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_BETWEEN, '사이'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_NOT_BETWEEN, '사이 제외'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_AFTER, '다음'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_BEFORE, '전'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_TODAY, '오늘'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_TOMORROW, '내일'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_YESTERDAY, '어제'), _defineProperty(_dictionary, C.FILTERS_VALUES_BLANK_CELLS, '공란'), _defineProperty(_dictionary, C.FILTERS_DIVS_FILTER_BY_CONDITION, '조건부 필터'), _defineProperty(_dictionary, C.FILTERS_DIVS_FILTER_BY_VALUE, '값 필터'), _defineProperty(_dictionary, C.FILTERS_LABELS_CONJUNCTION, '그리고'), _defineProperty(_dictionary, C.FILTERS_LABELS_DISJUNCTION, '또는'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_SELECT_ALL, '전체선택'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_CLEAR, '지우기'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_OK, '확인'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_CANCEL, '취소'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_PLACEHOLDER_SEARCH, '찾기'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_PLACEHOLDER_VALUE, '값'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_PLACEHOLDER_SECOND_VALUE, '두번째 값'), _dictionary);
var _default = dictionary;
exports.default = _default;