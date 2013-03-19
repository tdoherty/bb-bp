/**
 * RequireJS Module Definition - AMD 'sugar' syntax
 */
define(function (require) {

  //module dependencies
  var Backbone = require('backbone');
  var View = require('../sandbox/views/simpleView');
  require('../components/rivets/rivets.config');
  var rivets = require('rivets');
  var template = require('text!../sandbox/templates/simpleViewRivets.html');


  return function () {

    module('rivets', {
      // This will run before each test in this module.
      setup: function() {

        View = View.extend({
          template: template,
          render: function () {
            this.$el.html(this.template);
            return this;
          }
        });

       this.model = new Backbone.Model();

        this.view = new View({
          model: this.model
        });

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
      this.rivetsView = rivets.bind(this.view.$el, { person: this.model });

      this.model.set({
        firstName: 'jimi'
      });

      equal(this.view.$('[name="firstName"]').val(), 'jimi', 'firstName updated from model');
      equal(this.view.$('[name="education"][value="college"]').is(':checked'), true, 'education bound to radio button');

      this.view.$('[name="lastName"]').val('johnson').change();
      equal(this.model.get('lastName'), 'johnson', 'lastName updated from DOM');

      this.view.$('[name="education"][value="high school"]').prop('checked', true).change();
      equal(this.model.get('education'), 'high school', 'education updated from DOM');

      this.rivetsView.unbind();
    });

  };
});
