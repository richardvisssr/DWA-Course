"use strict";

const express = require("express");
const Game = require("./game.js");
const promiseWrappers = require("./promise-wrappers");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

const gameFilesFolderName = "game_files";

app.use(bodyParser.json());

const gameFileReader = async (req, res, next) => {
  //TODO D1, D2
  const fileName = path.join(gameFilesFolderName, `${req.params.player}.json`);
  try {
    res.gameFileReader = await promiseWrappers.readFileP(fileName);
    if (res.gameFileReader !== undefined && res.gameFileReader !== null) {
      next();
    }
  } catch (error) {
    return next(error);
  }
};

app.use("/action/:player", gameFileReader);

const errHandler = (err, req, res, next) => {
  if (err.code === "ENOENT" && err.syscall === "open") {
    res.status(404).json({ error: "Game not found." });
  } else {
    res.status(500).json({ error: "Internal server error." });
  }
};


const gameStateReader = async (req, res, next) => {
  try {
    const gameState = JSON.parse(res.gameFileReader);
    res.game = new Game(gameState);
    next();
  } catch (error) {
    next(error); // Pass errors to the default error handler
  }
};

app.use("/action/:player", errHandler);

app.get("/action/:player/where", gameStateReader, async (req, res) => {
  const locationInformation = await res.game.getLocationInformation();
  res.json(locationInformation);
});

app.post("/action/:player/goto", gameStateReader ,async (req, res) => {
  const locationName = req.query.location; 
  const locationDescription = await res.game.goToLocation(locationName);
  // const locationInformation = await res.game.goToLocation(req.query.player);
  res.json(locationDescription);
});

app.post("/action/:player/arise", async (req, res) => {
  try {
    const game = new Game();
    const body = req.body;
    const newGame = await game.startNew(body.startLocation, body.inventory);
    res.json(newGame);
  } catch (error) {
    res.status(500).json({ error: "Er is een fout opgetreden." });
  }
});

const server = app.listen(3000, () => {
  console.log(`game server started on port ${server.address().port}`);
});
