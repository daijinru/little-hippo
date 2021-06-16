const Component = require('./Component.js');

module.exports = function(options) {
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
