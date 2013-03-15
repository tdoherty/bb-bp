/**
 * RequireJS Module Definition - AMD 'sugar' syntax
 */
define(function (require) {

  //module dependencies
  var Backbone = require('backbone');
  var View = require('./collectionView');

  var init = View.prototype.initialize;

  return function () {

    module('collectionView', {
      // This will run before each test in this module.
      setup: function() {

        this.server = sinon.fakeServer.create();
        this.server.respondWith('GET', '/asdf',
          [200, { 'Content-Type': 'application/json' },
          JSON.stringify([{ id: 1, name: 'asdf'}, { id: 2, name: 'qwer'}])]
        );

        var self = this;
        View.prototype.initialize = function () {
          self.spy(this, 'onAdd');
          self.spy(this, 'onRemove');
          self.spy(this, 'onReset');
          self.spy(this, 'onSync');
          self.spy(this, 'onDestroy');
          self.spy(this, 'onSort');
          self.spy(this, 'onClose');
          self.spy(this, 'close');

          init.call(this, arguments);
        };

        var Collection = Backbone.Collection.extend({});
        this.collection = new Collection();
        this.collection.comparator = function (item) {
          return item.get('id');
        }
      },
      teardown: function () {
        this.server.restore();
      }
    });

    test('is listening', function() {
      expect(8);

      var view = new View({collection: this.collection});

      //onSync
      //onReset
      this.collection.url = '/asdf';
      this.collection.fetch();
      this.server.respond();
      ok(view.onSync.calledOnce, 'onSync called once');
      ok(view.onReset.calledOnce, 'onReset called once');

      //onRemove
      var model = this.collection.at(0);
      this.collection.remove(model);
      ok(view.onRemove.calledOnce, 'onRemove called once');

      //onAdd
      //onSort
      this.collection.add({
        id: 4,
        name: 'zxcv'
      });
      ok(view.onAdd.calledOnce, 'onAdd called once');
      ok(view.onSort.calledOnce, 'onSort called once');

      //onDestroy
      model = this.collection.get(4);
      model.destroy();
      ok(view.onDestroy.calledOnce, 'onDestroy called once');

      //close, onClose
      view.close();
      ok(view.onClose.calledOnce, 'onClose called once');
      ok(view.close.calledOnce, 'close called once');

    });

    test('is not listening', function () {
      expect(8);
      var view = new View({model: this.model});

      //close, onClose
      view.close(); //removes event listeners, so above should pass
      ok(view.onClose.calledOnce, 'onClose called once');
      ok(view.close.calledOnce, 'close called once');

            //onSync
      //onReset
      this.collection.url = '/asdf';
      this.collection.fetch();
      this.server.respond();
      ok(view.onSync.notCalled, 'onSync not called');
      ok(view.onReset.notCalled, 'onReset not called');

      //onRemove
      var model = this.collection.at(0);
      this.collection.remove(model);
      ok(view.onRemove.notCalled, 'onRemove not called');

      //onAdd
      //onSort
      this.collection.add({
        id: 4,
        name: 'zxcv'
      });
      ok(view.onAdd.notCalled, 'onAdd not called');
      ok(view.onSort.notCalled, 'onSort not called');

      //onDestroy
      model = this.collection.get(4);
      model.destroy();
      ok(view.onDestroy.notCalled, 'onDestroy not called');

    });

  };
});
