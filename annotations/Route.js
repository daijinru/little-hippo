const Component = require('./Component.js');

module.exports = function(URL, options) {
  function decorator(target) {
    target.component.route = {};
    target.component.route.path = URL;
    target.component.route.options = options;
  }
  return Component(decorator);
}