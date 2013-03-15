require(
  {
    baseUrl: '',
    paths: {
      'jquery': '../components/jquery/jquery.min',
      'text': '../components/requirejs-text/text',
      'backbone': '../components/backbone/backbone-min',
      'underscore': '../components/underscore/underscore-min'
    },
    shim: {
      'backbone': {
        deps: ['underscore'],
        exports: 'Backbone'
      },
      'underscore': {
        exports: '_'
      }
    }
  },
  [
  ],
  function () {
  }
);