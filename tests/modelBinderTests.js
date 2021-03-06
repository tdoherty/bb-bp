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

       this.model = new Backbone.Model();

        this.view = new View({
          model: this.model
        });

        this.modelBinder = new ModelBinder();

      },
      teardown: function () {
      }
    });

    test('is model bound', function() {
      expect(4);

      this.model.set({
        firstName: 'jimmy',
        lastName: 'james',
        middleName: 'blueflames',
        education: 'college'
      });
      this.view.render();
      this.modelBinder.bind(this.view.model, this.view.el);
      this.model.set({
        firstName: 'jimi'
      });

      equal(this.view.$('[name="firstName"]').val(), 'jimi', 'firstName updated from model');
      equal(this.view.$('[name="education"][value="college"]').is(':checked'), true, 'education bound to radio button');

      this.view.$('[name="lastName"]').val('johnson').change();
      equal(this.model.get('lastName'), 'johnson', 'lastName updated from DOM');

      this.view.$('[name="education"][value="high school"]').prop('checked', true).change();
      equal(this.model.get('education'), 'high school', 'education updated from DOM');

    });

  };
});
