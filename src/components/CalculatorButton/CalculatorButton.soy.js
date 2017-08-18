/* jshint ignore:start */
import Component from 'metal-component';
import Soy from 'metal-soy';
var templates;
goog.loadModule(function(exports) {

// This file was automatically generated from CalculatorButton.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace CalculatorButton.
 * @public
 */

goog.module('CalculatorButton.incrementaldom');

/** @suppress {extraRequire} */
var soy = goog.require('soy');
/** @suppress {extraRequire} */
var soydata = goog.require('soydata');
/** @suppress {extraRequire} */
goog.require('goog.i18n.bidi');
/** @suppress {extraRequire} */
goog.require('goog.asserts');
var IncrementalDom = goog.require('incrementaldom');
var ie_open = IncrementalDom.elementOpen;
var ie_close = IncrementalDom.elementClose;
var ie_void = IncrementalDom.elementVoid;
var ie_open_start = IncrementalDom.elementOpenStart;
var ie_open_end = IncrementalDom.elementOpenEnd;
var itext = IncrementalDom.text;
var iattr = IncrementalDom.attr;


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $render(opt_data, opt_ignored, opt_ijData) {
  ie_open('button', null, null,
      'data-text', opt_data.text,
      'class', '\t' + (opt_data.buttonClass ? opt_data.buttonClass : 'calculator-button'),
      'data-onClick', opt_data.click);
    itext((goog.asserts.assert((opt_data.text) != null), opt_data.text));
  ie_close('button');
}
exports.render = $render;
if (goog.DEBUG) {
  $render.soyTemplateName = 'CalculatorButton.render';
}

exports.render.params = ["buttonClass","text","click"];
exports.render.types = {"buttonClass":"any","text":"any","click":"any"};
templates = exports;
return exports;

});

class CalculatorButton extends Component {}
Soy.register(CalculatorButton, templates);
export { CalculatorButton, templates };
export default templates;
/* jshint ignore:end */
