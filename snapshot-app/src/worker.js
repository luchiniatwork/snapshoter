var kue          = require('kue'),
    extruder = require('./lib/extruder');

console.log('Waiting for jobs');

var jobs = kue.createQueue({
  prefix: 'q',
  redis: {
    port: process.env.REDIS_PORT_6379_TCP_PORT,
    host: process.env.REDIS_PORT_6379_TCP_ADDR,
    options: {
    }
  }
});

jobs.process('snapshot', function(job, done){
  console.log('------------');
  console.log('Processing job', job.id);
  var url = job.data.url;
  extruder.createSnapshot(url).then(function(obj) {
    console.log('Cache refreshed for', url);
    done();
  }).fail(function(err) {
    console.log('Cache FAILED for', url);
    console.log('ERR', err);
    done(err);
  });
});