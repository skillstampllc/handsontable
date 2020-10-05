import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.string.replace";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import { requestAnimationFrame, cancelAnimationFrame } from './../helpers/feature';
/**
 * @class Interval
 * @util
 */

var Interval = /*#__PURE__*/function () {
  _createClass(Interval, null, [{
    key: "create",
    value: function create(func, delay) {
      return new Interval(func, delay);
    }
  }]);

  function Interval(func, delay) {
    var _this = this;

    _classCallCheck(this, Interval);

    /**
     * Animation frame request id.
     *
     * @type {number}
     */
    this.timer = null;
    /**
     * Function to invoke repeatedly.
     *
     * @type {Function}
     */

    this.func = func;
    /**
     * Number of milliseconds that function should wait before next call.
     */

    this.delay = parseDelay(delay);
    /**
     * Flag which indicates if interval object was stopped.
     *
     * @type {boolean}
     * @default true
     */

    this.stopped = true;
    /**
     * Interval time (in milliseconds) of the last callback call.
     *
     * @private
     * @type {number}
     */

    this._then = null;
    /**
     * Bounded function `func`.
     *
     * @private
     * @type {Function}
     */

    this._callback = function () {
      return _this.__callback();
    };
  }
  /**
   * Start loop.
   *
   * @returns {Interval}
   */


  _createClass(Interval, [{
    key: "start",
    value: function start() {
      if (this.stopped) {
        this._then = Date.now();
        this.stopped = false;
        this.timer = requestAnimationFrame(this._callback);
      }

      return this;
    }
    /**
     * Stop looping.
     *
     * @returns {Interval}
     */

  }, {
    key: "stop",
    value: function stop() {
      if (!this.stopped) {
        this.stopped = true;
        cancelAnimationFrame(this.timer);
        this.timer = null;
      }

      return this;
    }
    /**
     * Loop callback, fired on every animation frame.
     *
     * @private
     */

  }, {
    key: "__callback",
    value: function __callback() {
      this.timer = requestAnimationFrame(this._callback);

      if (this.delay) {
        var now = Date.now();
        var elapsed = now - this._then;

        if (elapsed > this.delay) {
          this._then = now - elapsed % this.delay;
          this.func();
        }
      } else {
        this.func();
      }
    }
  }]);

  return Interval;
}();

export default Interval;
/**
 * Convert delay from string format to milliseconds.
 *
 * @param {number|string} delay The delay in FPS (frame per second) or number format.
 * @returns {number}
 */

export function parseDelay(delay) {
  var result = delay;

  if (typeof result === 'string' && /fps$/.test(result)) {
    result = 1000 / parseInt(result.replace('fps', '') || 0, 10);
  }

  return result;
}