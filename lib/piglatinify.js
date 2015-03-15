var _ = require("lodash");

// Export our Piglatinify Function
module.exports = function piglatinify(word) {
  var wordArray = word.split("");
  var vowels = "aeiouAEIOU";
  var consonants = "bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ";
  var letters = "", pigWord;

  function pigify(wordArray, shifts) {
    var draftPig, capPig;

    for(var i=0; i < shifts; i++) {
      letters += wordArray.shift();
    }

    console.log("Letters: ", letters, "wordArray: ", wordArray, "draftPig: ", draftPig);
    draftPig = wordArray.join("") + "-" + letters + "ay";
    draftPig = draftPig.toLowerCase();
    console.log("Letters: ", letters, "wordArray: ", wordArray, "draftPig: ", draftPig);
    capPig = draftPig.substring(0,1).toUpperCase() + draftPig.substring(1);
    return capPig;
  }

  // Forming PigLatin Words via Rules of PigLatin
  if (~vowels.indexOf(wordArray[0])) {
    return word + "-hay";
  } else if(~consonants.indexOf(wordArray[0]) && ~consonants.indexOf(wordArray[1]) && ~consonants.indexOf(wordArray[2]) ) {
    pigWord = pigify(wordArray, 3);
  } else if(~consonants.indexOf(wordArray[0]) && ~consonants.indexOf(wordArray[1])) {
    pigWord = pigify(wordArray, 2);
  } else {
    pigWord = pigify(wordArray, 1);
  }
  return pigWord;
}
