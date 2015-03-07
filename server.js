var express = require("express")
  , jsdom = require("jsdom")
  , request = require("request")
  , url = require("url");
  //, app = module.exports = express.createServer(); // ??

var app = express();
var port = process.env.PORT || 3000;

// Content Variables
var myStrings = [ "apple", "pear", "cherry", "plum", "peach"];
var jokes = [
  {setup: "What's the difference between a guitar and a fish?",
   punchline: "You can't tuna fish"},
  {setup: "What do you get when you cross a cow and a duck?",
   punchline: "Milk & quackers"},
  {setup: "How many tickles does it take to make an octopus laugh?",
   punchline: "Ten tickles"}
];


// Functions
function randomString(arrayOfStrings) {
  randomIndex = Math.floor( arrayOfStrings.length*Math.random() );
  return arrayOfStrings[ randomIndex ];
}


//
//
// Links Our App Folder
app.use(express.static(__dirname + "/app/"));

//
//
// Routes
app.get("/", function(req, res) {
  res.sendFile("index.html");     // We can send files from app folder
  //res.send("hello, universe");
});

app.get("/jokes", function(req, res){
  res.json(randomString(jokes));
});

app.get("/strings", function(req, res) {
  res.send(randomString(myStrings));
});

app.get("/npmstring", function(req, res){
  var siteAddress = "https://www.npmjs.com/package/wolverine";
  request({uri: siteAddress}, function(err, response, body) {
    var self = this;

    // Returns a JSON DOM Object; parses for the proper text
    jsdom.env( {
      html: (response['req']['res']['body']),
      scripts: ['http://code.jquery.com/jquery-1.6.min.js'],
      done: function(err, window) {
        var $ = window.jQuery;
        var npmString = $('#npm-expansions').text();
        console.log( npmString );
        res.send( npmString );
      }
    });
  });
});

// Server
app.listen(port, function() {
  console.log('server started on port' + port)
});












