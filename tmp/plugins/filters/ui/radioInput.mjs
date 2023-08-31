import { clone, extend } from "../../../helpers/object.mjs";
import BaseUI from "./_base.mjs";
const privatePool = new WeakMap();

/**
 * @private
 * @class RadioInputUI
 */
class RadioInputUI extends BaseUI {
  static get DEFAULTS() {
    return clone({
      type: 'radio',
      tagName: 'input',
      className: 'htUIRadio',
      label: {}
    });
  }
  constructor(hotInstance, options) {
    super(hotInstance, extend(RadioInputUI.DEFAULTS, options));
    privatePool.set(this, {});
  }

  /**
   * Build DOM structure.
   */
  build() {
    super.build();
    const priv = privatePool.get(this);
    priv.input = this._element.firstChild;
    const label = this.hot.rootDocument.createElement('label');
    label.textContent = this.translateIfPossible(this.options.label.textContent);
    label.htmlFor = this.translateIfPossible(this.options.label.htmlFor);
    priv.label = label;
    this._element.appendChild(label);
    this.update();
  }

  /**
   * Update element.
   */
  update() {
    if (!this.isBuilt()) {
      return;
    }
    const priv = privatePool.get(this);
    priv.input.checked = this.options.checked;
    priv.label.textContent = this.translateIfPossible(this.options.label.textContent);
  }

  /**
   * Check if radio button is checked.
   *
   * @returns {boolean}
   */
  isChecked() {
    return this.options.checked;
  }

  /**
   * Set input checked attribute.
   *
   * @param {boolean} value Set the component state.
   */
  setChecked() {
    let value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    this.options.checked = value;
    this.update();
  }

  /**
   * Focus element.
   */
  focus() {
    if (this.isBuilt()) {
      privatePool.get(this).input.focus();
    }
  }
}
export default RadioInputUI;