import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.for-each";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.constructor";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/es.string.replace";
import "core-js/modules/web.dom-collections.for-each";
import "core-js/modules/web.dom-collections.iterator";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var testPathRegExp = null;

if ((typeof __ENV_ARGS__ === "undefined" ? "undefined" : _typeof(__ENV_ARGS__)) === 'object' && __ENV_ARGS__.testPathPattern) {
  // Remove string between % signs. On Windows' machines an empty env variable was visible as '%{variable_name}%' so it must be stripped.
  // See https://github.com/handsontable/handsontable/issues/4378).
  var pattern = __ENV_ARGS__.testPathPattern.replace(/^%(.*)%$/, '');

  if (pattern) {
    testPathRegExp = new RegExp(pattern, 'i');
  }
}

[require.context('.', true, /\.spec\.js$/)].forEach(function (req) {
  req.keys().forEach(function (filePath) {
    if (testPathRegExp === null || testPathRegExp instanceof RegExp && testPathRegExp.test(filePath)) {
      req(filePath);
    }
  });
});

require('./MemoryLeakTest');