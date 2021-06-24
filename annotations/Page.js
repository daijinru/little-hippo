const Component = require('./Component.js');

function Page(options) {
  const {
    name,
    entry,
  } = options;
  function decorator(target) {
    target.component.page = {
      name,
      entry,
    };
  }
  return Component(decorator);
}

module.exports = Page;
