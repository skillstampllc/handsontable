"use strict";

exports.__esModule = true;
require("core-js/modules/es.array.push.js");
var _array = require("../../helpers/array");
/**
 * @private
 * @class DataFilter
 */
class DataFilter {
  constructor(conditionCollection) {
    let columnDataFactory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : () => [];
    /**
     * Reference to the instance of {ConditionCollection}.
     *
     * @type {ConditionCollection}
     */
    this.conditionCollection = conditionCollection;
    /**
     * Function which provide source data factory for specified column.
     *
     * @type {Function}
     */
    this.columnDataFactory = columnDataFactory;
  }

  /**
   * Filter data based on the conditions collection.
   *
   * @returns {Array}
   */
  filter() {
    let filteredData = [];
    (0, _array.arrayEach)(this.conditionCollection.getFilteredColumns(), (physicalColumn, index) => {
      let columnData = this.columnDataFactory(physicalColumn);
      if (index) {
        columnData = this._getIntersectData(columnData, filteredData);
      }
      filteredData = this.filterByColumn(physicalColumn, columnData);
    });
    return filteredData;
  }

  /**
   * Filter data based on specified physical column index.
   *
   * @param {number} column The physical column index.
   * @param {Array} [dataSource] Data source as array of objects with `value` and `meta` keys (e.g. `{value: 'foo', meta: {}}`).
   * @returns {Array} Returns filtered data.
   */
  filterByColumn(column) {
    let dataSource = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    const filteredData = [];
    (0, _array.arrayEach)(dataSource, dataRow => {
      if (dataRow !== void 0 && this.conditionCollection.isMatch(dataRow, column)) {
        filteredData.push(dataRow);
      }
    });
    return filteredData;
  }

  /**
   * Intersect data.
   *
   * @private
   * @param {Array} data The data to intersect.
   * @param {Array} needles The collection intersected rows with the data.
   * @returns {Array}
   */
  _getIntersectData(data, needles) {
    const result = [];
    (0, _array.arrayEach)(needles, needleRow => {
      const row = needleRow.meta.visualRow;
      if (data[row] !== void 0) {
        result[row] = data[row];
      }
    });
    return result;
  }
}
var _default = DataFilter;
exports.default = _default;