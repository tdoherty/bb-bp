/**
 * RequireJS Module Definition - AMD 'sugar' syntax
 */
define(function (require) {

  //module dependencies
  var Backbone = require('backbone');
  var View = require('../sandbox/views/simpleView');
  var ModelBinder = require('../components/backbone/Backbone.ModelBinder');
  var template = require('text!../sandbox/templates/simpleView.html');


  return function () {

    module('modelBinder', {
      // This will run before each test in this module.
      setup: function() {

        View = View.extend({
          template: _.template(template),
          render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
          }
        });

        var Model = Backbone.Model.extend({
          validate: function (attrs, options) {
            if (!attrs.name) {
              return "name is required";
            }
          }
        });

        this.model = new Model();

        this.view = new View({
          model: this.model
        });

        this.modelBinder = new ModelBinder();

      },
      teardown: function () {
      }
    });

    test('is model bound', function() {
      expect(2);

      this.model.set({
        firstName: 'jimmy',
        lastName: 'james',
        middleName: 'blueflames'
      });
      this.view.render();
      this.modelBinder.bind(this.view.model, this.view.el);
      this.model.set({
        firstName: 'jimi'
      });

      equal(this.view.$('[name="firstName"]').val(), 'jimi', 'firstName updated from model');

      this.view.$('[name="lastName"]').val('johnson');
      equal(this.view.$('[name="lastName"]').val(), 'johnson', 'lastName updated from DOM');

    });



  };
});
