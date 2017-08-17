var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var http = require('http');
var imdb =  require('imdb-api');
var fs = require('fs');

var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});

var spotify = new Spotify({
  id: 'c7d9ff0a0f994f328b16d998abcf2731',
  secret: '5198c3c424ab47309cfb75a119a89b9f'
});

var a = process.argv[2];
var b = process.argv[3];
var c = parseInt(process.argv[4]);

if ( a === 'my-tweets'){

 //  client.get('search/tweets', { q: {'screen_name':'tanukitek'}}, function(error, tweets, response) {
 //   console.log(tweets);
 //   console.log(response);
 // });
 var params = {screen_name: 'tanukitek', count: 20};

 client.get('statuses/user_timeline', params, function(error, tweets, response) {
   if (!error) {
     for(var i = 0; i < tweets.length; i++){
       console.log(tweets[i].text);
       fs.appendFile("log.txt",
         '\r\n'+ tweets[i].text , function(err){
         if(err){
           return console.log(err);
         }
       })
     }
    //  console.log(tweets);
    //  console.log('something');
 }else {
   console.log(error);
 }

});

} else if ( a === 'spotify-this-song' ){

  var q = b || 'The Sign';
    spotify
      .search({ type: 'track', query: q })
      .then(function(response) {
        // console.log(response.tracks.items[0]);
        console.log("Artist: " + response.tracks.items[0].artists[0].name);
        console.log("Song Name: " + response.tracks.items[0].name);
        console.log("Preview Link: " + response.tracks.items[0].href);
        console.log("Album: " + response.tracks.items[0].album.name);

        fs.writeFile('log.txt', "\r\nArtist: " + response.tracks.items[0].artists[0].name +
        "\r\nSong Name: " + response.tracks.items[0].name +
        "\r\nPreview Link: " + response.tracks.items[0].href +
        "\r\nAlbum: " + response.tracks.items[0].album.name,
        function(err){
          if(err){
            console.log(err);
          }
        })
      })
      .catch(function(err) {
        console.log(err);
      });

} else if ( a === 'movie-this'){
  // https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&query=harvey&page=1&include_adult=false
  var search = b || 'Mr. Nobody';
  http.get("http://api.themoviedb.org/3/search/movie?api_key=" + keys.imdbKeys.apikey + "&language=en-US&query=" + search + "&page=1&include_adult=false", function(res) {
  var body = ''; // Will contain the final response

  res.on('data', function(data){
    body += data;
  });

  res.on('end', function() {

    var parsed = JSON.parse(body);
    // console.log(parsed.results);
    var movie = parsed.results[0];
    // console.log(movie);
    console.log('Title: ' + movie.title);
    console.log('Year: ' + movie.release_date);
    console.log('IMDB Rating: ' + movie.vote_average);
    console.log('Language: ' + movie.original_language);
    console.log('Plot: ' + movie.overview);


    fs.writeFile('log.txt',
      '\r\nTitle: ' + movie.title +
      '\r\nYear: ' + movie.release_date +
      '\r\nIMDB Rating: ' + movie.vote_average +
      '\r\nLanguage: ' + movie.original_language +
      '\r\nPlot: ' + movie.overview,
    function(err){
      if(err){console.log(err)}
    });

  });
});

} else if ( a === 'do-what-it-say'){

} else {
  console.log('Sorry you dont know how to follow instructions');
}

// OMBDB
// var omdb = require('omdbapi');
// omdb.search('pulp fiction')
//   .then(function(result){
//     console.log(results);
// //   });
// http.get("http://www.omdbapi.com/?apikey=40e9cece&s=harvey", function(res) {
// var body = ''; // Will contain the final response
// Received data is a buffer.
// Adding it to our body
// res.on('data', function(data){
//   body += data;
// });
// After the response is completed, parse it and log it to the console
// res.on('end', function() {
//   var parsed = JSON.parse(body);
//   var movie = parsed.Search[0];
//   console.log(parsed);
//   console.log('Title: ' + movie.Title);
//   console.log('Year: ' + movie.Year);
  // console.log('' + movie.);
  // console.log('' + movie.);
  // console.log('' + movie.);
  // console.log('' + movie.);
  // console.log('' + movie.);
  // console.log('' + movie.);
// });
// })
