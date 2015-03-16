var _ = require("lodash"),
  bodyparser = require("body-parser"),
  express = require("express"),
  jsdom = require("jsdom"),
  request = require("request"),
  geocoderCn = require("./lib/geocoder.js"),
  makeObjAndStringify = require("./lib/makeobjandstringify.js"),
  piglatinify = require("./lib/piglatinify.js"),
  randomJoke = require("./lib/jokes.js"),
  randomString = require("./lib/strings.js");

  //, app = module.exports = express.createServer(); // ??
var app = express();
var port = process.env.PORT || 3000;

// Limit portions of app bringing in, so it doesn't load EVERYTHING
app.use(bodyparser.json()); // Use the JSON portion of body parser
app.use(bodyparser.urlencoded({ extended: true })); // Use url decoder
app.use(express.static(__dirname + "/app/"));  // Links Our App Folder

//
// Endpoints/Routes
app.get("/", function(req, res) {
  res.sendFile("index.html");     // We can send files from app folder
  //res.send("hello, universe");
});

app.get("/jokes", function(req, res) {
  res.json(randomJoke());
});

app.get("/strings", function(req, res) {
  res.send(randomString());
});

// TODO: Hit Remote Server ONLY if haven't already loaded value before.
app.get("/npmname", function(req, res) {
  var siteAddress = "https://www.npmjs.com/package/wolverine";
  request({ uri: siteAddress }, function(err, response, body) {
    // Returns a JSON DOM Object; parses for the proper text
    jsdom.env( {
      html: (response["req"]["res"]["body"]),
      scripts: [ "http://code.jquery.com/jquery-1.6.min.js" ],
      done: function(err, window) {
        var $ = window.jQuery;
        var npmString = $("#npm-expansions").text();
        var jsonObj = makeObjAndStringify(npmString);
        res.send( jsonObj );
        // var needObj = { text: npmString };
        // res.send( JSON.stringify(needObj) );
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
app.post("/geocode", function(req, res) {
  var fullAddress = geocoderCn(req.body.searchLocation);

  // Hit Google Geocoding API Server
  // Wanted to do in geocoder.js, but async cause return of undefined
  // Never did figure out how to prevent an async return from module
  request({ uri: fullAddress }, function(err, response, body) {
    locations = JSON.parse(body).results[0].geometry.location;
    lat = locations.lat;
    lng = locations.lng;
    latLng = { "latitude": lat, "longitude": lng };

    res.send(latLng);
  });

////// Attempts towards Async //////
//   function geolocation(searchLocation, callback) {
//     geocoderCn(searchLocation, callback);
//   }

// Trying to get module to wait for this return value callback. No luck.
//   var sendResp = function(returnVal) {
//     return returnVal;
//   };

//   var geoResp = geolocation(req.body.searchLocation, sendResp);
//   console.log("Inside server right before send the response.");
//   // geocoderCn(req.body.searchLocation);

// Trying to get it to wait to send the value until after response.
//   setTimeout( function() { res.send(geoResp); }, 3000 );
});

// Server
app.listen(port, function() {
  console.log("server started on port" + port);
});
