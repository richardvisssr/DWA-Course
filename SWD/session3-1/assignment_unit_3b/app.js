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

app.post('/action/:player/goto/', async (req, res) => {
    try {
        const fileName = path.join(gameFilesFolderName, `${req.params.player}.json`);
        const fileContent = await promiseWrappers.readFileP(fileName);
        const gameState = JSON.parse(fileContent);
        const game = new Game(gameState); // Maak een nieuw Game-object aan met de opgeslagen spelstatus
        const locationName = req.query.location; // Haal de locatie uit de routeparameter
        // Roep de goToLocation-functie van de Game-klasse aan om de locatie te wijzigen
        const locationDescription = game.state.player.location = await game.goToLocation(locationName);

        // Stuur de beschrijving van de nieuwe locatie als JSON-respons
        res.json(locationDescription);
    } catch (error) {
        res.status(500).json({ error: 'Er is een fout opgetreden bij het verplaatsen naar de nieuwe locatie.' });
    }
});

const server = app.listen(3000, () => {
    console.log(`game server started on port ${server.address().port}`);
});