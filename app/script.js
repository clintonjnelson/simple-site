// random-string.js

$(document).ready(function() {
  // WEB APP VERSION 1.0 CODE HAS BEEN COMMENTED OUT
  // var arrayOfStrings = [];

  // for(var i = 0, holder; i < 5; i++) {
  //   holder = prompt("Of your 5 favorite animals, please enter #" + (i+1));
  //   arrayOfStrings.push( holder );
  // }

  // function randomString(arrayOfStrings) {
  //   randomIndex = Math.floor( arrayOfStrings.length*Math.random() );
  //   return arrayOfStrings[ randomIndex ];
  // }

  // $("#randomButton").on("click", function() {
  //   $("#stringDisplay").text(randomString(arrayOfStrings));
  // });

  $("#randomButton").on("click", function() {
    $.get("/strings", function(response) {
      $("#stringDisplay").text(response);
    });
  });

  // Hover Event Listener - Receives JSON
  $(window).on("keypress", function() {
    $.get("npmstring", function(response) {
      $("#externalSiteInfo").text(JSON.parse(response).text);
    });
  })


  // Button Event Listener
  $("button").on("click", function() {
    var urlKey = $(this).attr("id");
    var resText;

    $.get(urlKey, function(response) {
      if ( typeof response === "object" ) {
        resText = response.setup + ":" + response.punchline
      } else {
        resText = response;
      }

      $("#stringDisplay").text(resText);
    });
  });



});
