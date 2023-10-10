const pw = require("./promise-wrappers");
const fs = require("fs").promises;

// Eerst lezen we de gegevens uit 'users.json'
pw.readFileP("users.json")
  .then((data) => {
    const users = JSON.parse(data);

    // Vervolgens schrijven we de gebruikersgegevens weg
    return pw.writeFileP(users);
  })
  .then(() => {
    console.log("Gebruikersgegevens zijn weggeschreven.");
  })
  .catch((err) => {
    console.log(err.message);
  });
