"use strict";

const mongoose = require("mongoose");
require("../model/player.js");
require("../model/location.js");

const express = require("express");
const router = express.Router();

const Player = mongoose.model("Player");
const Location = mongoose.model("Location");

//Don't forget to get your hands on the Location model when you need it.

router.get("/:player/where", (req, res) => {
  Player.find({ _id: req.params.player })
    .then((player) => {
      if (!player) {
        res.status(404).json({ message: "Player not found" });
        return;
      }
      const currentLocation = player.currentLocation;
      Location.find({ _id: currentLocation })
        .then((location) => {
          if (!location) {
            res.status(404).json({ message: "Location not found" });
            return;
          }

          res.json({
            description: location.description,
            exits: location.exits,
          });
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.put("/:player/goto", (req, res) => {
  res.json("replace me with your code");
});

module.exports = router;
