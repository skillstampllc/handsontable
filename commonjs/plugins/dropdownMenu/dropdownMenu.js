"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

exports.__esModule = true;
exports.default = void 0;

var _base = _interopRequireDefault(require("../_base"));

var _array = require("../../helpers/array");

var _commandExecutor = _interopRequireDefault(require("../contextMenu/commandExecutor"));

var _eventManager = _interopRequireDefault(require("../../eventManager"));

var _element = require("../../helpers/dom/element");

var _itemsFactory = _interopRequireDefault(require("../contextMenu/itemsFactory"));

var _menu = _interopRequireDefault(require("../contextMenu/menu"));

var _plugins = require("../../plugins");

var _pluginHooks = _interopRequireDefault(require("../../pluginHooks"));

var _predefinedItems = require("../contextMenu/predefinedItems");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

_pluginHooks.default.getSingleton().register('afterDropdownMenuDefaultOptions');

_pluginHooks.default.getSingleton().register('beforeDropdownMenuShow');

_pluginHooks.default.getSingleton().register('afterDropdownMenuShow');

_pluginHooks.default.getSingleton().register('afterDropdownMenuHide');

_pluginHooks.default.getSingleton().register('afterDropdownMenuExecute');

var BUTTON_CLASS_NAME = 'changeType';
/* eslint-disable jsdoc/require-description-complete-sentence */

/**
 * @class DropdownMenu
 * @plugin DropdownMenu
 *
 * @description
 * This plugin creates the Handsontable Dropdown Menu. It allows to create a new row or column at any place in the grid
 * among [other features](https://handsontable.com/docs/demo-context-menu.html).
 * Possible values:
 * * `true` (to enable default options),
 * * `false` (to disable completely).
 *
 * or array of any available strings:
 * * `["row_above", "row_below", "col_left", "col_right",
 * "remove_row", "remove_col", "---------", "undo", "redo"]`.
 *
 * See [the dropdown menu demo](https://handsontable.com/docs/demo-dropdown-menu.html) for examples.
 *
 * @example
 * ```
 * const container = document.getElementById('example');
 * const hot = new Handsontable(container, {
 *   data: data,
 *   colHeaders: true,
 *   // enable dropdown menu
 *   dropdownMenu: true
 * });
 *
 * // or
 * const hot = new Handsontable(container, {
 *   data: data,
 *   colHeaders: true,
 *   // enable and configure dropdown menu
 *   dropdownMenu: ['remove_col', '---------', 'make_read_only', 'alignment']
 * });
 * ```
 */

/* eslint-enable jsdoc/require-description-complete-sentence */

var DropdownMenu = /*#__PURE__*/function (_BasePlugin) {
  _inherits(DropdownMenu, _BasePlugin);

  var _super = _createSuper(DropdownMenu);

  _createClass(DropdownMenu, null, [{
    key: "DEFAULT_ITEMS",

    /**
     * Default menu items order when `dropdownMenu` is enabled by setting the config item to `true`.
     *
     * @returns {Array}
     */
    get: function get() {
      return [_predefinedItems.COLUMN_LEFT, _predefinedItems.COLUMN_RIGHT, _predefinedItems.SEPARATOR, _predefinedItems.REMOVE_COLUMN, _predefinedItems.SEPARATOR, _predefinedItems.CLEAR_COLUMN, _predefinedItems.SEPARATOR, _predefinedItems.READ_ONLY, _predefinedItems.SEPARATOR, _predefinedItems.ALIGNMENT];
    }
  }]);

  function DropdownMenu(hotInstance) {
    var _this;

    _classCallCheck(this, DropdownMenu);

    _this = _super.call(this, hotInstance);
    /**
     * Instance of {@link EventManager}.
     *
     * @private
     * @type {EventManager}
     */

    _this.eventManager = new _eventManager.default(_assertThisInitialized(_this));
    /**
     * Instance of {@link CommandExecutor}.
     *
     * @private
     * @type {CommandExecutor}
     */

    _this.commandExecutor = new _commandExecutor.default(_this.hot);
    /**
     * Instance of {@link ItemsFactory}.
     *
     * @private
     * @type {ItemsFactory}
     */

    _this.itemsFactory = null;
    /**
     * Instance of {@link Menu}.
     *
     * @private
     * @type {Menu}
     */

    _this.menu = null; // One listener for enable/disable functionality

    _this.hot.addHook('afterGetColHeader', function (col, TH) {
      return _this.onAfterGetColHeader(col, TH);
    });

    return _this;
  }
  /**
   * Checks if the plugin is enabled in the handsontable settings. This method is executed in {@link Hooks#beforeInit}
   * hook and if it returns `true` than the {@link DropdownMenu#enablePlugin} method is called.
   *
   * @returns {boolean}
   */


  _createClass(DropdownMenu, [{
    key: "isEnabled",
    value: function isEnabled() {
      return this.hot.getSettings().dropdownMenu;
    }
    /**
     * Enables the plugin functionality for this Handsontable instance.
     *
     * @fires Hooks#afterDropdownMenuDefaultOptions
     * @fires Hooks#beforeDropdownMenuSetItems
     */

  }, {
    key: "enablePlugin",
    value: function enablePlugin() {
      var _this2 = this;

      if (this.enabled) {
        return;
      }

      this.itemsFactory = new _itemsFactory.default(this.hot, DropdownMenu.DEFAULT_ITEMS);
      var settings = this.hot.getSettings().dropdownMenu;
      var predefinedItems = {
        items: this.itemsFactory.getItems(settings)
      };
      this.registerEvents();

      if (typeof settings.callback === 'function') {
        this.commandExecutor.setCommonCallback(settings.callback);
      }

      _get(_getPrototypeOf(DropdownMenu.prototype), "enablePlugin", this).call(this);

      this.callOnPluginsReady(function () {
        _this2.hot.runHooks('afterDropdownMenuDefaultOptions', predefinedItems);

        _this2.itemsFactory.setPredefinedItems(predefinedItems.items);

        var menuItems = _this2.itemsFactory.getItems(settings);

        if (_this2.menu) {
          _this2.menu.destroy();
        }

        _this2.menu = new _menu.default(_this2.hot, {
          className: 'htDropdownMenu',
          keepInViewport: true,
          container: settings.uiContainer || _this2.hot.rootDocument.body
        });

        _this2.hot.runHooks('beforeDropdownMenuSetItems', menuItems);

        _this2.menu.setMenuItems(menuItems);

        _this2.menu.addLocalHook('beforeOpen', function () {
          return _this2.onMenuBeforeOpen();
        });

        _this2.menu.addLocalHook('afterOpen', function () {
          return _this2.onMenuAfterOpen();
        });

        _this2.menu.addLocalHook('afterClose', function () {
          return _this2.onMenuAfterClose();
        });

        _this2.menu.addLocalHook('executeCommand', function () {
          var _this2$executeCommand;

          for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
            params[_key] = arguments[_key];
          }

          return (_this2$executeCommand = _this2.executeCommand).call.apply(_this2$executeCommand, [_this2].concat(params));
        }); // Register all commands. Predefined and added by user or by plugins


        (0, _array.arrayEach)(menuItems, function (command) {
          return _this2.commandExecutor.registerCommand(command.key, command);
        });
      });
    }
    /**
     * Updates the plugin state. This method is executed when {@link Core#updateSettings} is invoked.
     */

  }, {
    key: "updatePlugin",
    value: function updatePlugin() {
      this.disablePlugin();
      this.enablePlugin();

      _get(_getPrototypeOf(DropdownMenu.prototype), "updatePlugin", this).call(this);
    }
    /**
     * Disables the plugin functionality for this Handsontable instance.
     */

  }, {
    key: "disablePlugin",
    value: function disablePlugin() {
      this.close();

      if (this.menu) {
        this.menu.destroy();
      }

      _get(_getPrototypeOf(DropdownMenu.prototype), "disablePlugin", this).call(this);
    }
    /**
     * Registers the DOM listeners.
     *
     * @private
     */

  }, {
    key: "registerEvents",
    value: function registerEvents() {
      var _this3 = this;

      this.eventManager.addEventListener(this.hot.rootElement, 'click', function (event) {
        return _this3.onTableClick(event);
      });
    }
    /**
     * Opens menu and re-position it based on the passed coordinates.
     *
     * @param {object|Event} position An object with `pageX` and `pageY` properties which contains values relative to
     *                                the top left of the fully rendered content area in the browser or with `clientX`
     *                                and `clientY`  properties which contains values relative to the upper left edge
     *                                of the content area (the viewport) of the browser window. This object is structurally
     *                                compatible with native mouse event so it can be used either.
     * @fires Hooks#beforeDropdownMenuShow
     * @fires Hooks#afterDropdownMenuShow
     */

  }, {
    key: "open",
    value: function open(position) {
      if (!this.menu) {
        return;
      }

      this.menu.open();

      if (position.width) {
        this.menu.setOffset('left', position.width);
      }

      this.menu.setPosition(position);
    }
    /**
     * Closes dropdown menu.
     */

  }, {
    key: "close",
    value: function close() {
      if (!this.menu) {
        return;
      }

      this.menu.close();
    }
    /**
     * Executes context menu command.
     *
     * You can execute all predefined commands:
     *  * `'row_above'` - Insert row above
     *  * `'row_below'` - Insert row below
     *  * `'col_left'` - Insert column left
     *  * `'col_right'` - Insert column right
     *  * `'clear_column'` - Clear selected column
     *  * `'remove_row'` - Remove row
     *  * `'remove_col'` - Remove column
     *  * `'undo'` - Undo last action
     *  * `'redo'` - Redo last action
     *  * `'make_read_only'` - Make cell read only
     *  * `'alignment:left'` - Alignment to the left
     *  * `'alignment:top'` - Alignment to the top
     *  * `'alignment:right'` - Alignment to the right
     *  * `'alignment:bottom'` - Alignment to the bottom
     *  * `'alignment:middle'` - Alignment to the middle
     *  * `'alignment:center'` - Alignment to the center (justify).
     *
     * Or you can execute command registered in settings where `key` is your command name.
     *
     * @param {string} commandName Command name to execute.
     * @param {*} params Additional parameters passed to the command executor.
     */

  }, {
    key: "executeCommand",
    value: function executeCommand(commandName) {
      var _this$commandExecutor;

      for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        params[_key2 - 1] = arguments[_key2];
      }

      (_this$commandExecutor = this.commandExecutor).execute.apply(_this$commandExecutor, [commandName].concat(params));
    }
    /**
     * Turns on / off listening on dropdown menu.
     *
     * @private
     * @param {boolean} listen Turn on listening when value is set to true, otherwise turn it off.
     */

  }, {
    key: "setListening",
    value: function setListening() {
      var listen = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (this.menu.isOpened()) {
        if (listen) {
          this.menu.hotMenu.listen();
        } else {
          this.menu.hotMenu.unlisten();
        }
      }
    }
    /**
     * Table click listener.
     *
     * @private
     * @param {Event} event The mouse event object.
     */

  }, {
    key: "onTableClick",
    value: function onTableClick(event) {
      event.stopPropagation();

      if ((0, _element.hasClass)(event.target, BUTTON_CLASS_NAME) && !this.menu.isOpened()) {
        var offsetTop = 0;
        var offsetLeft = 0;

        if (this.hot.rootDocument !== this.menu.container.ownerDocument) {
          var frameElement = this.hot.rootWindow.frameElement;

          var _frameElement$getBoun = frameElement.getBoundingClientRect(),
              top = _frameElement$getBoun.top,
              left = _frameElement$getBoun.left;

          offsetTop = top;
          offsetLeft = left;
        }

        var rect = event.target.getBoundingClientRect();
        this.open({
          left: rect.left + offsetLeft,
          top: rect.top + event.target.offsetHeight + 3 + offsetTop,
          width: rect.width,
          height: rect.height
        });
      }
    }
    /**
     * On after get column header listener.
     *
     * @private
     * @param {number} col Visual column index.
     * @param {HTMLTableCellElement} TH Header's TH element.
     */

  }, {
    key: "onAfterGetColHeader",
    value: function onAfterGetColHeader(col, TH) {
      // Corner or a higher-level header
      var headerRow = TH.parentNode;

      if (!headerRow) {
        return;
      }

      var headerRowList = headerRow.parentNode.childNodes;
      var level = Array.prototype.indexOf.call(headerRowList, headerRow);

      if (col < 0 || level !== headerRowList.length - 1) {
        return;
      }

      var existingButton = TH.querySelector(".".concat(BUTTON_CLASS_NAME)); // Plugin enabled and buttons already exists, return.

      if (this.enabled && existingButton) {
        return;
      } // Plugin disabled and buttons still exists, so remove them.


      if (!this.enabled) {
        if (existingButton) {
          existingButton.parentNode.removeChild(existingButton);
        }

        return;
      }

      var button = this.hot.rootDocument.createElement('button');
      button.className = BUTTON_CLASS_NAME; // prevent page reload on button click

      button.onclick = function () {
        return false;
      };

      TH.firstChild.insertBefore(button, TH.firstChild.firstChild);
    }
    /**
     * On menu before open listener.
     *
     * @private
     * @fires Hooks#beforeDropdownMenuShow
     */

  }, {
    key: "onMenuBeforeOpen",
    value: function onMenuBeforeOpen() {
      this.hot.runHooks('beforeDropdownMenuShow', this);
    }
    /**
     * On menu after open listener.
     *
     * @private
     * @fires Hooks#afterDropdownMenuShow
     */

  }, {
    key: "onMenuAfterOpen",
    value: function onMenuAfterOpen() {
      this.hot.runHooks('afterDropdownMenuShow', this);
    }
    /**
     * On menu after close listener.
     *
     * @private
     * @fires Hooks#afterDropdownMenuHide
     */

  }, {
    key: "onMenuAfterClose",
    value: function onMenuAfterClose() {
      this.hot.listen();
      this.hot.runHooks('afterDropdownMenuHide', this);
    }
    /**
     * Destroys the plugin instance.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.close();

      if (this.menu) {
        this.menu.destroy();
      }

      _get(_getPrototypeOf(DropdownMenu.prototype), "destroy", this).call(this);
    }
  }]);

  return DropdownMenu;
}(_base.default);

DropdownMenu.SEPARATOR = {
  name: _predefinedItems.SEPARATOR
};
(0, _plugins.registerPlugin)('dropdownMenu', DropdownMenu);
var _default = DropdownMenu;
exports.default = _default;