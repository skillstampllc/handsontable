"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

exports.__esModule = true;
exports.BottomLeftCornerOverlay = void 0;

require("core-js/modules/es.object.set-prototype-of.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _element = require("./../../../../helpers/dom/element");

var _bottomLeftCorner = _interopRequireDefault(require("./../table/bottomLeftCorner"));

var _base = require("./_base");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * @class TopLeftCornerOverlay
 */
var BottomLeftCornerOverlay = /*#__PURE__*/function (_Overlay) {
  _inherits(BottomLeftCornerOverlay, _Overlay);

  var _super = _createSuper(BottomLeftCornerOverlay);

  /**
   * @param {Walkontable} wotInstance The Walkontable instance.
   */
  function BottomLeftCornerOverlay(wotInstance) {
    var _this;

    _classCallCheck(this, BottomLeftCornerOverlay);

    _this = _super.call(this, wotInstance);
    _this.clone = _this.makeClone(_constants.CLONE_BOTTOM_LEFT_CORNER);
    return _this;
  }
  /**
   * Factory method to create a subclass of `Table` that is relevant to this overlay.
   *
   * @see Table#constructor
   * @param {...*} args Parameters that will be forwarded to the `Table` constructor.
   * @returns {Table}
   */


  _createClass(BottomLeftCornerOverlay, [{
    key: "createTable",
    value: function createTable() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _construct(_bottomLeftCorner.default, args);
    }
    /**
     * Checks if overlay should be fully rendered.
     *
     * @returns {boolean}
     */

  }, {
    key: "shouldBeRendered",
    value: function shouldBeRendered() {
      var wot = this.wot;
      return wot.getSetting('shouldRenderBottomOverlay') && wot.getSetting('shouldRenderLeftOverlay');
    }
    /**
     * Updates the corner overlay position.
     *
     * @returns {boolean}
     */

  }, {
    key: "resetFixedPosition",
    value: function resetFixedPosition() {
      var wot = this.wot;
      this.updateTrimmingContainer();

      if (!wot.wtTable.holder.parentNode) {
        // removed from DOM
        return;
      }

      var overlayRoot = this.clone.wtTable.holder.parentNode;
      overlayRoot.style.top = '';

      if (this.trimmingContainer === wot.rootWindow) {
        var _this$wot = this.wot,
            rootDocument = _this$wot.rootDocument,
            wtTable = _this$wot.wtTable;
        var hiderRect = wtTable.hider.getBoundingClientRect();
        var bottom = Math.ceil(hiderRect.bottom);
        var left = Math.ceil(hiderRect.left);
        var bodyHeight = rootDocument.documentElement.clientHeight;
        var finalLeft;
        var finalBottom;

        if (left < 0) {
          finalLeft = -left;
        } else {
          finalLeft = 0;
        }

        if (bottom > bodyHeight) {
          finalBottom = bottom - bodyHeight;
        } else {
          finalBottom = 0;
        }

        finalBottom += 'px';
        finalLeft += 'px';
        overlayRoot.style.left = finalLeft;
        overlayRoot.style.bottom = finalBottom;
      } else {
        (0, _element.resetCssTransform)(overlayRoot);
        this.repositionOverlay();
      }

      var tableHeight = (0, _element.outerHeight)(this.clone.wtTable.TABLE);
      var tableWidth = (0, _element.outerWidth)(this.clone.wtTable.TABLE);

      if (!this.wot.wtTable.hasDefinedSize()) {
        tableHeight = 0;
      }

      overlayRoot.style.height = "".concat(tableHeight, "px");
      overlayRoot.style.width = "".concat(tableWidth, "px");
      return false;
    }
    /**
     * Reposition the overlay.
     */

  }, {
    key: "repositionOverlay",
    value: function repositionOverlay() {
      var _this$wot2 = this.wot,
          wtTable = _this$wot2.wtTable,
          rootDocument = _this$wot2.rootDocument;
      var cloneRoot = this.clone.wtTable.holder.parentNode;
      var scrollbarWidth = (0, _element.getScrollbarWidth)(rootDocument);

      if (wtTable.holder.clientHeight === wtTable.holder.offsetHeight) {
        scrollbarWidth = 0;
      }

      cloneRoot.style.bottom = "".concat(scrollbarWidth, "px");
    }
  }], [{
    key: "OVERLAY_NAME",
    get: function get() {
      return _constants.CLONE_BOTTOM_LEFT_CORNER;
    }
  }]);

  return BottomLeftCornerOverlay;
}(_base.Overlay);

exports.BottomLeftCornerOverlay = BottomLeftCornerOverlay;