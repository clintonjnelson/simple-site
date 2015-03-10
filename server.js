var express = require("express")
  , jsdom = require("jsdom")
  , request = require("request")
  , bodyparser = require("body-parser")
  , piglatinify = require("./lib/piglatinify.js");
  //, app = module.exports = express.createServer(); // ??
var app = express();
var port = process.env.PORT || 3000;

// Limit portions of app bringing in, so it doesn't load EVERYTHING
app.use(bodyparser.json()); // Use the JSON portion of body parser
app.use(bodyparser.urlencoded({extended: true})); // Use url decoder
app.use(express.static(__dirname + "/app/"));  // Links Our App Folder

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
// function piglatinify(word) {
//   var wordArray = word.split("");
//   var vowels = "aeiouAEIOU".split("");
//   var letters, changedWord;

//   // Is my first letter a vowel?
//   if (vowels.indexOf() !== -1) {
//     return word + "-hay";
//   }
//   letters = wordArray.shift();
//   changedWord = wordArray.join("") + "-" + letters + "ay";
//   return changedWord;
// }

//
//
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

    // Returns a JSON DOM Object; parses for the proper text
    jsdom.env( {
      html: (response['req']['res']['body']),
      scripts: ['http://code.jquery.com/jquery-1.6.min.js'],
      done: function(err, window) {
        var $ = window.jQuery;
        var npmString = $('#npm-expansions').text();
        var needObj = { text: npmString }
        console.log( needObj.text );
        res.send( JSON.stringify(needObj) );
      }
    });
  });
});

// Posts are sent in the body
app.post("/piglatin", function(req, res) {  // URL parser gives access to req
  console.log(req);
  console.log(req.body);
  var firstname = piglatinify(req.body.firstname);
  var lastname = piglatinify(req.body.lastname);
  var piglatinated = { firstname: firstname, lastname: lastname };

  res.json(piglatinated);  // Send object as JSON
});

// Server
app.listen(port, function() {
  console.log('server started on port' + port)
});












