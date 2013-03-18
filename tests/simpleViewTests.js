/**
 * RequireJS Module Definition - AMD 'sugar' syntax
 */
define(function (require) {

  //module dependencies
  var Backbone = require('backbone');
  var View = require('../sandbox/views/simpleView');

  var init = View.prototype.initialize;

  return function () {

    module('simpleView', {
      // This will run before each test in this module.
      setup: function() {

        this.server = sinon.fakeServer.create();
        this.server.respondWith('GET', '/asdf',
          [200, { 'Content-Type': 'application/json' },
          JSON.stringify({ id: 1, name: 'asdf'})]
        );
        this.server.respondWith('POST', '/asdf',
          [500, { 'Content-Type': 'application/json' },
            JSON.stringify({})]);

        var self = this;
        View.prototype.initialize = function () {

          //built-in events
          self.spy(this, 'onModelChanged');
          self.spy(this, 'onModelRequested');
          self.spy(this, 'onModelSynced');
          self.spy(this, 'onModelError');
          self.spy(this, 'onModelInvalid');
          self.spy(this, 'onModelDestroyed');
          self.spy(this, 'onClose');
          self.spy(this, 'close');

          //from the events hash
          self.spy(this, 'onViewClicked');

          init.call(this, arguments);
        };

        var Model = Backbone.Model.extend({
          validate: function (attrs, options) {
            if (!attrs.name) {
              return "name is required";
            }
          }
        });

        this.model = new Model();
      },
      teardown: function () {
        this.server.restore();
      }
    });

    test('is listening', function() {
      expect(9);

      var view = new View({model: this.model});

      //onModelChanged
      this.model.set({ id: 1});
      ok(view.onModelChanged.calledOnce, 'onModelChanged called once');

      //onModelInvalid
      this.model.set({ name: null});
      this.model.set({ id: 2 }, { validate: true });
      ok(view.onModelInvalid.calledOnce, 'onModelInvalid called once');

      //onModelRequested
      //onModelSynced
      this.model.url = '/asdf';
      this.model.fetch();
      this.server.respond();
      ok(view.onModelRequested.calledOnce, 'onModelRequested called once');
      ok(view.onModelSynced.calledOnce, 'onModelSynced called once');

      //onModelSaved
      this.model.save();
      this.server.respond();
      ok(view.onModelError.calledOnce, 'onModelError called once');

      //onModelDestroyed
      this.model.destroy();
      ok(view.onModelDestroyed.calledOnce, 'onModelDestroyed called once');

      //onViewClicked
      view.$el.click();
      ok(view.onViewClicked.calledOnce, 'onViewClicked called once');

      //close, onClose
      view.close();
      ok(view.onClose.calledOnce, 'onClose called once');
      ok(view.close.calledOnce, 'close called once');

    });

    test('is not listening', function () {
      expect(9);
      var view = new View({model: this.model});

      //close, onClose
      view.close();
      ok(view.onClose.calledOnce, 'onClose called once');
      ok(view.close.calledOnce, 'close called once');

      //onModelChanged
      this.model.set({ id: 1});

      ok(view.onModelChanged.notCalled, 'onModelChanged not called');
      //onModelRequested
      this.model.url = '/asdf';
      this.model.fetch();
      this.server.respond();
      ok(view.onModelRequested.notCalled, 'onModelRequested not called');
      //onModelSynced
      ok(view.onModelSynced.notCalled, 'onModelSynced not called');

      //onModelError
      this.model.save();
      this.server.respond();
      ok(view.onModelError.notCalled, 'onModelError not called');

      //onModelInvalid
      ok(view.onModelInvalid.notCalled, 'onModelInvalid not called');
      //onModelDestroyed

      this.model.destroy();
      ok(view.onModelDestroyed.notCalled, 'onModelDestroyed not called');

      //onViewClicked
      view.$el.click();
      ok(view.onViewClicked.notCalled, 'onViewClicked not called');

    });

  };
});
