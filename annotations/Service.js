const Component = require('./Component.js');

function decorator(target) {
  target.component.service = true;
}
module.exports =  Component(decorator);
