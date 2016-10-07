// This file was automatically generated from default.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace zz.views.templates.default.
 */

goog.provide('zz.views.templates.default');

goog.require('soy');
goog.require('soydata');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @suppress {checkTypes|uselessCode}
 */
zz.views.templates.default.dataset = function(opt_data, opt_ignored) {
  return '<div class="' + goog.getCssName('dataset') + '" data-set="' + soy.$$escapeHtml(opt_data.uid) + '"></div>';
};
if (goog.DEBUG) {
  zz.views.templates.default.dataset.soyTemplateName = 'zz.views.templates.default.dataset';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @return {string}
 * @suppress {checkTypes|uselessCode}
 */
zz.views.templates.default.datarow = function(opt_data, opt_ignored) {
  return '<div class="' + goog.getCssName('datarow') + '" data-row="' + soy.$$escapeHtml(opt_data.uid) + '"></div>';
};
if (goog.DEBUG) {
  zz.views.templates.default.datarow.soyTemplateName = 'zz.views.templates.default.datarow';
}
