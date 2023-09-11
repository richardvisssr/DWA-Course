'use strict';

const readline = require('readline');
const game = require('./game');

const rl = readline.createInterface(process.stdin, process.stdout);

const COMMAND_ERROR = Symbol();

rl.setPrompt('action?> ');
rl.prompt();

rl.on('line', (line) => {
    const [command, argument] = line.trim().split(' ');
    execute(command, argument).then(result => {
        console.log(result);
        //Kan geen await/async gebruiken omdat de functie execute niet async is

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

async function execute(command, argument) {
    let response;
    switch (command) {
        case 'where':
        case 'w': 
            const locationInformation = await game.getLocationInformation()
            response = `you are in ${locationInformation.description}`;
            response += '\nand you can go to these location(s): '
                
            response += locationInformation.exits.reduce((allExits, exit)  => {
                return allExits + `\n- ${exit}`;
            }, '');
                
            return response;
            
        case 'goto':
        case 'g':
            if (argument === null || argument === undefined) {
                let err = new Error(`The input '${command}' needs an argument`)
                err.code = COMMAND_ERROR;
                return Promise.reject(err);
            }
            try {
            let locationDescription = await game.goToLocation(argument);
            
            response = `you are in ${locationDescription}`;
            return response;
            } catch (error) {
                console.error('Er is een fout opgetreden:', error);
            }
        default:
            let err = new Error(`The input: '${command}' is not defined`)
            err.code = COMMAND_ERROR;
            return Promise.reject(err);
    }
}