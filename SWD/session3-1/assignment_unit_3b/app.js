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
    try {
        const player = req.params.player;
        const locationName = req.params.location; // Haal de locatie uit de routeparameter
        const game = new Game(); // Maak een nieuw Game-object aan

        // Roep de goToLocation-functie van de Game-klasse aan om de locatie te wijzigen
        const locationDescription = await game.goToLocation(locationName);

        // Roep getLocationInformation-functie aan om informatie over de nieuwe locatie op te halen
        const locationInformation = await game.getLocationInformation(player);

        // Stuur de beschrijving van de nieuwe locatie als JSON-respons
        res.json(locationInformation);
    } catch (error) {
        res.status(500).json({ error: 'Er is een fout opgetreden bij het verplaatsen naar de nieuwe locatie.' });
    }
});

const server = app.listen(3000, () => {
    console.log(`game server started on port ${server.address().port}`);
});