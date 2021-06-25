const Component = require('./Component.js');

function Service(option = {}) {
  function decorator(target) {
    target.$$component.service = option;
  }
  return Component(decorator, 'service');
}

module.exports = Service;
