const FunctionPlugin = require('hyperformula').FunctionPlugin;

export default class HFValueFunction extends FunctionPlugin {
  static implementedFunctions = {
    VALUE: {
      method: 'value'
    }
  };

  constructor(args) {
    super(args);
    this.cache = {};
  }

  /** .........
   * VALUE.
   *
   * @param { any } value A value.
   * @returns {*|number}
   */
  value(value) {
    return parseFloat(value);
  }
}
