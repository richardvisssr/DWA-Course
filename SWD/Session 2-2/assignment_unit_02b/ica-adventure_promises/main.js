'use strict';

const readline = require('readline');
const game = require('./game');
const { error } = require('console');

const rl = readline.createInterface(process.stdin, process.stdout);

const COMMAND_ERROR = Symbol();

rl.setPrompt('action?> ');
rl.prompt();

rl.on('line', (line) => {
    const [command, argument] = line.trim().split(' ');
    execute(command, argument).then(result => {
        //A)`Zorg ervoor dat het resultaat van de aanroep van `execute` naar de console wordt geschreven. Als er een fout optreedt, 
        //controleer dan of de property `code` van deze fout gelijk is aan `COMMAND_ERROR`. 
        //Als dit zo is, dan kun je de `message` van de fout naar de console schrijven, 
        //anders kun je de error opnieuw gooien (waarmee je het programma laat crashen). 
        //Test de implementatie door het spel te runnen en het command `where`, of `w` te geven. 
        //Vergeet niet de map_server.js 'aan' te zetten.
        console.log(result);

}).catch(err => {
    if (err.code === COMMAND_ERROR) {
        console.log(err.message);
    } else {
        throw err.error;
    }
});

}).on('close', function () {
   //DEFAULT ^c
   console.log('Leaving the game');
   process.exit(0);
});

function execute(command, argument) {
    let response;
    switch (command) {
        case 'where':
        case 'w': 
            return game.getLocationInformation().then(locationInformation => {
                response = `you are in ${locationInformation.description}`;
                response += '\nand you can go to these location(s): '
                
                response += locationInformation.exits.reduce((allExits, exit)  => {
                    return allExits + `\n- ${exit}`;
                }, '');
                
                return Promise.resolve(response);
            });
        case 'goto':
        case 'g':
            return game.goToLocation(argument).then(locationDescription => {
                response = `you are in ${locationDescription}`;
                return Promise.resolve(response);
            });
        default:
            let err = new Error(`The input: '${command}' is not defined`)
            err.code = COMMAND_ERROR;
            return Promise.reject(err);
    }
}