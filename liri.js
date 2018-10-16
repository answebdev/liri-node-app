// Use .env to hide keys
var dotenv = require('dotenv').config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var request = require('request');
var moment = require('moment');
var fs = require('fs');
// var fs = require('fs-extra')
var command = process.argv[2];
var userInput = process.argv;
var liriOutput = process.argv[2];
var input = "";

// Instructions
console.log("\n" + "Type one of the following commands after 'node liri.js' (use quotes for multi-word titles): " + "\n" + "\n" +
  "concert-this 'artist/band name'" + "\n" +
  "spotify-this-song 'any song title' " + "\n" +
  "movie-this 'any movie title' " + "\n" +
  "do-what-it-says " + "\n");

// console.log(command);

for (var i = 3; i < userInput.length; i++) {
  // Keep user input in one string on one line
  input = input + " " + userInput[i];
}
// console.log("COMMAND: " + command);
// console.log("TERM SEARCHED FOR: " + input);

// console.log(command);
// console.log(userInput);

// ========================================================
// Commands and Instructions
switch (liriOutput) {


  // case "spotify-this-song":
  //   spotify();
  //   break;

  case "movie-this":
    movieThis();
    break;

  case "do-what-it-says":
    doWhatItSays();
    break;


  // Instructions
  // default: console.log("\n" + "Type a command after 'node liri.js' (use quotes for multi-word titles): " + "\n" +
  //   "concert-this 'artist/band name'" + "\n" +
  //   "spotify-this-song 'any song title' " + "\n" +
  //   "movie-this 'any movie title' " + "\n" +
  //   "do-what-it-says " + "\n");
};
// ========================================================


// ========================================================
// BANDS IN TOWN CODE
var artist = "";
function concertThis() {
  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  // console.log("BANDS: " + queryURL);
  artistInput = "";
  var command = process.argv[2];
  var artist = process.argv;
  for (var i = 3; i < artist.length; i++) {
    artistInput = artist + " " + artist[i];
    // console.log("Searched for this: " + artistInput);
  }
  // console.log("ARTIST SEARCHED FOR: " + artistInput);
  // var numEvents = Object.keys(artist).length;
  // console.log("EVENT: " + numEvents);
  // var bandsInTownResults = data.venue;
  //     console.log("VENUE: " + data.venue);

}
concertThis();
// ========================================================


// ========================================================
// SPOTIFY CODE
function spotify() {
  // Access Spotify Keys
  var spotify = new Spotify(keys.spotify);

  spotify.search({ type: 'track', query: input }, function (err, data) {
    console.log(JSON.stringify(data, null, 2));
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    console.log(data);
  });
}
// ========================================================

// ========================================================
// OMDB CODE
function movieThis() {
  var command = process.argv[2];
  var movieName = process.argv[3];

  // Make a request to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  // var defaultUrl = "http://www.omdbapi.com/?t=mr+nobody+&y=&plot=short&apikey=trilogy";

  // console.log(queryUrl);

  request(queryUrl, function (error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {

      // Parse the body of the site and recover the following results
      // console.log("COMMAND: " + command);

      console.log("Title of Movie: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      console.log("Country where the movie was produced: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
    }
  });
}

// ========================================================
// DO WHAT IT SAYS CODE
function doWhatItSays() {
  fs.writeFile("random.txt", 'spotify-this-song,"I Want it That Way"', function (err) {
    var song = "spotify-this-song 'I Want it That Way'"
    // If the code experiences any errors it will log the error to the console.
    if (err) {
      return console.log(err);
    };
    // Otherwise, it will print: "random.txt was updated!"
    console.log("random.txt was updated!");
  });
};
// ========================================================