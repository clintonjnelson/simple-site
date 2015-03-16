// This module was originally intended to do the geocoding itself
// BUT I couldn't get the callback to return for server.js response
// Heroku Site API Public Key via th.good@gmail.com account
// pubGoogKy = "AIzaSyC2rmfA9qFAXBLtPm9Ls12eapMlE-fe2no";

module.exports = function geocoderCn(searchLocation) {
  var baseAddress, fullAddress;

  baseAddress = "https://maps.googleapis.com/maps/api/geocode/json?address=";
  fullAddress = baseAddress + searchLocation + "&sensor=false";
  return fullAddress;
};
