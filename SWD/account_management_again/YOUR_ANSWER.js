const pw = require('./promise-wrappers');

users = [
    {
        "account": "ashlee_waters",
        "username": "ASH"
    },
    {
        "account": "hilario_muller",
        "username": "Hilario_Muller29"
    },
    {
        "account": "serena_klein",
        "username": "Serena.Klein"
    }
];

// pw.writeFileP(Promise.all([users]).then(() => {
//     console.log('done');
// }).catch(err => {
//     console.log(err.message);
// })); 

pw.readFileP(Promise.all([users]).then(() => {
    console.log('done');
}).catch(err => {
    console.log(err.message);
})); 