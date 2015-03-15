var bodyparser = require("body-parser"),
  jsdom = require("jsdom"),
  request = require("request");

// This module was originally intended to do the geocoding itself
// But Google made it harder on v3
module.exports = function geocoderCn(searchLocation, callback) {
  var pubGoogKy, baseAddress, fullAddress, latLng;
  //pubGoogKy = "AIzaSyC2rmfA9qFAXBLtPm9Ls12eapMlE-fe2no";
  baseAddress = "https://maps.googleapis.com/maps/api/geocode/json?address=";
  fullAddress = baseAddress + searchLocation + "&sensor=false";
  console.log(fullAddress);

  console.log("Right before request request call...");
  // Hit Google Geocoding API Server
  request({uri: fullAddress}, function(err, response, body) {
    console.log("Locations parsed: ", JSON.parse(body).results[0].geometry.location);
    var locations = JSON.parse(body).results[0].geometry.location;
    var lat = locations.lat;
    var lng = locations.lng;
    latLng = { "latitude": lat, "longitude": lng };

    callback(latLng);
    console.log("Right before request return: ", latLng);
  });
};
