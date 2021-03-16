"use strict";

exports.__esModule = true;
exports.default = void 0;

var _core = _interopRequireDefault(require("./core"));

var _rootInstance = require("./utils/rootInstance");

var _registry = require("./i18n/registry");

var _registry2 = require("./cellTypes/registry");

var _textType = require("./cellTypes/textType");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _registry2.registerCellType)(_textType.TextCellType);
/**
 * @param {HTMLElement} rootElement The element to which the Handsontable instance is injected.
 * @param {object} userSettings The user defined options.
 * @returns {Core}
 */

function Handsontable(rootElement, userSettings) {
  var instance = new _core.default(rootElement, userSettings || {}, _rootInstance.rootInstanceSymbol);
  instance.init();
  return instance;
}

Handsontable.Core = function (rootElement) {
  var userSettings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new _core.default(rootElement, userSettings, _rootInstance.rootInstanceSymbol);
};

Handsontable.packageName = 'handsontable';
Handsontable.buildDate = "16/03/2021 13:12:38";
Handsontable.version = "8.3.1";
Handsontable.languages = {
  dictionaryKeys: _registry.dictionaryKeys,
  getLanguageDictionary: _registry.getLanguageDictionary,
  getLanguagesDictionaries: _registry.getLanguagesDictionaries,
  registerLanguageDictionary: _registry.registerLanguageDictionary,
  getTranslatedPhrase: _registry.getTranslatedPhrase
};
var _default = Handsontable;
exports.default = _default;