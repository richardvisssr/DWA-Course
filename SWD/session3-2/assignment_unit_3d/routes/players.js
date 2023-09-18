const express = require("express");
const router = express.Router();
const promiseWrappers = require("../promise-wrappers");

router.post("/register", async (req, res) => {
  try {
    const player = req.body.player;
    const password = req.body.password;
    const playerFile = `player_files/${player}.json`;
    const file = await promiseWrappers.writeFileP(
      playerFile,
      JSON.stringify({ password: password })
    );
    res.json("Sign Up");
  } catch (error) {
    res.status(500).json({ error: "Er is een fout opgetreden." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const player = req.body.player;
    const password = req.body.password;
    const playerFile = `player_files/${player}.json`;
    const fileContent = await promiseWrappers.readFileP(playerFile);
    const file = JSON.parse(fileContent);
    if (file.password === password) {
      req.session.player = "richard";
      res.json("Sign In!");
    } else {
      res.json("Wrong password");
    }
  } catch (error) {
    res.status(500).json({ error: "Er is een fout opgetreden." });
  }
});

router.post("/logout", async (req, res) => {
  try {
    delete req.session.player;
    res.json("Sign Out!");
  } catch (error) {
    res.status(500).json({ error: "Er is een fout opgetreden." });
  }
});

module.exports = router;
