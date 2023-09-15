// gameRouter.js
const express = require("express");
const router = express.Router();
const path = require("path");
const promiseWrappers = require("../promise-wrappers");
// const Game = require("../game");

const gameFilesFolderName = "game_files";

const gameFileReader = async (req, res, next) => {
  const fileName = path.join(gameFilesFolderName, `${req.params.player}.json`);
  try {
    const fileContent = await promiseWrappers.readFileP(fileName);
    if (fileContent !== undefined && fileContent !== null) {
      req.fileContent = fileContent;
      next();
    }
  } catch (error) {
    return next(error);
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

module.exports = router;
