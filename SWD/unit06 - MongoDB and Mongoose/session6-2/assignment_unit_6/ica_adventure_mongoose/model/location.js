const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  exits: {
    type: [String],
    required: true,
  },
});

// Define a static method to find a location by ID
locationSchema.statics.findLocationById = async function (locationId) {
  try {
    const location = await this.findOne({ _id: locationId });
    return location;
  } catch (err) {
    throw err;
  }
};

// Define and export the Location model
module.exports = mongoose.model('Location', locationSchema);
