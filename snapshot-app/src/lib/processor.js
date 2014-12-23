var cheerio = require('cheerio');

var global = null,
    routes = [];

module.exports = {

  run: function (path, content, meta) {
    if (path.substr(0, 1) !== '/') {
      path = '/' + path;
    }
    console.log('Post-processing content for', path);
    var $ = cheerio.load(content);
    if (global) {
      console.log('Running global directive');
      global($, path, meta);
    }
    for(var idx in routes) {
      if (routes[idx].regex.test(path)) {
        console.log('Running route directive', routes[idx].regex);
        routes[idx].handler($, path, meta);
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