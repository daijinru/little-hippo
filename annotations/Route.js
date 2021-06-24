const Component = require('./Component.js');

function Route(path, options) {
  function decorator(target) {
    target.component.route = {};
    target.component.route.path = path;
    target.component.route.options = options;
  }
  return Component(decorator);
}

module.exports = Route;
