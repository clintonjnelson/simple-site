// random-string.js

$(document).ready(function() {
  var arrayOfStrings = [];

  for(var i = 0, holder; i < 5; i++) {
    holder = prompt("Of your 5 favorite animals, please enter #" + (i+1));
    arrayOfStrings.push( holder );
  }

  function randomString(arrayOfStrings) {
    randomIndex = Math.floor( arrayOfStrings.length*Math.random() );
    return arrayOfStrings[ randomIndex ];
  }

  $("#randomButton").on("click", function() {
    $("#stringDisplay").text(randomString(arrayOfStrings));
  });
});
