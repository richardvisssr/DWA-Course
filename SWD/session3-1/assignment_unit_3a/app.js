    'use strict';

const express = require('express');
const game = require('./game.js');

const app = express();


app.get('/action/where', async (req, res) => {
    const locationInformation = await game.getLocationInformation();
    res.json(locationInformation);
});

app.post('/action/goto', async (req, res) => {
    //TODO A2)
    const locationName = req.query.location;
    const locationDesription = await game.goToLocation(locationName);
    res.json(locationDesription);
});

const server = app.listen(3000, () => {
    console.log(`game server started on port ${server.address().port}`);
});