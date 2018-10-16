// Use .env to hide keys
var dotenv = require('dotenv').config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var request = require('request');
var moment = require('moment');
var fs = require('fs');
var command = process.argv[2];
var userInput = process.argv;
var input = "";

// console.log(command);

for (var i = 3; i < userInput.length; i++) {
    // Keep user input in one string on one line
    input = input + " " + userInput[i];
}
console.log("COMMAND: " + command);
console.log("TERM SEARCHED FOR: " + input);

// console.log(command);
// console.log(userInput);

// ========================================================
// BANDS IN TOWN CODE
var artist ="";
function concertThis() {
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    // console.log("BANDS: " + queryURL);
    artistInput = "";
    var command = process.argv[2];
    var artist = process.argv;
    for (var i = 3; i < artist.length; i++) {
        artistInput = artist + " " + artist[i];
        console.log("Searched for this: " + artistInput);
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
// Access Spotify Keys
// var spotify = new Spotify(keys.spotify);

// spotify.search({ type: 'track', query: input }, function (err, data) {
//     console.log(JSON.stringify(data, null, 2));
//     if (err) {
//         return console.log('Error occurred: ' + err);
//     }

// console.log(data);
// });
// ========================================================

// ========================================================
// OMDB CODE
var movieName = process.argv[2];

// Make a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

console.log(queryUrl);

request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover the following results
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
// ========================================================