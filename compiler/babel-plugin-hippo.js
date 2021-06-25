const DecoratorsTransform = require('./PluginDecoratorsTransform.js');

module.exports = function ({ types }) {
  let transformDecorators = null;

  function applyInstance(method, args, context) {
    if (transformDecorators[method])
      transformDecorators[method]
        .apply(transformDecorators, [...args, context]);
  }

  const Program = {
    enter() {
      transformDecorators = new DecoratorsTransform({ types });
    },
  };
  const ret = {
    visitor: { Program }
  };
  const methods = [
    'CallExpression'
  ];
  for (const method of methods) {
    ret.visitor[method] = function() {
      applyInstance(method, arguments, ret.visitor);
    }
  }
  return ret;
}
