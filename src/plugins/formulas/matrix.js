import {
  arrayEach,
  arrayFilter,
  arrayReduce,
  dynamicSort,
  dynamicSortMultiple,
  binarySearch,
} from "../../helpers/array";
import CellValue from "./cell/value";

/**
 * This component is responsible for storing all calculated cells which contain formula expressions (CellValue) and
 * register for all cell references (CellReference).
 *
 * CellValue is an object which represents a formula expression. It contains a calculated value of that formula,
 * an error if applied and cell references. Cell references are CellReference object instances which represent a cell
 * in a spreadsheet. One CellReference can be assigned to multiple CellValues as a precedent cell. Each cell
 * modification triggers a search through CellValues that are dependent of the CellReference. After
 * the match, the cells are marked as 'out of date'. In the next render cycle, all CellValues marked with
 * that state are recalculated.
 *
 * @class Matrix
 * @util
 */
class Matrix {
  constructor(hot) {
    /**
     * Handsontable instance.
     *
     * @type {Core}
     */
    this.hot = hot;
    /**
     * List of all cell values with theirs precedents.
     *
     * @type {Array}
     */
    this.data = [];
    /**
     * List of all created and registered cell references.
     *
     * @type {Array}
     */
    this.cellReferences = [];
  }

  /**
   * Get cell value at given row and column index.
   *
   * @param {number} row Physical row index.
   * @param {number} column Physical column index.
   * @returns {CellValue|null} Returns CellValue instance or `null` if cell not found.
   */
  getCellAt(row, column) {
    let result = null;

    window.binary = true;
    if (window.binary) {
      result = binarySearch(this.data, row, column);
    } else {
      arrayEach(this.data, function (cell) {
        if (cell.row === row && cell.column === column) {
          result = cell;
          return false;
        }
      });
    }

    return result;
  }

  /**
   * Get all out of date cells.
   *
   * @returns {Array}
   */
  getOutOfDateCells() {
    return arrayFilter(this.data, (cell) =>
      cell.isState(CellValue.STATE_OUT_OFF_DATE)
    );
  }

  /**
   * Add cell value to the collection.
   *
   * @param {CellValue|object} cellValue Cell value object.
   */
  add(cellValue) {
    if (!arrayFilter(this.data, (cell) => cell.isEqual(cellValue)).length) {
      this.data.push(cellValue);
    }
  }

  /**
   * Sort data array.
   *
   */
  sort() {
    this.data.sort(dynamicSortMultiple("row", "col"));
  }

  /**
   * Remove cell value from the collection.
   *
   * @param {CellValue|object|Array} cellValue Cell value object.
   */
  remove(cellValue) {
    const isArray = Array.isArray(cellValue);
    const isEqual = (cell, values) => {
      let result = false;

      if (isArray) {
        arrayEach(values, (value) => {
          if (cell.isEqual(value)) {
            result = true;

            return false;
          }
        });
      } else {
        result = cell.isEqual(values);
      }

      return result;
    };
    this.data = arrayFilter(this.data, (cell) => !isEqual(cell, cellValue));
  }

  /**
   * Get cell dependencies using visual coordinates.
   *
   * @param {object} cellCoord Visual cell coordinates object.
   * @returns {Array}
   */
  getDependencies(cellCoord) {
    /* eslint-disable arrow-body-style */
    const getDependencies = (cell) => {
      return arrayReduce(
        this.data,
        (acc, cellValue) => {
          if (cellValue.hasPrecedent(cell) && acc.indexOf(cellValue) === -1) {
            acc.push(cellValue);
          }

          return acc;
        },
        []
      );
    };
    var resultLength = 0;
    var maxDependenciesDeep =
      this.hot && this.hot.getSettings().maxDependenciesDeep > -1
        ? this.hot.getSettings().maxDependenciesDeep
        : -1;

    const getTotalDependencies = (cell) => {
      if (maxDependenciesDeep > -1 && resultLength > maxDependenciesDeep) {
        return [];
      }
      let deps = getDependencies(cell);

      if (deps.length) {
        arrayEach(deps, (cellValue) => {
          if (
            cellValue.hasPrecedents() &&
            ((maxDependenciesDeep > -1 && resultLength < maxDependenciesDeep) ||
              maxDependenciesDeep === -1)
          ) {
            deps = deps.concat(
              getTotalDependencies({
                row: this.hot.toVisualRow(cellValue.row),
                column: this.hot.toVisualColumn(cellValue.column),
              })
            );
          }
        });
        resultLength += deps.length;
      }

      return deps;
    };

    return getTotalDependencies(cellCoord);
  }

  /**
   * Get cell dependencies using visual coordinates.
   *
   * @param {Object} cellCoord Visual cell coordinates object.
   */
  getDependenciesCustom(cellCoord) {
    /* eslint-disable arrow-body-style */
    let result = [];
    let startCell = cellCoord;
    var cellCode = this.coordsToA1([
      startCell[1] || startCell.column,
      (startCell[0] || startCell.row) + 1,
    ]);

    function distinctFilter(array) {
      var seenIt = {};

      return array
        .reverse()
        .filter(function (val) {
          let key = `${val.row}-${val.column}`;
          if (seenIt[key]) {
            return false;
          }
          return (seenIt[key] = true);
        })
        .reverse();
    }

    this.data.forEach((dataCell) => {
      if (dataCell.precedentsList && dataCell.precedentsList[cellCode]) {
        result.push(this.getCellAt(dataCell.row, dataCell.column));
      }
    });
    result.forEach((parentCell) => {
      if (parentCell.row != cellCoord[0] || parentCell.column != cellCoord[1]) {
        result.push(
          ...this.getDependenciesCustom([parentCell.row, parentCell.column])
        );
      }
    });

    return distinctFilter(result);
  }

  /**
   *
   */
  coordsToA1(coords) {
    return this.stringifyCol(coords[0]) + coords[1];
  }
  /**
   * Stringify column from number to.
   *
   * @param {*} value
   */
  stringifyCol(value) {
    if (typeof value === "string") {
      return value;
    }

    let col = "";

    while (value >= 0) {
      if (value / 26 >= 1) {
        col += String.fromCharCode(64 + Math.floor(value / 26));
        value = value % 26;
      } else {
        col += String.fromCharCode(65 + value);
        value = -1;
      }
    }

    return col;
  }

  /**
   * Register cell reference to the collection.
   *
   * @param {CellReference|object} cellReference Cell reference object.
   */
  registerCellRef(cellReference) {
    if (
      !arrayFilter(this.cellReferences, (cell) => cell.isEqual(cellReference))
        .length
    ) {
      this.cellReferences.push(cellReference);
    }
  }

  /**
   * Remove cell references from the collection.
   *
   * @param {object} start Start visual coordinate.
   * @param {object} end End visual coordinate.
   * @returns {Array} Returns removed cell references.
   */
  removeCellRefsAtRange(
    { row: startRow, column: startColumn },
    { row: endRow, column: endColumn }
  ) {
    const removed = [];

    const rowMatch = (cell) =>
      startRow === void 0 ? true : cell.row >= startRow && cell.row <= endRow;
    const colMatch = (cell) =>
      startColumn === void 0
        ? true
        : cell.column >= startColumn && cell.column <= endColumn;

    this.cellReferences = arrayFilter(this.cellReferences, (cell) => {
      if (rowMatch(cell) && colMatch(cell)) {
        removed.push(cell);

        return false;
      }

      return true;
    });

    return removed;
  }

  /**
   * Reset matrix data.
   */
  reset() {
    this.data.length = 0;
    this.cellReferences.length = 0;
  }
}

export default Matrix;
