var randomThing = require("./randomThing.js");

// Returns random string from the below array of strings
module.exports = function randomString() {
  var myStrings = [ "apple", "pear", "cherry", "plum", "peach" ];
  return randomThing(myStrings);
};
