const Component = require('./Component.js');

const Service = Component(function(target) {
  target.component.service = true;
});

module.exports = Component(Service);
