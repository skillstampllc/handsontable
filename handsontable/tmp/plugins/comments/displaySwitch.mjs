import { debounce } from "../../helpers/function.mjs";
import { mixin } from "../../helpers/object.mjs";
import localHooks from "../../mixins/localHooks.mjs";
const DEFAULT_DISPLAY_DELAY = 250;
const DEFAULT_HIDE_DELAY = 250;

/**
 * Display switch for the Comments plugin. Manages the time of delayed displaying / hiding comments.
 *
 * @private
 * @class DisplaySwitch
 */
class DisplaySwitch {
  constructor(displayDelay) {
    /**
     * Flag to determine if comment can be showed or hidden. State `true` mean that last performed action
     * was an attempt to show comment element. State `false` mean that it was attempt to hide comment element.
     *
     * @type {boolean}
     */
    this.wasLastActionShow = true;
    /**
     * Show comment after predefined delay. It keeps reference to immutable `debounce` function.
     *
     * @type {Function}
     */
    this.showDebounced = null;
    /**
     * Reference to timer, run by `setTimeout`, which is hiding comment.
     *
     * @type {number}
     */
    this.hidingTimer = null;
    this.updateDelay(displayDelay);
  }

  /**
   * Responsible for hiding comment after proper delay.
   */
  hide() {
    this.wasLastActionShow = false;
    this.hidingTimer = setTimeout(() => {
      if (this.wasLastActionShow === false) {
        this.runLocalHooks('hide');
      }
    }, DEFAULT_HIDE_DELAY);
  }

  /**
   * Responsible for showing comment after proper delay.
   *
   * @param {object} range Coordinates of selected cell.
   */
  show(range) {
    this.wasLastActionShow = true;
    this.showDebounced(range);
  }

  /**
   * Cancel hiding comment.
   */
  cancelHiding() {
    this.wasLastActionShow = true;
    clearTimeout(this.hidingTimer);
    this.hidingTimer = null;
  }

  /**
   * Update the switch settings.
   *
   * @param {number} displayDelay Delay of showing the comments (in milliseconds).
   */
  updateDelay() {
    let displayDelay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_DISPLAY_DELAY;
    this.showDebounced = debounce(range => {
      if (this.wasLastActionShow) {
        this.runLocalHooks('show', range.from.row, range.from.col);
      }
    }, displayDelay);
  }

  /**
   * Destroy the switcher.
   */
  destroy() {
    this.clearLocalHooks();
  }
}
mixin(DisplaySwitch, localHooks);
export default DisplaySwitch;