import Core from "./core.mjs";
import { rootInstanceSymbol } from "./utils/rootInstance.mjs";
import { dictionaryKeys, getTranslatedPhrase, registerLanguageDictionary, getLanguagesDictionaries, getLanguageDictionary } from "./i18n/registry.mjs";
import { registerCellType } from "./cellTypes/registry.mjs";
import { TextCellType } from "./cellTypes/textType/index.mjs";
registerCellType(TextCellType);
/**
 * @param {HTMLElement} rootElement The element to which the Handsontable instance is injected.
 * @param {object} userSettings The user defined options.
 * @returns {Core}
 */

function Handsontable(rootElement, userSettings) {
  var instance = new Core(rootElement, userSettings || {}, rootInstanceSymbol);
  instance.init();
  return instance;
}

Handsontable.Core = function (rootElement) {
  var userSettings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new Core(rootElement, userSettings, rootInstanceSymbol);
};

Handsontable.packageName = 'handsontable';
Handsontable.buildDate = "11/02/2021 14:06:41";
Handsontable.version = "8.3.1";
Handsontable.languages = {
  dictionaryKeys: dictionaryKeys,
  getLanguageDictionary: getLanguageDictionary,
  getLanguagesDictionaries: getLanguagesDictionaries,
  registerLanguageDictionary: registerLanguageDictionary,
  getTranslatedPhrase: getTranslatedPhrase
};
export default Handsontable;