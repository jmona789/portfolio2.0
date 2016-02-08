var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var secret = require("./secret.js")
var session = require("express-session");
var middleware = require("./middleware.js");

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

app.get("/signin", function(req, res) {
  res.sendFile(process.cwd() + "/views/signin.html");
});

app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
  secret: secret.secret.secret,
  cookie: {},
  saveUninitialized: true,
  resave: false
}));

app.get("/account", middleware.isAuthenticated, function(req, res) {
  res.sendFile(process.cwd() + "/views/account.html");
});

app.post("/signin", function(req, res){
  if(req.body.email === "a@a.com" && req.body.password === "a") {
    if (StayLoggedIn = "on"){
      //sets an expires date far in the future so user will stay logged on virtually forever (Dec 31 9999)
      req.session.cookie.expires = new Date(253402300000000);
    }else{
      //set cookie to expire after 10 minutes
      req.session.cookie.maxAge = 60000;
    }
    req.session.isAuthenticated = true;
    res.redirect("/account");
  }else{
    req.session.isAuthenticated = false;
    res.redirect("/signin");
  }
})

app.get("/:anythingelse", function(req, res) {
  res.status(404);
  res.sendFile(process.cwd() + "/views/404.html");
});

app.listen(PORT, function() {
  console.log("Listening on port %s", PORT);
});