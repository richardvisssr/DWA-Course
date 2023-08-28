let game = {};

let player = {
  location: "town",
  items: [],
};

let map = {
  forest: {
    description: "a forest",
    items: ["mushroom"],
    exits: ["town"],
  },
  town: {
    description: "a town",
    items: ["coin", "sword", "axe"],
    exits: ["forest", "mountain"],
  },
  mountain: {
    description: "a mountain range",
    items: [],
    exits: ["town"],
  },
};

let currentLocation = player.location
/**
 * Returns the items the player is carrying.
 * @returns {Array}
 */
game.getInventory = () => {

  return player.items;

};

/**
 * Returns the list of items at the player's current location.
 * @returns {Array}
 */
game.getItems = () => {
  let item = []

  if (currentLocation == map[currentLocation]){
    item = map[currentLocation].items
  }

   return item

};

/**
 * Returns an object containing the description and the
 * exits of the players current location on the map.
 * @returns {Object}
 */
game.getLocationInformation = () => {
  let exits = {
    exit: map[currentLocation].exits,
    description: map[currentLocation].description
  };

  return exits;
};


/**
 * Checks if there is a connection between the player current location
 * and the location represented by the given locationName and moves the
 * player to that location.
 * Otherwise it changes nothing.
 *
 * @param {String} locationName - The name of the location the player wants to move to.
 * @returns {String} - The location the player is in after executing this function
 */
game.goToLocation = (locationName) => {
  if (player.location in locationName) {
    return locationName
  }
};

/**
 * Checks if the item with the given itemName is in the list of
 * items of the player's current location and transfers it to the player.
 * Otherwise it changes nothing.
 *
 * @param {String} itemName - The name of the item.
 * @returns {String} - The name of the item that was taken. If nothing was taken, it returns
 * the string 'nothing'
 */
game.takeItem = (itemName) => {
  if (itemName in map[player.location].items) {
    return itemName
  } else return 'nothing'
};

module.exports = game;
