var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080;

app.use("/static", express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/views/home.html");
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

app.get("/:anythingelse", function(req, res) {
  res.status(404);
  res.sendFile(process.cwd() + "/views/404.html");
});

app.listen(PORT, function() {
  console.log("Listening on port %s", PORT);
});