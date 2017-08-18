/* jshint ignore:start */
import Component from 'metal-component';
import Soy from 'metal-soy';
var templates;
goog.loadModule(function(exports) {

// This file was automatically generated from Calculator.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Calculator.
 * @public
 */

goog.module('Calculator.incrementaldom');

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

var $templateAlias1 = Soy.getTemplate('CalculatorButton.incrementaldom', 'render');


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $render(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  ie_open('div', null, null,
      'class', 'calculator');
    ie_open('section', null, null,
        'class', 'calculator-display ' + (opt_data.warning ? 'input-error' : ''),
        'id', 'calculator-display');
      itext((goog.asserts.assert((opt_data.labelDisplay) != null), opt_data.labelDisplay));
    ie_close('section');
    ie_open('div', null, null,
        'class', 'warning-label ' + (opt_data.warning ? 'show' : ''));
      itext((goog.asserts.assert((opt_data.warning) != null), opt_data.warning));
    ie_close('div');
    ie_open('section', null, null,
        'class', 'calculator-buttons-wrapper');
      ie_open('section', null, null,
          'class', 'calculator-digits');
        var labelList16 = opt_data.labels;
        var labelListLen16 = labelList16.length;
        for (var labelIndex16 = 0; labelIndex16 < labelListLen16; labelIndex16++) {
          var labelData16 = labelList16[labelIndex16];
          $templateAlias1({text: labelData16.text, click: labelData16.clickFn, buttonClass: labelData16.buttonClass}, null, opt_ijData);
        }
      ie_close('section');
      ie_open('section', null, null,
          'class', 'calculator-operators');
        var operatorList23 = opt_data.operators;
        var operatorListLen23 = operatorList23.length;
        for (var operatorIndex23 = 0; operatorIndex23 < operatorListLen23; operatorIndex23++) {
          var operatorData23 = operatorList23[operatorIndex23];
          $templateAlias1({text: operatorData23.text, click: operatorData23.clickFn, buttonClass: operatorData23.buttonClass}, null, opt_ijData);
        }
      ie_close('section');
    ie_close('section');
  ie_close('div');
}
exports.render = $render;
if (goog.DEBUG) {
  $render.soyTemplateName = 'Calculator.render';
}

exports.render.params = ["labels","labelDisplay","operators","warning"];
exports.render.types = {"labels":"any","labelDisplay":"any","operators":"any","warning":"any"};
templates = exports;
return exports;

});

class Calculator extends Component {}
Soy.register(Calculator, templates);
export { Calculator, templates };
export default templates;
/* jshint ignore:end */
