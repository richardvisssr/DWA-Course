const mongoose = require("mongoose");
require("./model/location");
require("./model/player");

const db = mongoose.connection;
const Location = mongoose.model("Location");
const Player = mongoose.model("Player");

mongoose
  .connect(`mongodb://0.0.0.0:27017/ica-adventure`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    return seedLocation();
  })
  .then(() => {
    return seedPlayer();
  })
  .catch((err) => {
    console.log(err);
  })
  .then(() => {
    db.close();
  });

async function seedLocation() {
  await Location.deleteMany();

  await Location.insertMany([
    {
      _id: "forest",
      description: "a forest",
      exits: ["town"],
    },
    {
      _id: "town",
      description: "a town",
      exits: ["forest", "mountain"],
    },
    {
      _id: "mountain",
      description: "a mountain range",
      exits: ["town"],
    },
  ]);
}

async function seedPlayer() {
  await Player.deleteMany();

  await Player.insertMany([
    {
      _id: "han",
      currentLocation: "forest",
      map: [
        {
          _id: "town",
          description: "a town",
          exits: ["forest", "mountain"],
        },
        {
          _id: "forest",
          description: "a forest",
          exits: ["town"],
        },
      ],
    },
    {
      _id: "femke",
      currentLocation: "town",
      map: [
        {
          _id: "town",
          description: "a town",
          exits: ["forest", "mountain"],
        },
      ],
    },
  ]);
}
