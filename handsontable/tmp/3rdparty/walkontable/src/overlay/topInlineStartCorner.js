"use strict";

exports.__esModule = true;
require("core-js/modules/es.error.cause.js");
var _element = require("../../../../helpers/dom/element");
var _topInlineStartCorner = _interopRequireDefault(require("../table/topInlineStartCorner"));
var _base = require("./_base");
var _constants = require("./constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * @class TopInlineStartCornerOverlay
 */
class TopInlineStartCornerOverlay extends _base.Overlay {
  /**
   * @param {Walkontable} wotInstance The Walkontable instance. @TODO refactoring: check if can be deleted.
   * @param {FacadeGetter} facadeGetter Function which return proper facade.
   * @param {Settings} wtSettings The Walkontable settings.
   * @param {DomBindings} domBindings Dom elements bound to the current instance.
   * @param {TopOverlay} topOverlay The instance of the Top overlay.
   * @param {InlineStartOverlay} inlineStartOverlay The instance of the InlineStart overlay.
   */
  constructor(wotInstance, facadeGetter, wtSettings, domBindings, topOverlay, inlineStartOverlay) {
    super(wotInstance, facadeGetter, _constants.CLONE_TOP_INLINE_START_CORNER, wtSettings, domBindings);
    /**
     * The instance of the Top overlay.
     *
     * @type {TopOverlay}
     */
    _defineProperty(this, "topOverlay", void 0);
    /**
     * The instance of the InlineStart overlay.
     *
     * @type {InlineStartOverlay}
     */
    _defineProperty(this, "inlineStartOverlay", void 0);
    this.topOverlay = topOverlay;
    this.inlineStartOverlay = inlineStartOverlay;
  }

  /**
   * Factory method to create a subclass of `Table` that is relevant to this overlay.
   *
   * @see Table#constructor
   * @param {...*} args Parameters that will be forwarded to the `Table` constructor.
   * @returns {TopInlineStartCornerOverlayTable}
   */
  createTable() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return new _topInlineStartCorner.default(...args);
  }

  /**
   * Checks if overlay should be fully rendered.
   *
   * @returns {boolean}
   */
  shouldBeRendered() {
    return this.wtSettings.getSetting('shouldRenderTopOverlay') && this.wtSettings.getSetting('shouldRenderInlineStartOverlay');
  }

  /**
   * Updates the corner overlay position.
   *
   * @returns {boolean}
   */
  resetFixedPosition() {
    this.updateTrimmingContainer();
    if (!this.wot.wtTable.holder.parentNode) {
      // removed from DOM
      return false;
    }
    const overlayRoot = this.clone.wtTable.holder.parentNode;
    if (this.trimmingContainer === this.domBindings.rootWindow) {
      const left = this.inlineStartOverlay.getOverlayOffset() * (this.isRtl() ? -1 : 1);
      const top = this.topOverlay.getOverlayOffset();
      (0, _element.setOverlayPosition)(overlayRoot, `${left}px`, `${top}px`);
    } else {
      (0, _element.resetCssTransform)(overlayRoot);
    }
    let tableHeight = (0, _element.outerHeight)(this.clone.wtTable.TABLE);
    const tableWidth = (0, _element.outerWidth)(this.clone.wtTable.TABLE);
    if (!this.wot.wtTable.hasDefinedSize()) {
      tableHeight = 0;
    }
    overlayRoot.style.height = `${tableHeight}px`;
    overlayRoot.style.width = `${tableWidth}px`;
    return false;
  }
}
exports.TopInlineStartCornerOverlay = TopInlineStartCornerOverlay;