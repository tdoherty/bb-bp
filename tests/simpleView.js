/**
 * RequireJS Module Definition - AMD 'sugar' syntax
 */
define(function (require) {

  //module dependencies
  var BaseView = require('../js/prototypes/viewBase');

  return BaseView.extend({

    modelChanged: false,
    modelDestroyed: false,
    modelRequested: false,
    modelSynced: false,
    modelError: false,
    modelInvalid: false,

    onModelChanged: function () {
      this.modelChanged = true;
    },
    onModelDestroyed: function () {
      this.modelDestroyed = true;
    },
    onModelRequested: function () {
      this.modelRequested = true;
    },
    onModelSynced: function () {
      this.modelSynced = true;
    },
    onModelError: function () {
      this.modelError = true;
    },
    onModelInvalid: function () {
      this.modelInvalid = true;
    },
    onClose: function () {
      console.log('onclose');
    }
  });
});
