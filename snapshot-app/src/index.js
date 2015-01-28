var express   = require('express'),
    app       = express(),
    fs        = require('fs'),
    kue       = require('kue'),
    extruder  = require('./lib/extruder'),
    processor = require('./lib/processor');

var CACHE_LIFETIME = process.env.CACHE_LIFETIME || 5*60*1000,
    BASE_URL = process.env.BASE_URL || 'https://www.virginamerica.com/';

var jobs = kue.createQueue({
  prefix: 'q',
  redis: {
    port: process.env.REDIS_PORT_6379_TCP_PORT,
    host: process.env.REDIS_PORT_6379_TCP_ADDR,
    options: {
    }
  }
});

console.log(fs.existsSync('src/processor-data.js'));
if (fs.existsSync('src/processor-data.js')) {
  console.log('Reading post-processor data from processor-data.js');
  require('./processor-data.js')(processor);
}

app.route('/snapshots').get(function (req, res, next) {
  console.log('------------');
  console.log('Request to', req.path, 'from', req.ip);
  console.log('Parsed query', JSON.stringify(req.query, null, 2));

  if (typeof req.query.fragment !== 'undefined') {
    var url = [
      BASE_URL,
      req.query.fragment
    ].join('');
    console.log('Processing', url);
    extruder.getSnapshot(url).then(function(cache) {
      if (!cache) {
        console.log('No cached copy. Creating new snapshot.');
        extruder.createSnapshot(url).then(function(obj) {
          console.log('Received new snapshot. Responding with it.');
          res.send(processor.run(req.query.fragment, obj.content, req));
        });
      } else {
        console.log('Cached copy found. Responding with it.');
        var age = Date.now() - (cache.timestamp || 0);
        console.log('Cache is', age/1000/60, 'mins old.');
        if (age > CACHE_LIFETIME) {
          console.log('Cache is too old. Triggering new job.');
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
        res.send(processor.run(req.query.fragment, cache.content, req));
      }
    });
  } else {
    res.status(400).send('Bad Request');
  }
});

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Server listening at http://%s:%s', host, port)
});