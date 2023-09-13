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
    if (res.gameFileReader !== undefined || res.gameFileReader !== null) {
      next();
    }
  } catch (error) {
    return next(error);
  }
};

app.use("/action/:player", gameFileReader);

const errHandler = async (err, req, res, next) => {
  if (err.code === "ENOENT" && err.syscall === "open") {
    res.status(404).json({ error: "Game not found." });
  } else {
    next(err);
  }
};

app.use("/action/:player", errHandler);

const gameStateReader = async (req, res, next) => {
  const gameState = JSON.parse(res.gameFileReader);
  res.game = new Game(gameState);
  res.json(res.game);
  //?????????????????????????
  next();
};

app.use("/action/:player", gameStateReader);

app.get("/action/:player/where", async (req, res) => {
  const locationInformation = await game.getLocationInformation();
  res.json(locationInformation);
});

app.post("/action/:player/goto", async (req, res) => {
  const locationInformation = await game.getLocationInformation();
  res.json(locationInformation);
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
