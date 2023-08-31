import "core-js/modules/es.array.push.js";
import { addClass } from "../../../helpers/dom/element.mjs";
import { arrayEach } from "../../../helpers/array.mjs";
import * as C from "../../../i18n/constants.mjs";
import BaseComponent from "./_base.mjs";
import InputUI from "../ui/input.mjs";
/**
 * @private
 * @class ActionBarComponent
 */
class ActionBarComponent extends BaseComponent {
  static get BUTTON_OK() {
    return 'ok';
  }
  static get BUTTON_CANCEL() {
    return 'cancel';
  }
  constructor(hotInstance, options) {
    super(hotInstance, {
      id: options.id,
      stateless: true
    });
    this.name = options.name;
    this.elements.push(new InputUI(this.hot, {
      type: 'button',
      value: C.FILTERS_BUTTONS_OK,
      className: 'htUIButton htUIButtonOK',
      identifier: ActionBarComponent.BUTTON_OK
    }));
    this.elements.push(new InputUI(this.hot, {
      type: 'button',
      value: C.FILTERS_BUTTONS_CANCEL,
      className: 'htUIButton htUIButtonCancel',
      identifier: ActionBarComponent.BUTTON_CANCEL
    }));
    this.registerHooks();
  }

  /**
   * Register all necessary hooks.
   *
   * @private
   */
  registerHooks() {
    arrayEach(this.elements, element => {
      element.addLocalHook('click', (event, button) => this.onButtonClick(event, button));
    });
  }

  /**
   * Get menu object descriptor.
   *
   * @returns {object}
   */
  getMenuItemDescriptor() {
    return {
      key: this.id,
      name: this.name,
      isCommand: false,
      disableSelection: true,
      hidden: () => this.isHidden(),
      renderer: (hot, wrapper) => {
        addClass(wrapper.parentNode, 'htFiltersMenuActionBar');
        if (!wrapper.parentNode.hasAttribute('ghost-table')) {
          arrayEach(this.elements, ui => wrapper.appendChild(ui.element));
        }
        return wrapper;
      }
    };
  }

  /**
   * Fire accept event.
   */
  accept() {
    this.runLocalHooks('accept');
  }

  /**
   * Fire cancel event.
   */
  cancel() {
    this.runLocalHooks('cancel');
  }

  /**
   * On button click listener.
   *
   * @private
   * @param {Event} event DOM event.
   * @param {InputUI} button InputUI object.
   */
  onButtonClick(event, button) {
    if (button.options.identifier === ActionBarComponent.BUTTON_OK) {
      this.accept();
    } else {
      this.cancel();
    }
  }
}
export default ActionBarComponent;