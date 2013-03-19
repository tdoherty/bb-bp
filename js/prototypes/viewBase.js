/**
 * Based on http://addyosmani.github.com/backbone-fundamentals/#common-problems-solutions
 * - new default events in Backbone 0.9.10 or higher
 */
define(function (require) {

  //module dependencies
  var Backbone = require('backbone');
  var _ = require('underscore');

  var BaseView = function (options) {
    Backbone.View.apply(this, [options]);
  };

  //favor composition over inheritance
  _.extend(BaseView.prototype, Backbone.View.prototype, {

    initialize: function () {

      //listen for default model events
      if (this.model) {

        //any model attribute changes
        if (this.onModelChanged) {
          this.listenTo(this.model, 'change', this.onModelChanged);
        }

        //model.destroy() is called
        if (this.onModelDestroyed) {
          this.listenTo(this.model, 'destroy', this.onModelDestroyed);
        }

        //request to server started
        if (this.onModelRequested) {
          this.listenTo(this.model, 'request', this.onModelRequested);
        }

        //model has been synced with server
        if (this.onModelSynced) {
          this.listenTo(this.model, 'sync', this.onModelSynced);
        }

        //model save call fails on server
        if (this.onModelError) {
          this.listenTo(this.model, 'error', this.onModelError);
        }

        //model validation fails on client
        if (this.onModelInvalid) {
          this.listenTo(this.model, 'invalid', this.onModelInvalid);
        }
      }
    },

    close: function () {
      // as of backbone 0.9.10 we have .stopListening() which will be called automatically here, as long as we use
      // .listenTo() we don't need to unbind listeners
      if (this.onClose) {
        this.onClose();
      }
      this.remove(); // uses the default Backbone.View.remove() method which removes this.el from the DOM and removes DOM events.
    }

  });

  BaseView.extend = Backbone.View.extend;

  return BaseView;
});
