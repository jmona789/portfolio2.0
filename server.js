var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080;

app.use("/static", express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/home.html");
});

app.get("/rps", function(req, res) {
  res.sendFile(process.cwd() + "projects/rps/index.html");
});

app.get("/tweet-this-article", function(req, res) {
  res.sendFile(process.cwd() + "projects/tweetThisArticle/index.html");
});

app.listen(PORT, function() {
  console.log("Listening on port %s", PORT);
});