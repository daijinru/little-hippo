const Component = require('./Component.js');

function Route(option = {}) {
  function decorator(target) {
    target.$$component.route = option;
  }
  return Component(decorator, 'route');
}

module.exports = Route;
