const glob = require('glob');
const path = require('path');

module.exports = function(context) {
  const components = glob.sync(path.resolve(context.SRC_PATH + '/**/*.js'), { matchBase: true });
  return components
    .filter(component => {
      const ctr = require(component).default;
      if (ctr && ctr.component) {
        return true;
      }
    })
    .map(component => {
      const ctr = require(component).default;
      return {
        path: component,
        component: ctr.component 
      };
    })
}

