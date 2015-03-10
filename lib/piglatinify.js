// Export our Piglatinify Function
module.exports = function piglatinify(word) {
  var wordArray = word.split("");
  var vowels = "aeiouAEIOU".split("");
  var letters, changedWord;

  // Is my first letter a vowel?
  if (vowels.indexOf(wordArray[0]) !== -1) {
    return word + "-hay";
  }
  letters = wordArray.shift();
  changedWord = wordArray.join("") + "-" + letters + "ay";
  return changedWord;
}
