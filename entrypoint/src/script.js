var page = require('webpage').create();

console.log('starting');

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

page.onResourceTimeout = function(request) {
  console.log('Response (#' + request.id + '): ' + JSON.stringify(request));
  page.render('output.png');
  
  var content = page.content;
    console.log('Content: ' + content);
  
  phantom.exit(0);
};

// page.open('https://www.virginamerica.com/cms/airport-destinations', function(status) {
page.open('https://www.virginamerica.com/', function(status) {
  
  console.log('getting status', status);
  // phantom.exit();
  
  if (status !== 'success') {
    console.log('Unable to load the address!');
    phantom.exit(1);
  } else {
    window.setTimeout(function () {
      page.render('output.png');
      phantom.exit();
    }, 200);
  }
});