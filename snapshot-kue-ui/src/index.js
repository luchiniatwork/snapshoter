var express   = require('express'),
    basicAuth = require('basic-auth'),
    kue       = require('kue');

// Initializes Queue 
var jobs = kue.createQueue({
  prefix: 'q',
  redis: {
    port: process.env.REDIS_PORT_6379_TCP_PORT,
    host: process.env.REDIS_PORT_6379_TCP_ADDR,
    options: {
    }
  }
});

// Establishes Authentication Strategy
var auth = function (req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
  };

  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };

  if (
    user.name === (process.env.KUE_USERNAME || 'admin') && 
    user.pass === (process.env.KUE_PASSWORD || 'password')
  ) {
    return next();
  } else {
    return unauthorized(res);
  };
};

// Express app
var app = express();

// Express middlewares
app.use(auth);
app.use(kue.app);

// Kick express up
var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('kue-ui server listening at http://%s:%s', host, port)
});