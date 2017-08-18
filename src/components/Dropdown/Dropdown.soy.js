/* jshint ignore:start */
import Component from 'metal-component';
import Soy from 'metal-soy';
var templates;
goog.loadModule(function(exports) {

// This file was automatically generated from Dropdown.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Dropdown.
 * @public
 */

goog.module('Dropdown.incrementaldom');

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
  ie_open('div', null, null,
      'class', 'dropdown');
    ie_void('span', null, null,
        'class', 'arrow_box');
    ie_open('input', null, null,
        'type', 'text',
        'class', 'dropdown-display ' + (opt_data.warning ? 'input-error' : ''),
        'placeholder', opt_data.activeDropdownItem ? opt_data.activeDropdownItem.name : 'Select your plan',
        'readonly', 'true');
    ie_close('input');
    ie_open('span', null, null,
        'class', 'warning-label ' + (opt_data.warning ? 'show' : ''));
      itext((goog.asserts.assert((opt_data.warning) != null), opt_data.warning));
    ie_close('span');
    ie_open('div', null, null,
        'class', opt_data.shown ? 'dropdown-list-wrapper show' : 'dropdown-list-wrapper');
      ie_open('input', null, null,
          'type', 'text',
          'data-onKeydown', 'bindKeyCode',
          'data-onKeyup', 'searchItem',
          'placeholder', 'Type your search',
          'class', 'dropdown-input');
      ie_close('input');
      ie_open('ul', null, null,
          'class', 'dropdown-list');
        var itemList48 = opt_data.items;
        var itemListLen48 = itemList48.length;
        for (var itemIndex48 = 0; itemIndex48 < itemListLen48; itemIndex48++) {
          var itemData48 = itemList48[itemIndex48];
          ie_open('li', null, null,
              'class', 'dropdown-list-item',
              'data-selected', itemData48.selected,
              'data-id', itemData48.id,
              'data-onClick', 'changeActivePlan');
            itext((goog.asserts.assert((itemData48.name) != null), itemData48.name));
            itext(' (');
            itext((goog.asserts.assert((itemData48.months) != null), itemData48.months));
            itext(' meses)');
          ie_close('li');
        }
      ie_close('ul');
    ie_close('div');
  ie_close('div');
}
exports.render = $render;
if (goog.DEBUG) {
  $render.soyTemplateName = 'Dropdown.render';
}

exports.render.params = ["shown","items","activeDropdownItem","warning"];
exports.render.types = {"shown":"any","items":"any","activeDropdownItem":"any","warning":"any"};
templates = exports;
return exports;

});

class Dropdown extends Component {}
Soy.register(Dropdown, templates);
export { Dropdown, templates };
export default templates;
/* jshint ignore:end */
