define(function (require) {

//  require('sinon');

  var server;
  var fakeServer = {

        initialize: function () {

      //Agents fake mocks
      var mocks = {
        AgentOffice1: {
          Code: "XYZ1",
          Regdate: new Date("02/02/2010"),
          Name: "XYZ Office1",
          Address: "XYZ Address1",
          Email: "XYZ@Office1.Com"
        },
        AgentOffice2: {
          Code: "XYZ2",
          Regdate: new Date("02/02/2010"),
          Name: "XYZ Office2",
          Address: "XYZ Address2",
          Email: "XYZ@Office2.Com"
        }
      };

      server = sinon.fakeServer.create();


//      server.respondWith("GET", "http://API.com/Agents/ID/1", [200, { "Content-Type": "application/json" }, JSON.stringify(mocks.AgentOffice1)]);
      server.respondWith("GET", "http://API.com/Agents/ID/2", [200, { "Content-Type": "application/json" }, JSON.stringify(mocks.AgentOffice2)]);

      server.respondWith('GET', '/asdf', [500, { 'Content-Type': 'application/json' }, JSON.stringify(mocks.AgentOffice1)]);
      server.respondWith('POST', '/asdf', [500, { 'Content-Type': 'application/json' }, JSON.stringify({})]);
      server.autoRespond = true;
      server.autoRespondAfter = 20; //every 20 ms, return responses !
      //..........................


    },
    dispose: function () {
      server.restore();
    }

  };

  return fakeServer;

});
