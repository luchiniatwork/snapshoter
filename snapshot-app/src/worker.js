var kue          = require('kue'),
    path         = require('path'),
    childProcess = require('child_process'),
    phantomjs    = require('phantomjs');

var binPath = phantomjs.path;

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
  // email(job.data.to, done);
  console.log('Processing job');
  done();
});

// app.route('/snapshots').get(function (req, res, next) {
//   console.log('------------');
//   console.log('Request to', req.path, 'from', req.ip);
//   console.log('parsed query', JSON.stringify(req.query, null, 2));
//
//   var childArgs = [
//     '--ignore-ssl-errors=true',
//     '--ssl-protocol=any',
//     path.join(__dirname, 'phantom_script.js'),
//     [
//       'https://www.virginamerica.com',
//       req.query.fragment
//     ].join('/')
//   ];
//
//   console.log('Triggering phantomjs');
//   childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
//
//     console.log('Got response');
//
//     console.log('---stdout---', stdout);
//     console.log('---stderr---', stderr);
//
//     var options = {
//       root: __dirname + '/',
//       dotfiles: 'deny',
//       headers: {
//         'x-timestamp': Date.now(),
//         'x-sent': true
//       }
//     };
//
//     res.sendFile('output.png', options);
//   });
// });
//
// var server = app.listen(3000, function () {
//   var host = server.address().address
//   var port = server.address().port
//   console.log('Server listening at http://%s:%s', host, port)
// });