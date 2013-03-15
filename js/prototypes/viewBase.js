/**
 * from http://addyosmani.github.com/backbone-fundamentals/#common-problems-solutions
 */
define(function (require) {

  //module dependencies
  var Backbone = require('backbone');
  var _ = require('underscore');

  var BaseView = function (options) {
      Backbone.View.apply(this, [options]);
  };

  _.extend(BaseView.prototype, Backbone.View.prototype, {

    initialize: function () {

      //listen for default model events
      if (this.model) {
        //any model attribute changes
        this.listenTo(model, 'change', this.modelChanged);

        //model.destroy() is called
        this.listenTo(model, 'destroy', this.modelDestroyed);

        //request to server started
        this.listenTo(model, 'request', this.modelRequested);

        //model has been synced with server
        this.listenTo(model, 'sync', this.modelSynced);

        //model save call fails on server
        this.listenTo(model, 'error', this.modelError);

        //model validation fails on client
        this.listenTo(model, 'invalid', this.modelInvalid);
      }
    },

    modelChanged: function (model, options) {
      if (this.onModelChanged) {
        this.onModelChanged(model, options);
      }
    },

    modelDestroyed: function (model, collection, options) {
      if (this.onModelDestroyed) {
        this.onModelDestroyed(model, collection, options);
      }
    },

    modelRequested: function (model, xhr, options) {
      if (this.onModelRequested) {
        this.onModelRequested(model, xhr, options);
      }
    },

    modelSynced: function (model, resp, options) {
      if (this.onModelSynced) {
        this.onModelSynced(model, resp, options);
      }
    },

    modelError: function (model, xhr, options) {
      if (this.onModelError) {
        this.onModelError(model, xhr, options);
      }
    },

    modelInvalid: function (model, error, options) {
      if (this.onModelInvalid) {
        this.onModelInvalid(model, error, options);
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
