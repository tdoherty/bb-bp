require(
  {
    baseUrl: '',
    paths: {
      'jquery': '../components/jquery/jquery.min',
      'text': '../components/requirejs-text/text',
      'backbone': '../components/backbone/backbone',
      'underscore': '../components/underscore/underscore-min',
      'sinon': '../components/sinon/sinon-1.6.0'
    },
    shim: {
      'backbone': {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
      },
      'underscore': {
        exports: '_'
      }
    }
  },
  [
    'simpleViewTests',
    'collectionViewTests',
    'modelBinderTests'
  ],
  function (simpleViewTests, collectionViewTests, modelBinderTests) {

    simpleViewTests();
    collectionViewTests();
    modelBinderTests();

  }
);