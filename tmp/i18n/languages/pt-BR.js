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
  languageCode: 'pt-BR'
}, _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ROW_ABOVE, 'Inserir linha acima'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ROW_BELOW, 'Inserir linha abaixo'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_INSERT_LEFT, 'Inserir coluna esquerda'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_INSERT_RIGHT, 'Inserir coluna direita'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_REMOVE_ROW, ['Excluir linha', 'Excluir linhas']), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_REMOVE_COLUMN, ['Excluir coluna', 'Excluir colunas']), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_UNDO, 'Desfazer'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_REDO, 'Refazer'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_READ_ONLY, 'Somente leitura'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_CLEAR_COLUMN, 'Limpar coluna'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT, 'Alinhamento'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_LEFT, 'Esquerda'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_CENTER, 'Centralizado'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_RIGHT, 'Direita'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_JUSTIFY, 'Justificado'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_TOP, 'Superior'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_MIDDLE, 'Meio'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ALIGNMENT_BOTTOM, 'Inferior'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_FREEZE_COLUMN, 'Congelar coluna'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_UNFREEZE_COLUMN, 'Descongelar coluna'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_BORDERS, 'Bordas'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_BORDERS_TOP, 'Superior'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_BORDERS_RIGHT, 'Direita'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_BORDERS_BOTTOM, 'Inferior'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_BORDERS_LEFT, 'Esquerda'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_REMOVE_BORDERS, 'Excluir bordas(s)'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_ADD_COMMENT, 'Incluir comentário'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_EDIT_COMMENT, 'Editar comentário'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_REMOVE_COMMENT, 'Remover comentário'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_READ_ONLY_COMMENT, 'Comentário somente leitura'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_MERGE_CELLS, 'Mesclar células'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_UNMERGE_CELLS, 'Desfazer mesclagem de células'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_COPY, 'Copiar'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_CUT, 'Recortar'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_NESTED_ROWS_INSERT_CHILD, 'Inserir linha filha'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_NESTED_ROWS_DETACH_CHILD, 'Desanexar da linha pai'), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_HIDE_COLUMN, ['Ocultar coluna', 'Ocultar colunas']), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_SHOW_COLUMN, ['Exibir coluna', 'Exibir colunas']), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_HIDE_ROW, ['Ocultar linha', 'Ocultar linhas']), _defineProperty(_dictionary, C.CONTEXTMENU_ITEMS_SHOW_ROW, ['Exibir linha', 'Exibir linhas']), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_NONE, 'Nenhum'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_EMPTY, 'É vazio'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_NOT_EMPTY, 'Não é vazio'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_EQUAL, 'É igual a'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_NOT_EQUAL, 'É diferente de'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_BEGINS_WITH, 'Começa com'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_ENDS_WITH, 'Termina com'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_CONTAINS, 'Contém'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_NOT_CONTAIN, 'Não contém'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_GREATER_THAN, 'Maior que'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_GREATER_THAN_OR_EQUAL, 'Maior ou igual a'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_LESS_THAN, 'Menor que'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_LESS_THAN_OR_EQUAL, 'Maior ou igual a'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_BETWEEN, 'Está entre'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_NOT_BETWEEN, 'Não está entre'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_AFTER, 'Depois'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_BEFORE, 'Antes'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_TODAY, 'Hoje'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_TOMORROW, 'Amanhã'), _defineProperty(_dictionary, C.FILTERS_CONDITIONS_YESTERDAY, 'Ontem'), _defineProperty(_dictionary, C.FILTERS_VALUES_BLANK_CELLS, 'Células vazias'), _defineProperty(_dictionary, C.FILTERS_DIVS_FILTER_BY_CONDITION, 'Filtrar por condição'), _defineProperty(_dictionary, C.FILTERS_DIVS_FILTER_BY_VALUE, 'Filtrar por valor'), _defineProperty(_dictionary, C.FILTERS_LABELS_CONJUNCTION, 'E'), _defineProperty(_dictionary, C.FILTERS_LABELS_DISJUNCTION, 'Ou'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_SELECT_ALL, 'Selecionar tudo'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_CLEAR, 'Limpar'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_OK, 'OK'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_CANCEL, 'Cancelar'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_PLACEHOLDER_SEARCH, 'Localizar'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_PLACEHOLDER_VALUE, 'Valor'), _defineProperty(_dictionary, C.FILTERS_BUTTONS_PLACEHOLDER_SECOND_VALUE, 'Segundo valor'), _dictionary);
var _default = dictionary;
exports.default = _default;