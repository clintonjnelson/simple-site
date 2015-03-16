var randomThing = require("./randomThing.js");

// Returns random joke from the below array of jokes
module.exports = function randomJoke() {
  var myJokes = [
    { setup: "What do you call a big pile of kittens?",
     punchline: "A meowntain." },
    { setup: "What's the difference between ignorance and apathy?",
     punchline: "I don't know, and I don't care." },
    { setup: "Why don't you ever see hippopotamus hiding in trees?",
     punchline: "Because they're really good at it." }
  ];

  return randomThing(myJokes);
};
