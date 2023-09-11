'use strict';

const express = require('express');
const Game = require('./game.js');
const promiseWrappers = require('./promise-wrappers');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const gameFilesFolderName = 'game_files';

app.get('/action/:player/where', async (req, res) => {
    const fileName = path.join(gameFilesFolderName, `${req.params.player}.json`);
    const fileContent = await promiseWrappers.readFileP(fileName);
    const gameState = JSON.parse(fileContent);
    const game = new Game(gameState);
    const locationInformation = await game.getLocationInformation();
    res.json(locationInformation);
});

app.post('/action/:player/goto/:location', async (req, res) => {
   //TODO
   const player = req.params.player;
   const locationName = path.join(`${req.params.player}.json`);
   locationDescription = await game.goToLocation(locationName);
   const locationInformation = await game.getLocationInformation();
   res.json(locationInformation);
});

const server = app.listen(3000, () => {
    console.log(`game server started on port ${server.address().port}`);
});