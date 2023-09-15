// app.js
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const game= require("./routes/games");
const actionsRouter = require("./routes/actions");

app.use(bodyParser.json());

// Use the gameRouter for game file management routes
app.use("/game", game);

// Use the actionsRouter for in-game actions routes
app.use("/", actionsRouter);

const server = app.listen(3000, () => {
  console.log(`game server started on port ${server.address().port}`);
});
