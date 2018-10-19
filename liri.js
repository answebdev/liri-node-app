// Use .env to hide keys
var dotenv = require('dotenv').config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var request = require('request');
var moment = require('moment');
var fs = require('fs');
var liriOutput = process.argv[2];

// ========================================================
// INSTRUCTIONS
// ========================================================
console.log("\n" + "Type one of the following commands after 'node liri.js': " + "\n" + "\n" +
  "concert-this 'artist/band name'" + "\n" +
  "spotify-this-song 'any song title' " + "\n" +
  "movie-this 'any movie title' " + "\n" +
  "do-what-it-says " + "\n");

// ========================================================
// COMMANDS
// ========================================================
switch (liriOutput) {

  case "concert-this":
    concertThis();
    break;

  case "spotify-this-song":
    spotify();
    break;

  case "movie-this":
    movieThis();
    break;

  case "do-what-it-says":
    doWhatItSays();
    break;
};

// ========================================================
// BANDS IN TOWN CODE
// ========================================================
function concertThis() {
  var command = process.argv[2];
  // Add .slice(3).join(" ") so users can do multi-word searches without having to use quotation marks
  var artist = process.argv.slice(3).join(" ");

  // Make a request to the Bandsintown API with the artist specified
  var artistQueryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  // console.log(queryUrl);

  request(artistQueryURL, function (error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {


      console.log("\n*********** BANDS IN TOWN SEARCH RESULTS ***********\n");
      console.log("Name of Venue: " + JSON.parse(body)[0].venue.name);
      console.log("Venue Location: " + JSON.parse(body)[0].venue.city + ", " + JSON.parse(body)[0].venue.country);
      var datetime = JSON.parse(body)[0].datetime;
      datetime = moment().format("MM/DD/YYYY");
      console.log("Date of Event: " + datetime);
      console.log("\n****************************************************\n");

      fs.appendFile("log.txt", "\n*********** BANDS IN TOWN SEARCH RESULTS ***********\n\n" + "Artist(s): " + artist + "\n" + "Name of Venue: " + JSON.parse(body)[0].venue.name + "\n" +
        "Venue Location: " + JSON.parse(body)[0].venue.city + ", " + JSON.parse(body)[0].venue.country + "\n" +
        "Date of Event: " + datetime + "\n\n****************************************************\n" + "\n", function (err) {
          if (err) {
            return console.log(err);
          };
        })


    }
  });
}
// ========================================================
// SPOTIFY CODE
// ========================================================
function spotify() {
  var command = process.argv[2];
  // Add .slice(3).join(" ") so users can do multi-word searches without having to use quotation marks
  var songTitle = process.argv.slice(3).join(" ");

  // if (!songTitle) {
  //   console.log("\n************** SPOTIFY SEARCH RESULTS **************\n");
  //   console.log("Artist: Ace of Base");
  //   console.log("Song TItle: The Sign");
  //   console.log("URL Preview: https://p.scdn.co/mp3-preview/4c463359f67dd3546db7294d236dd0ae991882ff?cid=e00fbdf58b854dc7b7421a59bc0e4f30");
  //   console.log("Album: The Sign (US Album) [Remastered]");
  //   console.log("\n***************************************************\n");
  // }

  if (!songTitle) {
    songTitle = "The Sign Ace of Base";
  }

  // Access Spotify Keys
  var spotify = new Spotify(keys.spotify);

  spotify.search({ type: 'track', query: songTitle }, function (err, data) {
    // console.log(JSON.stringify(data, null, 2));
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    // var results = data.tracks.items
    var searchResult = data.tracks.items;

    // for (var i = 0; i < searchResult.length; i++) {
    console.log("\n************** SPOTIFY SEARCH RESULTS **************\n");
    console.log(("Artist(s): " + searchResult[0].artists[0].name));
    console.log(("Song Title: " + searchResult[0].name));
    console.log(("URL Preview: " + searchResult[0].preview_url));
    console.log(("Album: " + searchResult[0].album.name));
    console.log("\n****************************************************\n");

    fs.appendFile("log.txt", "\n************** SPOTIFY SEARCH RESULTS **************\n\n" + "Artist(s): " + searchResult[0].artists[0].name + "\n" +
      "Song Title: " + searchResult[0].name + "\n" + "URL Preview: " + searchResult[0].preview_url + "\n" +
      "Album: " + searchResult[0].album.name + "\n\n****************************************************\n" + "\n", function (err) {
        if (err) {
          return console.log(err);
        };

      })
  })
}
// ========================================================
// OMDB CODE
// ========================================================
function movieThis() {
  var command = process.argv[2];
  // Add .slice(3).join(" ") so users can do multi-word searches without having to use quotation marks
  var movieName = process.argv.slice(3).join(" ");

  if (!movieName) {
    movieName = "Mr. Nobody";
  }

  // Make a request to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  // var defaultUrl = "http://www.omdbapi.com/?t=mr+nobody+&y=&plot=short&apikey=trilogy";

  request(queryUrl, function (error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {

      // Parse the body of the site and recover the following results
      // console.log("COMMAND: " + command);

      console.log("\n*************** OMDB SEARCH RESULTS ****************\n");
      console.log("Title of Movie: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      console.log("Country where the movie was produced: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
      console.log("\n****************************************************\n");


      fs.appendFile("log.txt", "\n**************** OMDB SEARCH RESULTS ***************\n\n" + "Title of Movie: " + JSON.parse(body).Title + "\n" +
        "Release Year: " + JSON.parse(body).Year + "\n" + "IMDB Rating: " + JSON.parse(body).imdbRating + "\n" +
        "Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\n" + "Country where the movie was produced: " + JSON.parse(body).Country + "\n" +
        "Language: " + JSON.parse(body).Language + "\n" + "Plot: " + JSON.parse(body).Plot + "\n" + "Actors: " + JSON.parse(body).Actors +
        "\n\n****************************************************\n" + "\n", function (err) {
          if (err) {
            return console.log(err);
          };
        })


    }
  });
}

// ========================================================
// DO WHAT IT SAYS CODE
// ========================================================
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

