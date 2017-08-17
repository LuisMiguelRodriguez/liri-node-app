var keys = require('./keys.js');
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});

// console.log(keys.twitterKeys.consumer_key);
// console.log(keys.twitterKeys.consumer_secret);
// console.log(keys.twitterKeys.access_token_key);

var a = process.argv[2];
var b = parseInt(process.argv[3]);
var c = parseInt(process.argv[4]);

if ( a === 'my-tweets'){


 //  client.get('search/tweets', { q: {'screen_name':'tanukitek'}}, function(error, tweets, response) {
 //   console.log(tweets);
 //   console.log(response);
 // });
 var params = {screen_name: 'tanukitek', count: 1};

 client.get('statuses/user_timeline', params, function(error, tweets, response) {
   if (!error) {
     for(var i = 0; i < tweets.length; i++){
       console.log(tweets[i].text);
     }
    //  console.log(tweets);
    //  console.log('something');
 }else {
   console.log(error);
 }

 console.log("Inside of my-tweets");
});

} else if ( a === 'spotify-this-song' ){

} else if ( a === 'movie-this'){

} else if ( a === 'do-what-it-say'){

} else {
  console.log('Sorry you dont know how to follow instructions');
}
