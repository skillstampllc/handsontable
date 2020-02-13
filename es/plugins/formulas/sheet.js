import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.object.keys";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.promise";
import "core-js/modules/es.regexp.constructor";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/es.string.replace";
import "core-js/modules/web.dom-collections.for-each";
import "core-js/modules/web.dom-collections.iterator";
import "core-js/modules/web.timers";
import "regenerator-runtime/runtime";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import { Parser, ERROR_REF, error as isFormulaError } from 'hot-formula-parser';
import { arrayEach, arrayMap } from '../../helpers/array';
import localHooks from '../../mixins/localHooks';
import { mixin } from '../../helpers/object';
import CellValue from './cell/value';
import CellReference from './cell/reference';
import { isFormulaExpression, toUpperCaseFormula } from './utils';
import Matrix from './matrix';
import AlterManager from './alterManager';
var STATE_UP_TO_DATE = 1;
var STATE_NEED_REBUILD = 2;
var STATE_NEED_FULL_REBUILD = 3;
/**
 * Sheet component responsible for whole spreadsheet calculations.
 *
 * @class Sheet
 * @util
 */

var Sheet =
/*#__PURE__*/
function () {
  function Sheet(hot, dataProvider) {
    var _this = this;

    _classCallCheck(this, Sheet);

    /**
     * Handsontable instance.
     *
     * @type {Core}
     */
    this.hot = hot;
    /**
     * Data provider for sheet calculations.
     *
     * @type {DataProvider}
     */

    this.dataProvider = dataProvider;
    /**
     * Instance of {@link https://github.com/handsontable/formula-parser}.
     *
     * @type {Parser}
     */

    this.parser = new Parser();
    /**
     * Instance of {@link Matrix}.
     *
     * @type {Matrix}
     */

    this.matrix = new Matrix(this.hot);
    /**
     * Instance of {@link AlterManager}.
     *
     * @type {AlterManager}
     */

    this.alterManager = new AlterManager(this);
    /**
     * Cell object which indicates which cell is currently processing.
     *
     * @private
     * @type {null}
     */

    this._processingCell = null;
    /**
     *
     * @private
     * @type boolean
     */

    this.useCustomGetCellDependencies = this.hot && this.hot.getSettings().useCustomGetCellDependencies || false;
    /**
     *
     * @private
     * @type {null}
     */

    this._parsedCells = {};
    /**
     * State of the sheet.
     *
     * @type {Number}
     * @private
     */

    this._state = STATE_NEED_FULL_REBUILD;
    this.parser.on('callCellValue', function () {
      return _this._onCallCellValue.apply(_this, arguments);
    });
    this.parser.on('callRangeValue', function () {
      return _this._onCallRangeValue.apply(_this, arguments);
    });
    this.alterManager.addLocalHook('afterAlter', function () {
      return _this._onAfterAlter.apply(_this, arguments);
    });
  }
  /**
   * Recalculate sheet.
   */


  _createClass(Sheet, [{
    key: "recalculate",
    value: function recalculate() {
      switch (this._state) {
        case STATE_NEED_FULL_REBUILD:
          this.recalculateFull();
          break;

        case STATE_NEED_REBUILD:
          this.recalculateOptimized();
          break;

        default:
          break;
      }
    }
    /**
     * AsyncPromises.
     */

  }, {
    key: "allPromiseAsync",
    value: function allPromiseAsync() {
      for (var _len = arguments.length, PromisesList = new Array(_len), _key = 0; _key < _len; _key++) {
        PromisesList[_key] = arguments[_key];
      }

      return new Promise(function _callee2(resolve) {
        var output, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, promise;

        return regeneratorRuntime.async(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                output = [];
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 4;
                _iterator = PromisesList[Symbol.iterator]();

              case 6:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context2.next = 23;
                  break;
                }

                promise = _step.value;
                _context2.prev = 8;
                _context2.t0 = output;
                _context2.next = 12;
                return regeneratorRuntime.awrap(promise.then(function _callee(resolvedData) {
                  return regeneratorRuntime.async(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return regeneratorRuntime.awrap(resolvedData);

                        case 2:
                          return _context.abrupt("return", _context.sent);

                        case 3:
                        case "end":
                          return _context.stop();
                      }
                    }
                  });
                }));

              case 12:
                _context2.t1 = _context2.sent;

                _context2.t0.push.call(_context2.t0, _context2.t1);

                _context2.next = 19;
                break;

              case 16:
                _context2.prev = 16;
                _context2.t2 = _context2["catch"](8);
                return _context2.abrupt("return", output);

              case 19:
                if (output.length === PromisesList.length) resolve(output);

              case 20:
                _iteratorNormalCompletion = true;
                _context2.next = 6;
                break;

              case 23:
                _context2.next = 29;
                break;

              case 25:
                _context2.prev = 25;
                _context2.t3 = _context2["catch"](4);
                _didIteratorError = true;
                _iteratorError = _context2.t3;

              case 29:
                _context2.prev = 29;
                _context2.prev = 30;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 32:
                _context2.prev = 32;

                if (!_didIteratorError) {
                  _context2.next = 35;
                  break;
                }

                throw _iteratorError;

              case 35:
                return _context2.finish(32);

              case 36:
                return _context2.finish(29);

              case 37:
              case "end":
                return _context2.stop();
            }
          }
        }, null, null, [[4, 25, 29, 37], [8, 16], [30,, 32, 36]]);
      });
    }
    /**
     * Recalculate sheet using optimized methods (fast recalculation).
     */

  }, {
    key: "recalculateOptimized",
    value: function recalculateOptimized() {
      var _this2 = this;

      var cells = this.matrix.getOutOfDateCells();
      var promisses = [];
      this._parsedCells = {};
      this.matrix.data.forEach(function (cell) {
        if (cell.state === 3 && Object.keys(cell.precedentsList).length > 0) {
          _this2._parsedCells[cell.key] = cell.value;
        }
      });
      arrayEach(cells, function (cellValue) {
        var value = _this2.dataProvider.getSourceDataAtCell(cellValue.row, cellValue.column);

        if (isFormulaExpression(value)) {
          if (_this2.useCustomGetCellDependencies) {
            _this2.parseExpression(cellValue, value.substr(1));
          } else {
            promisses.push(new Promise(function (resolve) {
              setTimeout(function () {
                _this2.parseExpression(cellValue, value.substr(1));

                resolve();
              }, 10);
            }));
          }
        }
      });

      if (!this.useCustomGetCellDependencies) {
        promisses.push(new Promise(function (resolve) {
          setTimeout(function () {
            _this2.hot.render();

            resolve();
          }, 10);
        }));
        this.allPromiseAsync(promisses);
      }

      this._state = STATE_UP_TO_DATE;
      this._parsedCells = {};
      this.runLocalHooks('afterRecalculate', cells, 'optimized');
    }
    /**
     * Recalculate whole table by building dependencies from scratch (slow recalculation).
     */

  }, {
    key: "recalculateFull",
    value: function recalculateFull() {
      var _this3 = this;

      var cells = this.dataProvider.getSourceDataByRange();
      this.matrix.reset();
      this._parsedCells = {};
      arrayEach(cells, function (rowData, row) {
        arrayEach(rowData, function (value, column) {
          if (isFormulaExpression(value)) {
            _this3.parseExpression(new CellValue(row, column), value.substr(1));
          }
        });
      });
      this._state = STATE_UP_TO_DATE;
      this._parsedCells = {};
      this.runLocalHooks('afterRecalculate', cells, 'full');
    }
    /**
     * Set predefined variable name which can be visible while parsing formula expression.
     *
     * @param {String} name Variable name.
     * @param {*} value Variable value.
     */

  }, {
    key: "setVariable",
    value: function setVariable(name, value) {
      this.parser.setVariable(name, value);
    }
    /**
     * Get variable name.
     *
     * @param {String} name Variable name.
     * @returns {*}
     */

  }, {
    key: "getVariable",
    value: function getVariable(name) {
      return this.parser.getVariable(name);
    }
    /**
     * Apply changes to the sheet.
     *
     * @param {Number} row Physical row index.
     * @param {Number} column Physical column index.
     * @param {*} newValue Current cell value.
     */

  }, {
    key: "applyChanges",
    value: function applyChanges(row, column, newValue) {
      // Remove formula description for old expression
      // TODO: Move this to recalculate()
      this.matrix.remove({
        row: row,
        column: column
      }); // TODO: Move this to recalculate()

      if (isFormulaExpression(newValue)) {
        // ...and create new for new changed formula expression
        this.parseExpression(new CellValue(row, column), newValue.substr(1));
      }

      var deps = [];
      var maxDependenciesDeep = this.hot && this.hot.getSettings().maxDependenciesDeep > -1 ? this.hot.getSettings().maxDependenciesDeep : -1;

      if (maxDependenciesDeep !== 0) {
        deps = this.getCellDependencies(this.hot.toVisualRow(row), this.hot.toVisualColumn(column));
      }

      arrayEach(deps, function (cellValue) {
        cellValue.setState(CellValue.STATE_OUT_OFF_DATE);
      });
      this._state = STATE_NEED_REBUILD;
    }
    /**
     * Parse and evaluate formula for provided cell.
     *
     * @param {CellValue|Object} cellValue Cell value object.
     * @param {String} formula Value to evaluate.
     */

  }, {
    key: "parseExpression",
    value: function parseExpression(cellValue, formula) {
      var _this4 = this;

      cellValue.setState(CellValue.STATE_COMPUTING);
      this._processingCell = cellValue;
      var oldFormula = toUpperCaseFormula(formula);
      var newFormula = toUpperCaseFormula(formula);
      Object.keys(this._parsedCells).forEach(function (cell) {
        if (_this4._parsedCells[cell]) {
          newFormula = newFormula.replace(new RegExp("".concat(cell, "+")), "".concat(_this4._parsedCells[cell]));
          newFormula = newFormula.replace(new RegExp("".concat(cell, ",")), "".concat(_this4._parsedCells[cell], ","));
          newFormula = newFormula.replace(new RegExp("".concat(cell, "$")), "".concat(_this4._parsedCells[cell]));
        }
      });

      var _this$parser$parse = this.parser.parse(toUpperCaseFormula(formula)),
          error = _this$parser$parse.error,
          result = _this$parser$parse.result;

      if (result && !this._parsedCells[cellValue.key]) {
        this._parsedCells[cellValue.key] = result;
      }

      if (isFormulaExpression(result)) {
        this.parseExpression(cellValue, result.substr(1));
      } else {
        cellValue.setValue(result);
        cellValue.setError(error);
        cellValue.setState(CellValue.STATE_UP_TO_DATE);
      }

      cellValue.setPrecedents("=" + toUpperCaseFormula(formula));
      this.matrix.add(cellValue);
      this._processingCell = null;
    }
    /**
     * Get cell value object at specified physical coordinates.
     *
     * @param {Number} row Physical row index.
     * @param {Number} column Physical column index.
     * @returns {CellValue|undefined}
     */

  }, {
    key: "getCellAt",
    value: function getCellAt(row, column) {
      return this.matrix.getCellAt(row, column);
    }
    /**
     * Get cell dependencies at specified physical coordinates.
     *
     * @param {Number} row Physical row index.
     * @param {Number} column Physical column index.
     * @returns {Array}
     */

  }, {
    key: "getCellDependencies",
    value: function getCellDependencies(row, column) {
      return this.useCustomGetCellDependencies ? this.matrix.getDependenciesCustom({
        row: row,
        column: column
      }) : this.matrix.getDependencies({
        row: row,
        column: column
      });
    }
    /**
     * Listener for parser cell value.
     *
     * @private
     * @param {Object} cellCoords Cell coordinates.
     * @param {Function} done Function to call with valid cell value.
     */

  }, {
    key: "_onCallCellValue",
    value: function _onCallCellValue(_ref, done) {
      var row = _ref.row,
          column = _ref.column;
      var cell = new CellReference(row, column);

      if (!this.dataProvider.isInDataRange(cell.row, cell.column)) {
        throw Error(ERROR_REF);
      }

      this.matrix.registerCellRef(cell);

      this._processingCell.addPrecedent(cell);

      var cellValue = this.dataProvider.getRawDataAtCell(row.index, column.index);

      if (isFormulaError(cellValue)) {
        var computedCell = this.matrix.getCellAt(row.index, column.index);

        if (computedCell && computedCell.hasError()) {
          throw Error(cellValue);
        }
      }

      if (isFormulaExpression(cellValue)) {
        var _this$parser$parse2 = this.parser.parse(cellValue.substr(1)),
            error = _this$parser$parse2.error,
            result = _this$parser$parse2.result;

        if (error) {
          throw Error(error);
        }

        done(result);
      } else {
        done(cellValue);
      }
    }
    /**
     * Listener for parser cells (range) value.
     *
     * @private
     * @param {Object} startCell Cell coordinates (top-left corner coordinate).
     * @param {Object} endCell Cell coordinates (bottom-right corner coordinate).
     * @param {Function} done Function to call with valid cells values.
     */

  }, {
    key: "_onCallRangeValue",
    value: function _onCallRangeValue(_ref2, _ref3, done) {
      var _this5 = this;

      var startRow = _ref2.row,
          startColumn = _ref2.column;
      var endRow = _ref3.row,
          endColumn = _ref3.column;
      var cellValues = this.dataProvider.getRawDataByRange(startRow.index, startColumn.index, endRow.index, endColumn.index);

      var mapRowData = function mapRowData(rowData, rowIndex) {
        return arrayMap(rowData, function (cellData, columnIndex) {
          var rowCellCoord = startRow.index + rowIndex;
          var columnCellCoord = startColumn.index + columnIndex;
          var cell = new CellReference(rowCellCoord, columnCellCoord);

          if (!_this5.dataProvider.isInDataRange(cell.row, cell.column)) {
            throw Error(ERROR_REF);
          }

          _this5.matrix.registerCellRef(cell);

          _this5._processingCell.addPrecedent(cell);

          var newCellData = cellData;

          if (isFormulaError(newCellData)) {
            var computedCell = _this5.matrix.getCellAt(cell.row, cell.column);

            if (computedCell && computedCell.hasError()) {
              throw Error(newCellData);
            }
          }

          if (isFormulaExpression(newCellData)) {
            var _this5$parser$parse = _this5.parser.parse(newCellData.substr(1)),
                error = _this5$parser$parse.error,
                result = _this5$parser$parse.result;

            if (error) {
              throw Error(error);
            }

            newCellData = result;
          }

          return newCellData;
        });
      };

      var calculatedCellValues = arrayMap(cellValues, function (rowData, rowIndex) {
        return mapRowData(rowData, rowIndex);
      });
      done(calculatedCellValues);
    }
    /**
     * On after alter sheet listener.
     *
     * @private
     */

  }, {
    key: "_onAfterAlter",
    value: function _onAfterAlter() {
      this.recalculateOptimized();
    }
    /**
     * Destroy class.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.hot = null;
      this.dataProvider.destroy();
      this.dataProvider = null;
      this.alterManager.destroy();
      this.alterManager = null;
      this.parser = null;
      this.matrix.reset();
      this.matrix = null;
    }
  }]);

  return Sheet;
}();

mixin(Sheet, localHooks);
export default Sheet;