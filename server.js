var express = require("express"),
  jsdom = require("jsdom"),
  request = require("request"),
  bodyparser = require("body-parser"),
  geocoderCn = require("./lib/geocoder.js"),
  piglatinify = require("./lib/piglatinify.js"),
  _ = require("lodash");
  //, app = module.exports = express.createServer(); // ??
var app = express();
var port = process.env.PORT || 3000;

// Limit portions of app bringing in, so it doesn't load EVERYTHING
app.use(bodyparser.json()); // Use the JSON portion of body parser
app.use(bodyparser.urlencoded({extended: true})); // Use url decoder
app.use(express.static(__dirname + "/app/"));  // Links Our App Folder

// Content Variables
// var myStrings = [ "apple", "pear", "cherry", "plum", "peach"];
// var jokes = [
//   {setup: "What do you call a big pile of kittens",
//    punchline: "A meowntain."},
//   {setup: "What's the difference between ignorance and apathy?",
//    punchline: "I don't know, and I don't care."},
//   {setup: "Why don't you ever see hippopotamus hiding in trees?",
//    punchline: "Because they're really good at it."}
// ];


// Functions
// function randomString(arrayOfStrings) {
//   randomIndex = Math.floor( arrayOfStrings.length*Math.random() );
//   return arrayOfStrings[ randomIndex ];
// }
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

// TODO: Hit Remote Server ONLY if haven't already loaded value before.
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
        res.send( JSON.stringify(needObj) );
      }
    });
  });
});

// Posts are sent in the body
app.post("/piglatin", function(req, res) {  // URL parser gives access to req
  var firstname = piglatinify(req.body.firstname);
  var lastname = piglatinify(req.body.lastname);
  var piglatinated = { firstname: firstname, lastname: lastname };

  res.json(piglatinated);  // Send object as JSON
});

// Geocoding
app.post("/geocode", function(req, res){
  // var pubGoogKy, baseAddress, fullAddress;
  // //pubGoogKy = "AIzaSyC2rmfA9qFAXBLtPm9Ls12eapMlE-fe2no";
  // baseAddress = "https://maps.googleapis.com/maps/api/geocode/json?address=";
  // fullAddress = baseAddress + req.body.searchLocation + "&sensor=false";

  // // Hit Google Geocoding API Server
  // request({uri: fullAddress}, function(err, response, body) {
  //   locations = JSON.parse(body).results[0].geometry.location
  //   lat = locations.lat;
  //   lng = locations.lng;
  //   latLng = {"latitude": lat, "longitude": lng};

  //   res.send(latLng);
  // });
  // latitudeLongitude = geocoderCn(req.body.searchLocation);
  // console.log("Result of Geocoder: ", latitudeLongitude);
  !!!!DONT FORGET TO SUBMIT A GRUNT PHOTO FOR LAB2 & LAB3!!!!
  function geolocation(searchLocation, callback) {
    geocoderCn(searchLocation, callback);
  }

  var sendResp = function(returnVal) {
    return(returnVal);
  };

  var geoResp = geolocation(req.body.searchLocation, sendResp);

  console.log("Inside server right before send the response.");
  // geocoderCn(req.body.searchLocation);
  setTimeout( function() { res.send(geoResp); }, 3000 );
});

// Server
app.listen(port, function() {
  console.log('server started on port' + port);
});












