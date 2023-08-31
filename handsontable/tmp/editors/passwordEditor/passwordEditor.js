"use strict";

exports.__esModule = true;
var _textEditor = require("../textEditor");
var _element = require("../../helpers/dom/element");
const EDITOR_TYPE = 'password';

/**
 * @private
 * @class PasswordEditor
 */
exports.EDITOR_TYPE = EDITOR_TYPE;
class PasswordEditor extends _textEditor.TextEditor {
  static get EDITOR_TYPE() {
    return EDITOR_TYPE;
  }
  createElements() {
    super.createElements();
    this.TEXTAREA = this.hot.rootDocument.createElement('input');
    this.TEXTAREA.setAttribute('type', 'password');
    this.TEXTAREA.setAttribute('data-hot-input', ''); // Makes the element recognizable by Hot as its own component's element.
    this.TEXTAREA.className = 'handsontableInput';
    this.textareaStyle = this.TEXTAREA.style;
    this.textareaStyle.width = 0;
    this.textareaStyle.height = 0;
    (0, _element.empty)(this.TEXTAREA_PARENT);
    this.TEXTAREA_PARENT.appendChild(this.TEXTAREA);
  }
}
exports.PasswordEditor = PasswordEditor;