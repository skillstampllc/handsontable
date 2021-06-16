function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

import "core-js/modules/web.timers.js";
import "core-js/modules/es.object.set-prototype-of.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.reflect.construct.js";
import "core-js/modules/es.reflect.get.js";
import "core-js/modules/es.object.get-own-property-descriptor.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

import { addClass, removeClass } from "../../helpers/dom/element.mjs";
import { arrayEach } from "../../helpers/array.mjs";
import { BasePlugin } from "../base/index.mjs";
import { isTouchSupported } from "../../helpers/feature.mjs";
export var PLUGIN_KEY = 'touchScroll';
export var PLUGIN_PRIORITY = 200;
/**
 * @private
 * @plugin TouchScroll
 * @class TouchScroll
 */

export var TouchScroll = /*#__PURE__*/function (_BasePlugin) {
  _inherits(TouchScroll, _BasePlugin);

  var _super = _createSuper(TouchScroll);

  function TouchScroll(hotInstance) {
    var _this;

    _classCallCheck(this, TouchScroll);

    _this = _super.call(this, hotInstance);
    /**
     * Collection of scrollbars to update.
     *
     * @type {Array}
     */

    _this.scrollbars = [];
    /**
     * Collection of overlays to update.
     *
     * @type {Array}
     */

    _this.clones = [];
    /**
     * Flag which determines if collection of overlays should be refilled on every table render.
     *
     * @type {boolean}
     * @default false
     */

    _this.lockedCollection = false;
    /**
     * Flag which determines if walkontable should freeze overlays while scrolling.
     *
     * @type {boolean}
     * @default false
     */

    _this.freezeOverlays = false;
    return _this;
  }
  /**
   * Check if plugin is enabled.
   *
   * @returns {boolean}
   */


  _createClass(TouchScroll, [{
    key: "isEnabled",
    value: function isEnabled() {
      return isTouchSupported();
    }
    /**
     * Enable the plugin.
     */

  }, {
    key: "enablePlugin",
    value: function enablePlugin() {
      var _this2 = this;

      if (this.enabled) {
        return;
      }

      this.addHook('afterRender', function () {
        return _this2.onAfterRender();
      });
      this.registerEvents();

      _get(_getPrototypeOf(TouchScroll.prototype), "enablePlugin", this).call(this);
    }
    /**
     * Updates the plugin to use the latest options you have specified.
     */

  }, {
    key: "updatePlugin",
    value: function updatePlugin() {
      this.lockedCollection = false;

      _get(_getPrototypeOf(TouchScroll.prototype), "updatePlugin", this).call(this);
    }
    /**
     * Disable plugin for this Handsontable instance.
     */

  }, {
    key: "disablePlugin",
    value: function disablePlugin() {
      _get(_getPrototypeOf(TouchScroll.prototype), "disablePlugin", this).call(this);
    }
    /**
     * Register all necessary events.
     *
     * @private
     */

  }, {
    key: "registerEvents",
    value: function registerEvents() {
      var _this3 = this;

      this.addHook('beforeTouchScroll', function () {
        return _this3.onBeforeTouchScroll();
      });
      this.addHook('afterMomentumScroll', function () {
        return _this3.onAfterMomentumScroll();
      });
    }
    /**
     * After render listener.
     *
     * @private
     */

  }, {
    key: "onAfterRender",
    value: function onAfterRender() {
      if (this.lockedCollection) {
        return;
      }

      var _this$hot$view$wt$wtO = this.hot.view.wt.wtOverlays,
          topOverlay = _this$hot$view$wt$wtO.topOverlay,
          bottomOverlay = _this$hot$view$wt$wtO.bottomOverlay,
          leftOverlay = _this$hot$view$wt$wtO.leftOverlay,
          topLeftCornerOverlay = _this$hot$view$wt$wtO.topLeftCornerOverlay,
          bottomLeftCornerOverlay = _this$hot$view$wt$wtO.bottomLeftCornerOverlay;
      this.lockedCollection = true;
      this.scrollbars.length = 0;
      this.scrollbars.push(topOverlay);

      if (bottomOverlay.clone) {
        this.scrollbars.push(bottomOverlay);
      }

      this.scrollbars.push(leftOverlay);

      if (topLeftCornerOverlay) {
        this.scrollbars.push(topLeftCornerOverlay);
      }

      if (bottomLeftCornerOverlay && bottomLeftCornerOverlay.clone) {
        this.scrollbars.push(bottomLeftCornerOverlay);
      }

      this.clones.length = 0;

      if (topOverlay.needFullRender) {
        this.clones.push(topOverlay.clone.wtTable.holder.parentNode);
      }

      if (bottomOverlay.needFullRender) {
        this.clones.push(bottomOverlay.clone.wtTable.holder.parentNode);
      }

      if (leftOverlay.needFullRender) {
        this.clones.push(leftOverlay.clone.wtTable.holder.parentNode);
      }

      if (topLeftCornerOverlay) {
        this.clones.push(topLeftCornerOverlay.clone.wtTable.holder.parentNode);
      }

      if (bottomLeftCornerOverlay && bottomLeftCornerOverlay.clone) {
        this.clones.push(bottomLeftCornerOverlay.clone.wtTable.holder.parentNode);
      }
    }
    /**
     * Touch scroll listener.
     *
     * @private
     */

  }, {
    key: "onBeforeTouchScroll",
    value: function onBeforeTouchScroll() {
      this.freezeOverlays = true;
      arrayEach(this.clones, function (clone) {
        addClass(clone, 'hide-tween');
      });
    }
    /**
     * After momentum scroll listener.
     *
     * @private
     */

  }, {
    key: "onAfterMomentumScroll",
    value: function onAfterMomentumScroll() {
      var _this4 = this;

      this.freezeOverlays = false;
      arrayEach(this.clones, function (clone) {
        removeClass(clone, 'hide-tween');
        addClass(clone, 'show-tween');
      });
      setTimeout(function () {
        arrayEach(_this4.clones, function (clone) {
          removeClass(clone, 'show-tween');
        });
      }, 400);
      arrayEach(this.scrollbars, function (scrollbar) {
        scrollbar.refresh();
        scrollbar.resetFixedPosition();
      });
      this.hot.view.wt.wtOverlays.syncScrollWithMaster();
    }
  }], [{
    key: "PLUGIN_KEY",
    get: function get() {
      return PLUGIN_KEY;
    }
  }, {
    key: "PLUGIN_PRIORITY",
    get: function get() {
      return PLUGIN_PRIORITY;
    }
  }]);

  return TouchScroll;
}(BasePlugin);