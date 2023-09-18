// gameRouter.js
const express = require("express");
const router = express.Router();
const promiseWrappers = require("../promise-wrappers");
path = require("path");

const gameFilesFolderName = "game_files";

const gameFileReader = async (req, res, next) => {
  const fileName = path.join(gameFilesFolderName, `${req.params.player}.json`);
  // res.send(fileName)
  req.fileName = fileName;
  next();
};

// router.use("/", gameFileReader);

router.get("/listPlayerFiles", async (req, res) => {
  try {
    const files = await promiseWrappers.readdirP("game_files");
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: "Er is een fout opgetreden." });
  }
});

router.delete("/deletePlayerFile/:player",gameFileReader, async (req, res) => {
  try {
    const file = await promiseWrappers.unlinkFileP(req.fileName);
    res.json(file);
  } catch (error) {
    res.status(500).json({ error: "Er is een fout opgetreden." + req.fileName});
  }
});

router.post("/createPlayerFile/:player", gameFileReader, async (req, res) => {
  try {
    const file = await promiseWrappers.writeFileP(req.fileName, "{}");
    res.json(file);
  } catch (error) {
    res.status(500).json({ error: "Er is een fout opgetreden."});
  }
});

module.exports = router;
