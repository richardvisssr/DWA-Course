var express = require("express");
var ws = require("ws");
var http = require("http");
var path = require("path");
var session = require('express-session');

var theExpressApp = express();
var theHttpServer = http.createServer();
var theWebSocketServer = new ws.Server({
  server: theHttpServer,
});

const sessionParser = session({
  saveUninitialized: false,
  secret: "$eCuRiTy",
  resave: false,
});

// code to setup the Express app (middleware, routes) can go here.
theExpressApp.use(express.static(path.join(__dirname, "client-side")));

theExpressApp.use(sessionParser);

theExpressApp.post('/', function(req, res) {
  const { userName } = req.body;

  console.log(`Updating session for user ${userName}`);
  req.session.userName = userName; 
  res.send({ result: 'OK', message: 'Session updated' });
});

theExpressApp.delete('/logout', function(request, response) {
  console.log('Destroying session');
  request.session.destroy(function() {
    response.send({ result: 'OK', message: 'Session destroyed' });
  });
});

// code to setup event listeners for WebSocket communication can go here

theHttpServer.on("upgrade", function (request, socket, head) {
  console.log("Parsing session from request...");

  sessionParser(request, {}, () => {
    if (!request.session.userId) {
      socket.destroy();
      return;
    }
  });

  console.log("Session is parsed!");

  theWebSocketServer.handleUpgrade(request, socket, head, function (ws) {
    theWebSocketServer.emit("connection", ws, request);
  });
});

theWebSocketServer.on("connection", function (socket) {
  //
  // Here we can now use session parameters.
  //

  socket.on("message", function (message) {
    console.log("Message received: " + message);
    socket.send("Message received: " + message);
  });
});

// connect the Express app to all incoming requests on the HTTP server
theHttpServer.on("request", theExpressApp);
theHttpServer.listen(3000, function () {
  console.log("The Server is listening on port 3000.");
});
