var system = require('system'),
    fs     = require('fs');

var args = system.args;
if (args.length < 3) {
  system.stdout.writeLine(
    'Syntax: phantom_script.js url output_path <-v>'
  );
  phantom.exit(1);
}

var url        = args[1],
    outPath    = args[2],
    verbose    = !!args[3];

var uuid        = generateUUID(),
    thumbPath   = [ outPath, uuid ].join('/') + '.png',
    contentPath = [ outPath, uuid ].join('/') + '.html';

if (verbose) {
  system.stdout.writeLine('Fetching ' + url);
  system.stdout.writeLine('Saving thumb to ' + thumbPath);
  system.stdout.writeLine('Saving content to ' + contentPath);
}

var page = require('webpage').create();

configPage();

page.onResourceError = function(error) {
  system.stderr.writeLine([
    'Unable to load resource (#', error.id,
    'URL: ', error.url, ')'
  ].join(''));
  system.stderr.writeLine([
    'Error code: ' + error.errorCode,
    '. Description: ' + error.errorString
  ].join(''));
  phantom.exit(1);
};

page.onResourceTimeout = function(request) {
  system.stderr.writeLine(
    'Response (#' + request.id + ') timed out: ' +
    JSON.stringify(request)
  );
  saveOut();
  phantom.exit(0);
};

page.open(url, function(status) {
  
  if (verbose) system.stdout.writeLine('Status received: ' + status);
  
  if (status !== 'success') {
    system.stderr.writeLine('Unable to load the address!');
    system.stderr.writeLine('Reason: ' + page.reason);
    phantom.exit(1);
  } else {
    window.setTimeout(function () {
      saveOut();
      phantom.exit(0);
    }, 200);
  }
});

// ------------
// Utility functions
// ------------

function configPage() {
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
    userAgent: [
      'Mozilla/5.0 (Macintosh; Intel Mac OS X)',
      'AppleWebKit/534.34',
      '(KHTML, like Gecko)',
      'PhantomJS/1.9.7',
      'Safari/534.34'
    ].join(' '),
    webSecurityEnabled: true,
    resourceTimeout: 20000
  };
}

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

function saveOut() {
  var out = (verbose) ? 'UUID used: {' + uuid + '}' : uuid;
  system.stdout.writeLine(out);
  page.render(thumbPath);
  fs.write(contentPath, page.content, 'w');
}