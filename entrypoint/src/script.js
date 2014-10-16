var system = require('system');
var args = system.args;
if (args.length === 1) {
  console.log('Syntax: script.js <url>');
  phantom.exit(1);
}
var url = args[1];
console.log(url);
var page = require('webpage').create();

console.log('script.js starting');

page.viewportSize = { width: 1180, height: 800 };
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
  page.render('src/output.png');
  
  // var content = page.content;
  // console.log('Content: ' + content);
  
  phantom.exit(0);
};

// page.open('https://www.virginamerica.com/cms/airport-destinations', function(status) {
page.open(url, function(status) {
  
  console.log('getting status', status);
  // phantom.exit();
  
  if (status !== 'success') {
    console.log('script.js Unable to load the address!');
    console.log('page.reason:', page.reason);
    phantom.exit(1);
  } else {
    window.setTimeout(function () {
      page.render('src/output.png');
      phantom.exit();
    }, 200);
  }
});