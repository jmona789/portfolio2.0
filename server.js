var logger = require("morgan");
var bodyParser = require("body-parser");
var express = require('express');
var app = express();
var PORT =  process.env.PORT || 9001

app.use(logger('dev'));
app.use(express.static(__dirname + "/public"));

app.get("*", function(req, res){
  res.sendFile(process.cwd() + "/public/views/index.html");
});

app.listen(PORT, function() {
  console.log("listening on port:" + PORT);
});

app.get("/rps", function(req, res) {
  res.sendFile(process.cwd() + "/views/rps.html");
});

app.get("/tweet-this-article", function(req, res) {
  res.sendFile(process.cwd() + "/views/tweet.html");
});

app.get("/youtube-and-chill", function(req, res) {
  res.sendFile(process.cwd() + "/views/youtube.html");
});

// app.use(bodyParser.urlencoded({extended: false}));

// app.get("/:anythingelse", function(req, res) {
//   res.status(404);
//   res.sendFile(process.cwd() + "/views/404.html");
// });