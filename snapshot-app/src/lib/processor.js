var cheerio = require('cheerio');

var global = null,
    routes = [];

module.exports = {

  run: function (uri, content, meta) {
    if (uri.substr(0, 1) !== '/') {
      uri = '/' + uri;
    }
    console.log('Post-processing content for', uri);
    var $ = cheerio.load(content);
    if (global) {
      console.log('Running global directive');
      global($, uri, meta);
    }
    for(var idx in routes) {
      if (routes[idx].regex.test(uri)) {
        console.log('Running route directive', routes[idx].regex);
        routes[idx].handler($, uri, meta);
      }
    }
    return $.html();
  },

  global: function (handler) {
    global = handler;
    return this;
  },
  
  when: function (regex, handler) {
    routes.push({
      regex: regex,
      handler: handler
    });
    return this;
  }
  
  
};