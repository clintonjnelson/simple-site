var express = require("express");
var app = express();
var port = process.env.PORT || 3000;

var myStrings = [ "apple", "pear", "cherry", "plum", "peach"];
var jokes = [
  {setup: "What's the difference between a guitar and a fish?",
   punchline: "You can't tuna fish"},
  {setup: "What do you get when you cross a cow and a duck?",
   punchline: "Milk & quackers"},
  {setup: "How many tickles does it take to make an octopus laugh?",
   punchline: "Ten tickles"}
];

function randomString(arrayOfStrings) {
  randomIndex = Math.floor( arrayOfStrings.length*Math.random() );
  return arrayOfStrings[ randomIndex ];
}

app.get("/joke", function(req, res){
  res.json(randomString(jokes));
});

app.get("/", function(req, res) {
  res.send("hello, universe");
});

app.get("/string", function(req, res) {
  res.send(randomString(myStrings));
});

app.listen(port, function() {
  console.log('server started on port' + port)
});
