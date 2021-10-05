"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/web.dom-collections.for-each.js");

var _globalMeta = _interopRequireDefault(require("./metaLayers/globalMeta"));

var _tableMeta = _interopRequireDefault(require("./metaLayers/tableMeta"));

var _columnMeta = _interopRequireDefault(require("./metaLayers/columnMeta"));

var _cellMeta = _interopRequireDefault(require("./metaLayers/cellMeta"));

var _localHooks = _interopRequireDefault(require("../../mixins/localHooks"));

var _object = require("../../helpers/object");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * With the Meta Manager class, it can be possible to manage with meta objects for different layers in
 * one place. All coordinates used to fetch, updating, removing, or creating rows or columns have to
 * be passed as physical values.
 *
 * The diagram of the meta layers:
 * +-------------+.
 * │ GlobalMeta  │
 * │ (prototype) │
 * +-------------+\
 *       │         \
 *       │          \
 *      \│/         _\|
 * +-------------+    +-------------+.
 * │ TableMeta   │    │ ColumnMeta  │
 * │ (instance)  │    │ (prototype) │
 * +-------------+    +-------------+.
 *                         │
 *                         │
 *                        \│/
 *                    +-------------+.
 *                    │  CellMeta   │
 *                    │ (instance)  │
 *                    +-------------+.
 *
 * A more detailed description of the specific layers can be found in the "metaLayers/" modules description.
 */
var MetaManager = /*#__PURE__*/function () {
  function MetaManager(hot) {
    var _this = this;

    var customSettings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var metaMods = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    _classCallCheck(this, MetaManager);

    /**
     * @type {Handsontable}
     */
    this.hot = hot;
    /**
     * @type {GlobalMeta}
     */

    this.globalMeta = new _globalMeta.default(hot);
    this.globalMeta.updateMeta(customSettings);
    /**
     * @type {TableMeta}
     */

    this.tableMeta = new _tableMeta.default(this.globalMeta);
    /**
     * @type {ColumnMeta}
     */

    this.columnMeta = new _columnMeta.default(this.globalMeta);
    /**
     * @type {CellMeta}
     */

    this.cellMeta = new _cellMeta.default(this.columnMeta);
    metaMods.forEach(function (ModifierClass) {
      return new ModifierClass(_this);
    });
  }
  /**
   * Gets the global meta object that is a root of all default settings, which are recognizable by Handsontable.
   * Other layers inherites all properties from this. Adding, removing, or changing property in that
   * object has a direct reflection to all layers.
   *
   * @returns {object}
   */


  _createClass(MetaManager, [{
    key: "getGlobalMeta",
    value: function getGlobalMeta() {
      return this.globalMeta.getMeta();
    }
    /**
     * Updates global settings object by merging settings with the current state.
     *
     * @param {object} settings An object to merge with.
     */

  }, {
    key: "updateGlobalMeta",
    value: function updateGlobalMeta(settings) {
      this.globalMeta.updateMeta(settings);
    }
    /**
     * Gets settings object that was passed in the Handsontable constructor. That layer contains all
     * default settings inherited from the GlobalMeta layer merged with settings passed by the developer.
     * Adding, removing, or changing property in that object has no direct reflection on any other layers.
     *
     * @returns {object}
     */

  }, {
    key: "getTableMeta",
    value: function getTableMeta() {
      return this.tableMeta.getMeta();
    }
    /**
     * Updates table settings object by merging settings with the current state.
     *
     * @param {object} settings An object to merge with.
     */

  }, {
    key: "updateTableMeta",
    value: function updateTableMeta(settings) {
      this.tableMeta.updateMeta(settings);
    }
    /**
     * Gets column meta object that is a root of all settings defined in the column property of the Handsontable
     * settings. Each column in the Handsontable is associated with a unique meta object which identified by
     * the physical column index. Adding, removing, or changing property in that object has a direct reflection
     * only for the CellMeta layer. The reflection will be visible only if the property doesn't exist in the lower
     * layers (prototype lookup).
     *
     * @param {number} physicalColumn The physical column index.
     * @returns {object}
     */

  }, {
    key: "getColumnMeta",
    value: function getColumnMeta(physicalColumn) {
      return this.columnMeta.getMeta(physicalColumn);
    }
    /**
     * Updates column meta object by merging settings with the current state.
     *
     * @param {number} physicalColumn The physical column index which points what column meta object is updated.
     * @param {object} settings An object to merge with.
     */

  }, {
    key: "updateColumnMeta",
    value: function updateColumnMeta(physicalColumn, settings) {
      this.columnMeta.updateMeta(physicalColumn, settings);
    }
    /**
     * Gets the cell meta object that is a root of all settings defined for the specific cell rendered by
     * the Handsontable. Each cell meta inherits settings from higher layers. When a property doesn't
     * exist in that layer, it is looked up through a prototype to the highest layer. Starting
     * from CellMeta -> ColumnMeta and ending to GlobalMeta, which stores default settings. Adding,
     * removing, or changing property in that object has no direct reflection on any other layers.
     *
     * @param {number} physicalRow The physical row index.
     * @param {number} physicalColumn The physical column index.
     * @param {object} options Additional options that are used to extend the cell meta object.
     * @param {number} options.visualRow The visual row index of the currently requested cell meta object.
     * @param {number} options.visualColumn The visual column index of the currently requested cell meta object.
     * @returns {object}
     */

  }, {
    key: "getCellMeta",
    value: function getCellMeta(physicalRow, physicalColumn, _ref) {
      var visualRow = _ref.visualRow,
          visualColumn = _ref.visualColumn;
      var cellMeta = this.cellMeta.getMeta(physicalRow, physicalColumn);
      cellMeta.visualRow = visualRow;
      cellMeta.visualCol = visualColumn;
      cellMeta.row = physicalRow;
      cellMeta.col = physicalColumn;
      this.runLocalHooks('afterGetCellMeta', cellMeta);
      return cellMeta;
    }
    /**
     * Gets a value (defined by the `key` property) from the cell meta object.
     *
     * @param {number} physicalRow The physical row index.
     * @param {number} physicalColumn The physical column index.
     * @param {string} key Defines the value that will be returned from the cell meta object.
     * @returns {*}
     */

  }, {
    key: "getCellMetaKeyValue",
    value: function getCellMetaKeyValue(physicalRow, physicalColumn, key) {
      if (typeof key !== 'string') {
        throw new Error('The passed cell meta object key is not a string');
      }

      return this.cellMeta.getMeta(physicalRow, physicalColumn, key);
    }
    /**
     * Sets settings object for cell meta object defined by "key" property.
     *
     * @param {number} physicalRow The physical row index.
     * @param {number} physicalColumn The physical column index.
     * @param {string} key The property name to set.
     * @param {*} value Value to save.
     */

  }, {
    key: "setCellMeta",
    value: function setCellMeta(physicalRow, physicalColumn, key, value) {
      this.cellMeta.setMeta(physicalRow, physicalColumn, key, value);
    }
    /**
     * Updates cell meta object by merging settings with the current state.
     *
     * @param {number} physicalRow The physical row index which points what cell meta object is updated.
     * @param {number} physicalColumn The physical column index which points what cell meta object is updated.
     * @param {object} settings An object to merge with.
     */

  }, {
    key: "updateCellMeta",
    value: function updateCellMeta(physicalRow, physicalColumn, settings) {
      this.cellMeta.updateMeta(physicalRow, physicalColumn, settings);
    }
    /**
     * Removes a property defined by the "key" argument from the cell meta object.
     *
     * @param {number} physicalRow The physical row index.
     * @param {number} physicalColumn The physical column index.
     * @param {string} key The property name to remove.
     */

  }, {
    key: "removeCellMeta",
    value: function removeCellMeta(physicalRow, physicalColumn, key) {
      this.cellMeta.removeMeta(physicalRow, physicalColumn, key);
    }
    /**
     * Returns all cell meta objects that were created during the Handsontable operation. As cell meta
     * objects are created lazy, the length of the returned collection depends on how and when the
     * table has asked for access to that meta objects.
     *
     * @returns {object[]}
     */

  }, {
    key: "getCellsMeta",
    value: function getCellsMeta() {
      return this.cellMeta.getMetas();
    }
    /**
     * Returns all cell meta objects that were created during the Handsontable operation but for
     * specyfic row index.
     *
     * @param {number} physicalRow The physical row index.
     * @returns {object[]}
     */

  }, {
    key: "getCellsMetaAtRow",
    value: function getCellsMetaAtRow(physicalRow) {
      return this.cellMeta.getMetasAtRow(physicalRow);
    }
    /**
     * Creates one or more rows at specific position.
     *
     * @param {number} physicalRow The physical row index which points from what position the row is added.
     * @param {number} [amount=1] An amount of rows to add.
     */

  }, {
    key: "createRow",
    value: function createRow(physicalRow) {
      var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      this.cellMeta.createRow(physicalRow, amount);
    }
    /**
     * Removes one or more rows from the collection.
     *
     * @param {number} physicalRow The physical row index which points from what position the row is removed.
     * @param {number} [amount=1] An amount rows to remove.
     */

  }, {
    key: "removeRow",
    value: function removeRow(physicalRow) {
      var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      this.cellMeta.removeRow(physicalRow, amount);
    }
    /**
     * Creates one or more columns at specific position.
     *
     * @param {number} physicalColumn The physical column index which points from what position the column is added.
     * @param {number} [amount=1] An amount of columns to add.
     */

  }, {
    key: "createColumn",
    value: function createColumn(physicalColumn) {
      var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      this.cellMeta.createColumn(physicalColumn, amount);
      this.columnMeta.createColumn(physicalColumn, amount);
    }
    /**
     * Removes one or more columns from the collection.
     *
     * @param {number} physicalColumn The physical column index which points from what position the column is removed.
     * @param {number} [amount=1] An amount of columns to remove.
     */

  }, {
    key: "removeColumn",
    value: function removeColumn(physicalColumn) {
      var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      this.cellMeta.removeColumn(physicalColumn, amount);
      this.columnMeta.removeColumn(physicalColumn, amount);
    }
    /**
     * Clears all saved cell meta objects. It keeps column meta, table meta, and global meta intact.
     */

  }, {
    key: "clearCellsCache",
    value: function clearCellsCache() {
      this.cellMeta.clearCache();
    }
    /**
     * Clears all saved cell and columns meta objects.
     */

  }, {
    key: "clearCache",
    value: function clearCache() {
      this.cellMeta.clearCache();
      this.columnMeta.clearCache();
    }
  }]);

  return MetaManager;
}();

exports.default = MetaManager;
(0, _object.mixin)(MetaManager, _localHooks.default);