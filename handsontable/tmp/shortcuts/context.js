"use strict";

exports.__esModule = true;
require("core-js/modules/es.error.cause.js");
require("core-js/modules/es.array.push.js");
var _uniqueMap = require("../utils/dataStructures/uniqueMap");
var _utils = require("./utils");
var _mixed = require("../helpers/mixed");
var _function = require("../helpers/function");
var _object = require("../helpers/object");
var _templateLiteralTag = require("../helpers/templateLiteralTag");
/* eslint-disable jsdoc/require-description-complete-sentence */
/**
 * The `ShortcutContext` API lets you store and manage [keyboard shortcuts](@/guides/accessories-and-menus/keyboard-shortcuts.md) in a given [context](@/guides/accessories-and-menus/keyboard-shortcuts.md#keyboard-shortcut-contexts).
 *
 * Each `ShortcutContext` object stores and manages its own set of keyboard shortcuts.
 *
 * @alias ShortcutContext
 * @class ShortcutContext
 * @param {string} name The name of the keyboard shortcut context
 * @returns {object}
 */
const createContext = name => {
  const SHORTCUTS = (0, _uniqueMap.createUniqueMap)({
    errorIdExists: keys => `The "${keys}" shortcut is already registered in the "${name}" context.`
  });

  /**
   * Add a keyboard shortcut to this context.
   *
   * @memberof ShortcutContext#
   * @param {object} options The shortcut's options
   * @param {Array<Array<string>>} options.keys Names of the shortcut's keys,
   * (coming from [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)),
   * in lowercase or uppercase, unified across browsers
   * @param {Function} options.callback The shortcut's action
   * @param {object} options.group A group of shortcuts to which the shortcut belongs
   * @param {object} [options.runOnlyIf] A condition on which the shortcut's action runs
   * @param {object} [options.stopPropagation=true] If set to `true`: stops the event's propagation
   * @param {object} [options.captureCtrl=false] If set to `true`: captures the state of the Control/Meta modifier key
   * @param {object} [options.preventDefault=true] If set to `true`: prevents the default behavior
   * @param {object} [options.position='after'] The order in which the shortcut's action runs:
   * `'before'` or `'after'` the `relativeToGroup` group of actions
   * @param {object} [options.relativeToGroup] The name of a group of actions, used to determine an action's `position`
   *
   */
  const addShortcut = function () {
    let {
      keys,
      callback,
      group,
      runOnlyIf = () => true,
      captureCtrl = false,
      preventDefault = true,
      stopPropagation = false,
      relativeToGroup,
      position
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if ((0, _mixed.isUndefined)(group)) {
      throw new Error('You need to define the shortcut\'s group.');
    }
    if ((0, _function.isFunction)(callback) === false) {
      throw new Error('The shortcut\'s callback needs to be a function.');
    }
    if (Array.isArray(keys) === false) {
      throw new Error((0, _templateLiteralTag.toSingleLine)`Pass the shortcut\'s keys as an array of arrays,\x20
      using the KeyboardEvent.key properties:\x20
      https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values.`);
    }
    const newShortcut = {
      callback,
      group,
      runOnlyIf,
      captureCtrl,
      preventDefault,
      stopPropagation
    };
    if ((0, _mixed.isDefined)(relativeToGroup)) {
      [newShortcut.relativeToGroup, newShortcut.position] = [relativeToGroup, position];
    }
    keys.forEach(keyCombination => {
      const normalizedKeys = (0, _utils.normalizeKeys)(keyCombination);
      const hasKeyCombination = SHORTCUTS.hasItem(normalizedKeys);
      if (hasKeyCombination) {
        const shortcuts = SHORTCUTS.getItem(normalizedKeys);
        let insertionIndex = shortcuts.findIndex(shortcut => shortcut.group === relativeToGroup);
        if (insertionIndex !== -1) {
          if (position === 'before') {
            insertionIndex -= 1;
          } else {
            insertionIndex += 1;
          }
        } else {
          insertionIndex = shortcuts.length;
        }
        shortcuts.splice(insertionIndex, 0, newShortcut);
      } else {
        SHORTCUTS.addItem(normalizedKeys, [newShortcut]);
      }
    });
  };

  /**
   * Add multiple keyboard shortcuts to this context.
   *
   * @memberof ShortcutContext#
   * @param {Array<object>} shortcuts List of shortcuts to add to this shortcut context
   * @param {object} [options] A shortcut's options
   * @param {Function} [options.callback] A shortcut's action
   * @param {object} [options.group] A group of shortcuts to which a shortcut belongs
   * @param {object} [options.runOnlyIf] A condition on which a shortcut's action runs
   * @param {object} [options.stopPropagation=true] If set to `true`: stops the event's propagation
   * @param {object} [options.preventDefault=true] If set to `true`: prevents the default behavior
   * @param {object} [options.position='after'] The order in which a shortcut's action runs:
   * `'before'` or `'after'` a `relativeToGroup` group of actions
   * @param {object} [options.relativeToGroup] The name of a group of actions, used to determine an action's `position`
   */
  const addShortcuts = function (shortcuts) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    shortcuts.forEach(shortcut => {
      (0, _object.objectEach)(options, (value, key) => {
        if (Object.prototype.hasOwnProperty.call(shortcut, key) === false) {
          shortcut[key] = options[key];
        }
      });
      addShortcut(shortcut);
    });
  };

  /**
   * Remove a shortcut from this context.
   *
   * @memberof ShortcutContext#
   * @param {Array<string>} keys Names of the shortcut's keys,
   * (coming from [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)),
   * in lowercase or uppercase, unified across browsers
   */
  const removeShortcutsByKeys = keys => {
    const normalizedKeys = (0, _utils.normalizeKeys)(keys);
    SHORTCUTS.removeItem(normalizedKeys);
  };

  /**
   * Remove a group of shortcuts from this context.
   *
   * @memberof ShortcutContext#
   * @param {string} group The name of the group of shortcuts
   */
  const removeShortcutsByGroup = group => {
    const shortcuts = SHORTCUTS.getItems();
    shortcuts.forEach(_ref => {
      let [normalizedKeys, shortcutOptions] = _ref;
      const leftOptions = shortcutOptions.filter(option => option.group !== group);
      if (leftOptions.length === 0) {
        removeShortcutsByKeys((0, _utils.getKeysList)(normalizedKeys));
      } else {
        shortcutOptions.length = 0;
        shortcutOptions.push(...leftOptions);
      }
    });
  };

  /**
   * Get a shortcut's details.
   *
   * @memberof ShortcutContext#
   * @param {Array<string>} keys Names of the shortcut's keys,
   * (coming from [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)),
   * in lowercase or uppercase, unified across browsers
   * @returns {Array}
   */
  const getShortcuts = keys => {
    const normalizedKeys = (0, _utils.normalizeKeys)(keys);
    const shortcuts = SHORTCUTS.getItem(normalizedKeys);
    return (0, _mixed.isDefined)(shortcuts) ? shortcuts.slice() : [];
  };

  /**
   * Check if a shortcut exists in this context.
   *
   * @memberof ShortcutContext#
   * @param {Array<string>} keys Names of the shortcut's keys,
   * (coming from [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)),
   * in lowercase or uppercase, unified across browsers
   * @returns {boolean}
   */
  const hasShortcut = keys => {
    const normalizedKeys = (0, _utils.normalizeKeys)(keys);
    return SHORTCUTS.hasItem(normalizedKeys);
  };
  return {
    addShortcut,
    addShortcuts,
    getShortcuts,
    hasShortcut,
    removeShortcutsByKeys,
    removeShortcutsByGroup
  };
};
exports.createContext = createContext;