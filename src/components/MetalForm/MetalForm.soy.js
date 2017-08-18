/* jshint ignore:start */
import Component from 'metal-component';
import Soy from 'metal-soy';
var templates;
goog.loadModule(function(exports) {

// This file was automatically generated from MetalForm.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace MetalForm.
 * @public
 */

goog.module('MetalForm.incrementaldom');

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

var $templateAlias1 = Soy.getTemplate('Calculator.incrementaldom', 'render');

var $templateAlias2 = Soy.getTemplate('Dropdown.incrementaldom', 'render');


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $render(opt_data, opt_ignored, opt_ijData) {
  ie_open('main', null, null,
      'class', 'wrapper');
    ie_open('h1');
      ie_open('span');
        itext('Personal Loan');
      ie_close('span');
      ie_open('small');
        itext('Save and no red tape loan.');
      ie_close('small');
    ie_close('h1');
    ie_open('form', null, null,
        'method', 'post',
        'class', 'loan-form');
      ie_open('fieldset', null, null,
          'class', 'box-calculator');
        $templateAlias1({Listener: opt_data.ApplicationEmitter}, null, opt_ijData);
      ie_close('fieldset');
      ie_open('fieldset', null, null,
          'class', 'box-loan-options');
        ie_open('label', null, null,
            'for', 'select-months');
          ie_open('span', null, null,
              'class', 'caption');
            itext('Months ');
            ie_open('span', null, null,
                'class', 'mandatory-sign');
              itext('*');
            ie_close('span');
          ie_close('span');
          $templateAlias2({shown: '', Listener: opt_data.ApplicationEmitter}, null, opt_ijData);
        ie_close('label');
        ie_open('button', null, null,
            'class', 'button calculate-interest',
            'data-onclick', 'calculateForm');
          itext('Calculate');
        ie_close('button');
        ie_open('label', null, null,
            'for', 'input-total');
          ie_open('span', null, null,
              'class', 'caption');
            itext('Total');
          ie_close('span');
          ie_open('input', null, null,
              'type', 'text',
              'id', 'input-total',
              'disabled', '',
              'placeholder', 'R$: 0,00',
              'readonly', '');
          ie_close('input');
        ie_close('label');
        ie_void('span', null, null,
            'class', 'submit-label');
        ie_open('button', null, null,
            'class', 'get-quot button--filled',
            'data-onclick', 'submitForm',
            'disabled', '');
          itext('Get Quot');
        ie_close('button');
      ie_close('fieldset');
    ie_close('form');
    ie_open('footer', null, null,
        'class', 'site-footer');
      ie_open('div', null, null,
          'class', 'container');
        ie_open('p');
          itext(' Liferay Inc. ');
          ie_open('br');
          ie_close('br');
          itext(' Copyright \u00A9 2016 All Rights Reserved.');
        ie_close('p');
      ie_close('div');
    ie_close('footer');
  ie_close('main');
}
exports.render = $render;
if (goog.DEBUG) {
  $render.soyTemplateName = 'MetalForm.render';
}

exports.render.params = ["ApplicationEmitter"];
exports.render.types = {"ApplicationEmitter":"any"};
templates = exports;
return exports;

});

class MetalForm extends Component {}
Soy.register(MetalForm, templates);
export { MetalForm, templates };
export default templates;
/* jshint ignore:end */
