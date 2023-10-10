const mongoose = require('mongoose');
const Location = require('./location'); // Import the Location schema

const playerSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  items: [String],
  currentLocation: {
    type: String,
    required: true,
  },
  map: [Location.schema], // Reference the Location schema
});

// Define a static method to find a player by ID
playerSchema.statics.findPlayerById = async function (playerId) {
  try {
    const player = await this.findOne({ _id: playerId });
    return player;
  } catch (err) {
    throw err;
  }
};

playerSchema.methods.getLocationInformation = async function () {
  try {
    const currentLocation = this.currentLocation;
    const location = await Location.findOne({ _id: currentLocation });

    if (!location) {
      return { message: "Location not found" };
    }

    return {
      description: location.description,
      exits: location.exits,
    };
  } catch (err) {
    throw err;
  }
};

// Define and export the Player model
module.exports = mongoose.model('Player', playerSchema);
