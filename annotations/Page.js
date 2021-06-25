const Component = require('./Component.js');

function Page(option = {}) {
  function decorator(target) {
    target.$$component.page = option;
  }
  return Component(decorator, 'page');
}

module.exports = Page;
