// Use .env to hide keys
var dotenv = require('dotenv').config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var request = require('request');
var moment = require('moment');
var fs = require('fs'); 
var command = process.argv[2];
var searchTerm = process.argv[3];


// Access Spotify Keys
var spotify = new Spotify(keys.spotify);

// Grab command from the terminal
var command = process.argv[2];
var searchValue = "";
