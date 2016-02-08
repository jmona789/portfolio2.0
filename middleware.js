exports.myLoggingMiddleware = function(req, res, next) {
  var url = req.url;
  var method = req.method;

  req.timestamp = new Date();

  console.log("%s request at %s", method, url);
  next();
}

exports.randomNumber = function(req, res, next) {
  req.randomNumber = Math.floor(Math.random() * 10);
  next();
}

exports.isAuthenticated = function(req, res, next) {
  if(req.session.isAuthenticated) {
    next();
  } else {
    res.redirect("/login");
  }
}