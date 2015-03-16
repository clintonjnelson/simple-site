// This function was supposed to both get response & parse
// Server.js returned undefined value before this finished
// So, I tried just doing the parsing... same result.
// I think maybe I need to pass the function I want to run through these functions
// Then at the end, I can run the "res.send" function on the final value.
// Still not sure if that is the correct approach though.

module.exports = function npmNameParse(rawString) {
  var makeObj = { text: rawString };  // Standard JS type
  var jsonObj = ( JSON.stringify(makeObj) );  // Put into JSON format
  return jsonObj;
};
