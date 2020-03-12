import "core-js/modules/es.array.concat";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.string.replace";
import { empty, fastInnerText } from './../helpers/dom/element';
import { stringify } from './../helpers/mixed';
import { getRenderer } from './index';
/**
 * Default text renderer
 *
 * @private
 * @renderer TextRenderer
 * @param {Object} instance Handsontable instance
 * @param {Element} TD Table cell where to render
 * @param {Number} row
 * @param {Number} col
 * @param {String|Number} prop Row object property name
 * @param value Value to render (remember to escape unsafe HTML before inserting to DOM!)
 * @param {Object} cellProperties Cell properties (shared by cell renderer and editor)
 */

function textRenderer(instance, TD, row, col, prop, value, cellProperties) {
  for (var _len = arguments.length, args = new Array(_len > 7 ? _len - 7 : 0), _key = 7; _key < _len; _key++) {
    args[_key - 7] = arguments[_key];
  }

  getRenderer('base').apply(this, [instance, TD, row, col, prop, value, cellProperties].concat(args));
  var escaped = value;

  if (!escaped && cellProperties.placeholder) {
    escaped = cellProperties.placeholder;
  }

  escaped = stringify(escaped);

  if (!instance.getSettings().trimWhitespace) {
    escaped = escaped.replace(/ /g, String.fromCharCode(160));
  }

  if (cellProperties.rendererTemplate) {
    empty(TD);
    var TEMPLATE = instance.rootDocument.createElement('TEMPLATE');
    TEMPLATE.setAttribute('bind', '{{}}');
    TEMPLATE.innerHTML = cellProperties.rendererTemplate;
    HTMLTemplateElement.decorate(TEMPLATE);
    TEMPLATE.model = instance.getSourceDataAtRow(row);
    TD.appendChild(TEMPLATE);
  } else {
    // this is faster than innerHTML. See: https://github.com/handsontable/handsontable/wiki/JavaScript-&-DOM-performance-tips
    fastInnerText(TD, escaped);
  }
}

export default textRenderer;