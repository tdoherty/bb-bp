/**
 * from http://addyosmani.github.com/backbone-fundamentals/#common-problems-solutions
 */
define(function (require) {

  //module dependencies
  var Backbone = require('backbone');
  var _ = require('underscore');

  var BaseCollectionView = function (options) {
    Backbone.View.apply(this, [options]);
  };

  //favor composition over inheritance
  _.extend(BaseCollectionView.prototype, Backbone.View.prototype, {

    initialize: function () {

      //listen for default model events
      if (this.collection) {

        //model added to collection
        if (this.onAdd) {
          this.listenTo(this.collection, 'add', this.onAdd);
        }

        //model removed from collection
        if (this.onRemove) {
          this.listenTo(this.collection, 'remove', this.onRemove);
        }

        //collection synced
        if (this.onSync) {
          this.listenTo(this.collection, 'sync', this.onSync);
        }

        //collection reset
        if (this.onReset) {
          this.listenTo(this.collection, 'reset', this.onReset);
        }

        //collection re-sorted
        if (this.onSort) {
          this.listenTo(this.collection, 'sort', this.onSort);
        }

        //model destroyed
        if (this.onDestroy) {
          this.listenTo(this.collection, 'destroy', this.onDestroy);
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

  BaseCollectionView.extend = Backbone.View.extend;

  return BaseCollectionView;
});
