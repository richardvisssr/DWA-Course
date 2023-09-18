// actionsRouter.js
const express = require("express");
const router = express.Router();
const Game = require("../game.js");
const promiseWrappers = require("../promise-wrappers");
path = require("path");

// const Game = require("../game");

const gameFilesFolderName = "game_files";

const gameFileReader = async (req, res, next) => {
  if (req.session.player) {
    const fileName = path.join(gameFilesFolderName, `${req.session.player}.json`);
    try {
      const fileContent = await promiseWrappers.readFileP(fileName);
      if (fileContent !== undefined && fileContent !== null) {
        req.fileContent = fileContent;
        next();
      } else {
        return res.status(400).send("File is empty or undefined.");
      }
    } catch (error) {
      return res.status(500).send("Error reading the file." + fileName);
    }
  } else {
    return res.status(400).send("Player session not found.");
  }
};


router.use("/action/:player", gameFileReader);

const errHandler = (err, req, res, next) => {
  if (err.code === "ENOENT" && err.syscall === "open") {
    res.status(404).json({ error: "Game not found." });
  } else {
    res.status(500).json({ error: "Internal server error." });
  }
};

router.use("/action/:player", errHandler);

const gameStateReader = async (req, res, next) => {
  try {
    // Check if req.fileContent is not undefined and is a non-empty string
    if (typeof req.fileContent === "string" && req.fileContent.trim() !== "") {
      const gameState = JSON.parse(req.fileContent);
      const game = new Game(gameState); // Hier wordt "game" gedefinieerd
      req.game = game; // Sla "game" op in req voor gebruik in andere route-handlers
      next();
    } else {
      // Handle the case where the JSON data is empty or undefined
      throw new Error("Invalid JSON data: " + req.fileContent);
    }
  } catch (error) {
    next(error); // Pass errors to the default error handler
  }
};

router.get("/action/:player/where", gameStateReader, async (req, res) => {
  const locationInformation = await req.game.getLocationInformation();
  res.json(locationInformation);
});

router.post("/action/:player/goto", gameStateReader, async (req, res) => {
  const locationName = req.query.location;
  const locationDescription = await req.game.goToLocation(locationName);
  res.json(locationDescription);
});

router.post("/action/:player/arise", async (req, res) => {
  try {
    const game = new Game();
    const startLocation = req.body.start;
    const inventory = req.body.inventory;
    const newGame = await game.startNew(startLocation, inventory);
    res.json(newGame);
  } catch (error) {
    res.status(500).json({ error: "Er is een fout opgetreden." });
  }
});

module.exports = router;
