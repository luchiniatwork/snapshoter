var system = require('system');
var fs = require('fs');

var args = system.args;
if (args.length !== 3) {
  console.log('Syntax: phantom_script.js <url> <output_path>');
  phantom.exit(1);
}
var url = args[1];
var outPath = args[2];

console.log('Fetching', url);

var uuid = generateUUID();
var thumbPath   = [ outPath, uuid ].join('/') + '.png';
var contentPath = [ outPath, uuid ].join('/') + '.html';

var page = require('webpage').create();

page.viewportSize = {
  width: 1180,
  height: 800
};

page.settings = {
  XSSAuditingEnabled: false,
  javascriptCanCloseWindows: true,
  javascriptCanOpenWindows: true,
  javascriptEnabled: true,
  loadImages: true,
  localToRemoteUrlAccessEnabled: false,
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/534.34 (KHTML, like Gecko) PhantomJS/1.9.7 Safari/534.34',
  webSecurityEnabled: true,
  resourceTimeout: 20000
};

page.onResourceError = function(error) {
  console.log('Unable to load resource (#' + error.id + 'URL:' + error.url + ')');
  console.log('Error code: ' + error.errorCode + '. Description: ' + error.errorString);
  phantom.exit(0);
};

page.onResourceTimeout = function(request) {
  console.log('Response (#' + request.id + '): ' + JSON.stringify(request));
  console.log(uuid);
  page.render(thumbPath);
  fs.write(contentPath, page.content, 'w');
  phantom.exit(0);
};

page.open(url, function(status) {
  
  console.log('getting status', status);
  
  if (status !== 'success') {
    console.log('script.js Unable to load the address!');
    console.log('page.reason:', page.reason);
    phantom.exit(1);
  } else {
    window.setTimeout(function () {
      console.log(uuid);
      page.render(thumbPath);
      fs.write(contentPath, page.content, 'w');
      phantom.exit();
    }, 200);
  }
});

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
  });
}