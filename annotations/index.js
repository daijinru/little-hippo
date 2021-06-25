/**
 * 收集内置的合法装饰器
 */
let LEGAL_DECORATORS = null;
function collectDecorators() {
  const files = require('fs-extra').readdirSync(require('path').resolve(__dirname, './'));
  LEGAL_DECORATORS = files
    .map(f => {
      const res = /^[A-Z]\w+(?=\.js)/.exec(f);
      if (res) return res[0];
      return false;
    })
    .filter(f => f);
  return LEGAL_DECORATORS;
}

module.exports = {
  isLegalByName(name) {
    if (LEGAL_DECORATORS) {
      return LEGAL_DECORATORS.includes(name);
    }
    return collectDecorators().includes(name);
  }
}
