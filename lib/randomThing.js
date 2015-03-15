// Returns a random element from the provided array
module.exports = function randomThing(arrayOfStrings) {
  randomIndex = Math.floor( arrayOfStrings.length*Math.random() );
  return arrayOfStrings[ randomIndex ];
};
