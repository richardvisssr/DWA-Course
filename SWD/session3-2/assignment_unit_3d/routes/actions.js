// actionsRouter.js
const express = require("express");
const router = express.Router();
const Game = require("../game.js");
const promiseWrappers = require("../promise-wrappers");

const gameStateReader = async (req, res, next) => {
    try {
      // Check if req.fileContent is not undefined and is a non-empty string
      if (typeof req.fileContent === 'string' && req.fileContent.trim() !== '') {
        const gameState = JSON.parse(req.fileContent);
        const game = new Game(gameState);
        next();
      } else {
        // Handle the case where the JSON data is empty or undefined
        throw new Error('Invalid JSON data');
      }
    } catch (error) {
      next(error); // Pass errors to the default error handler
    }
  };
  

router.get("/listPlayerFiles", async (req, res) => {
  try {
    const files = await promiseWrappers.readdirP("game_files");
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: "Er is een fout opgetreden." });
  }
});

router.delete("/deletePlayerFile/:player", async (req, res) => {
  try {
    const fileName = `game_files/${req.params.player}.json`;
    const file = await promiseWrappers.unlinkFileP(fileName);
    res.json(file);
  } catch (error) {
    res.status(500).json({ error: "Er is een fout opgetreden." });
  }
});

router.post("/createPlayerFile/:player", async (req, res) => {
  try {
    const fileName = `game_files/${req.params.player}.json`;
    const file = await promiseWrappers.writeFileP(fileName, "{}");
    res.json(file);
  } catch (error) {
    res.status(500).json({ error: "Er is een fout opgetreden." });
  }
});

router.get("/action/:player/where", gameStateReader, async (req, res) => {
  const locationInformation = await game.getLocationInformation();
  res.json(locationInformation);
});

router.post("/action/:player/goto", gameStateReader, async (req, res) => {
  const locationName = req.query.location;
  const locationDescription = await game.goToLocation(locationName);
  res.json(locationDescription);
});

router.post("/action/:player/arise", async (req, res) => {
  try {
    const game = new Game();
    const body = req.body;
    const newGame = await game.startNew(body.startLocation, body.inventory);
    res.json(newGame);
  } catch (error) {
    res.status(500).json({ error: "Er is een fout opgetreden." });
  }
});

module.exports = router;
