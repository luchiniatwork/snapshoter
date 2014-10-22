var kue = require('kue');

var jobs = kue.createQueue({
  prefix: 'q',
  redis: {
    port: process.env.REDIS_PORT_6379_TCP_PORT,
    host: process.env.REDIS_PORT_6379_TCP_ADDR,
    options: {
    }
  }
});

var server = kue.app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('kue-ui server listening at http://%s:%s', host, port)
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