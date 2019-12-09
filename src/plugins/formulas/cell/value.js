import { ERROR_REF } from 'hot-formula-parser';
import { arrayFilter } from '../../../helpers/array';
import BaseCell from './_base';

const STATE_OUT_OFF_DATE = 1;
const STATE_COMPUTING = 2;
const STATE_UP_TO_DATE = 3;
const states = [STATE_OUT_OFF_DATE, STATE_COMPUTING, STATE_UP_TO_DATE];

/**
 * Class responsible for wrapping formula expression. It contains calculated value of
 * the formula, an error if it has happened and cell references which indicates a relationship with regular
 * cells. This object uses physical cell coordinates.
 *
 * @class CellValue
 * @util
 */
class CellValue extends BaseCell {
  /**
   * Out of date state indicates cells ready for recomputing.
   *
   * @returns {Number}
   */
  static get STATE_OUT_OFF_DATE() {
    return 1; // PhantomJS crashes when we want to use constant above
  }

  /**
   * Computing state indicates cells under processing.
   *
   * @returns {Number}
   */
  static get STATE_COMPUTING() {
    return 2; // PhantomJS crashes when we want to use constant above
  }

  /**
   * Up to date state indicates cells with fresh computed value.
   *
   * @returns {Number}
   */
  static get STATE_UP_TO_DATE() {
    return 3; // PhantomJS crashes when we want to use constant above
  }

  constructor(row, column) {
    super(row, column);

    /**
     * List of precedents cells.
     *
     * @type {Array}
     */
    this.precedents = [];

    /**
     * List of precedents cells.
     *
     * @type {Array}
     */
    this.precedentsList = {};
    
    /**
     * Computed value.
     *
     * @type {*}
     */
    this.value = null;
    /**
     * Error name.
     *
     * @type {String|null}
     */
    this.error = null;
    /**
     * Indicates cell state.
     *
     * @type {String}
     */
    this.state = CellValue.STATE_UP_TO_DATE;
  }

  /**
   * Set computed value.
   *
   * @param {*} value
   */
  setValue(value) {
    this.value = value;
  }

  /**
   * Parse column name to number.
   *
   * @param {*} value
   */
  parseCol(value) {
    if (typeof value === 'number') {
      return value;
    }

    let coord = -1;
    for (let i = 0; i < value.length; i++) {
      coord += (value[i].charCodeAt(0) - 64) * Math.pow(26, value.length - 1 - i);
    }
    return coord;
  }

  /**
   * Stringify column from number to.
   *
   * @param {*} value
   */
  stringifyCol(value) {
    if (typeof value === 'string') {
      return value;
    }

    let col = '';

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
   * Parse precedents without deep.
   *
   * @param {*} value
   */
  setPrecedents(value) {
    let precedents = {};

    if (!value || typeof value === 'number' || value[0] !== '=') {
      return {};
    }

    let regex = /(\$?[A-Z]+\$?[0-9]+:\$?[A-Z]+\$?[0-9]+)|(\$?[A-Z]+\$?[0-9]+)/g;

    try {
      (value.match(regex) || []).forEach(cell => {
        if(cell.indexOf(':') > -1) {
          let [startCell, endCell] = cell.split(':');
          startCell = startCell.match(/(\D+)(\d+)/);
          endCell = endCell.match(/(\D+)(\d+)/);

          for(let i = this.parseCol(startCell[1]); i <= this.parseCol(endCell[1]); i++) {
            for(let j = startCell[2]; j <=endCell[2]; j++) {
              let newCell = `${this.stringifyCol(i)}${j}`;
              if(!precedents[newCell]) {
                precedents[newCell] = newCell;
              }
            }
          }
        } else {
          if(!precedents[cell]) {
            precedents[cell] = cell;
          }
        }
      });
    } catch (e) {
      console.log('e',e);
    }

    this.precedentsList = precedents;
  }

  /**
   * Get computed value.
   *
   * @returns {*}
   */
  getValue() {
    return this.value;
  }

  /**
   * Set error message for this cell.
   *
   * @param {String} error Error name.
   */
  setError(error) {
    this.error = error;
  }

  /**
   * Get error name for this cell.
   *
   * @returns {String|null}
   */
  getError() {
    return this.error;
  }

  /**
   * Check if cell value is marked as error.
   *
   * @returns {Boolean}
   */
  hasError() {
    return this.error !== null;
  }

  /**
   * Set cell state.
   *
   * @param {Number} state Cell state.
   */
  setState(state) {
    if (states.indexOf(state) === -1) {
      throw Error(`Unrecognized state: ${state}`);
    }
    this.state = state;
  }

  /**
   * Check cell state.
   *
   * @returns {Boolean}
   */
  isState(state) {
    return this.state === state;
  }

  /**
   * Add precedent cell to the collection.
   *
   * @param {CellReference} cellReference Cell reference object.
   */
  addPrecedent(cellReference) {
    if (this.isEqual(cellReference)) {
      throw Error(ERROR_REF);
    }
    if (!this.hasPrecedent(cellReference)) {
      this.precedents.push(cellReference);
    }
  }

  /**
   * Remove precedent cell from the collection.
   *
   * @param {CellReference} cellReference Cell reference object.
   */
  removePrecedent(cellReference) {
    if (this.isEqual(cellReference)) {
      throw Error(ERROR_REF);
    }
    this.precedents = arrayFilter(this.precedents, cell => !cell.isEqual(cellReference));
  }

  /**
   * Clear all precedent cells.
   */
  clearPrecedents() {
    this.precedents.length = 0;
  }

  /**
   * Get precedent cells.
   *
   * @returns {Array}
   */
  getPrecedents() {
    return this.precedents;
  }

  /**
   * Check if cell value has precedents cells.
   *
   * @returns {Boolean}
   */
  hasPrecedents() {
    return this.precedents.length > 0;
  }

  /**
   * Check if cell reference is precedents this cell.
   *
   * @param {CellReference} cellReference Cell reference object.
   * @returns {Boolean}
   */
  hasPrecedent(cellReference) {
    return arrayFilter(this.precedents, cell => cell.isEqual(cellReference)).length > 0;
  }
}

export default CellValue;
