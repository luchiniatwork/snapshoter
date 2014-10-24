var express  = require('express'),
    app      = express(),
    kue      = require('kue'),
    extruder = require('./lib/extruder');

var CACHE_LIFETIME = process.env.CACHE_LIFETIME || 5000;

var jobs = kue.createQueue({
  prefix: 'q',
  redis: {
    port: process.env.REDIS_PORT_6379_TCP_PORT,
    host: process.env.REDIS_PORT_6379_TCP_ADDR,
    options: {
    }
  }
});

app.route('/snapshots').get(function (req, res, next) {
  console.log('------------');
  console.log('Request to', req.path, 'from', req.ip);
  console.log('parsed query', JSON.stringify(req.query, null, 2));

  var url = 'https://www.virginamerica.com/book/ow/a1/nyc_sfo/20141126';

  console.log('Processing', url);
  extruder.getSnapshot(url).then(function(cache) {
    if (!cache) {
      console.log('No cached copy. Creating new snapshot.');
      extruder.createSnapshot(url).then(function(obj) {
        console.log('Received new snapshot. Responding with it.');
        res.send(obj.content);
      });
    } else {
      console.log('Cached copy found. Responding with it.');
      var age = Date.now() - (cache.timestamp || 0);
      if (age > CACHE_LIFETIME) {
        console.log('Cache is', age/1000/60/60, 'hours old. Triggering new job.');
        var job = jobs.create('snapshot', {
          title: 'Cache refresh for ' + url,
          url: url
        }).save(function (err) {
          if (!err) {
            console.log('Job ID', job.id, 'created');
          } else {
            console.log('Failure to create job:', err);
          };
        });
      }
      res.send(cache.content);
    }
  });

});

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Server listening at http://%s:%s', host, port)
});