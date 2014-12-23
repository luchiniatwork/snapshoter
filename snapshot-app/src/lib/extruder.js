var path         = require('path'),
    childProcess = require('child_process'),
    phantomjs    = require('phantomjs'),
    fs           = require( 'fs'),
    q            = require('q'),
    redis        = require('redis');

var binPath = phantomjs.path;

var client = redis.createClient(
  process.env.REDIS_PORT_6379_TCP_PORT,
  process.env.REDIS_PORT_6379_TCP_ADDR
);
client.select(3);

module.exports = {

  createSnapshot: function (url) {
    var deferred = q.defer();
    console.log('Triggering Phantomjs for', url);
    
    var outputPath = '.';
  
    var childArgs = [
      '--ignore-ssl-errors=true',
      '--ssl-protocol=any',
      path.join(__dirname, 'phantom_script.js'),
      url,
      outputPath
    ];

    childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
      console.log('Phantomjs finished for', url);

      if (!err) {
        var out = {};
      
        var uuid        = stdout.substr(0, 36),
            contentPath = outputPath + '/' + uuid + '.html',
            thumbPath   = outputPath + '/' + uuid + '.png';

        console.log('Processing return for UUID', uuid);
      
        out.content   = fs.readFileSync(contentPath).toString();
        out.thumb     = fs.readFileSync(thumbPath).toJSON();
        out.timestamp = Date.now();

        client.hmset(url,
          'content', out.content,
          'thumb', out.thumb,
          'timestamp', out.timestamp
        );
      
        fs.unlinkSync(contentPath);
        fs.unlinkSync(thumbPath);
      
        deferred.resolve(out);
      } else {
        console.log('Err', err);
        console.log('stderr', stderr);
        deferred.reject(new Error('PhantomJS failed'));
      }
    });
    return deferred.promise;
  },
  
  getSnapshot: function (url) {
    var deferred = q.defer();
    client.hgetall(url, function (err, obj) {
      deferred.resolve(obj);
    });
    return deferred.promise;
  }
  
};
