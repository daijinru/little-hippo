/**
 * 导出装饰器到全局
 * 所有装饰器的命名必须是首字母大写
 */
module.exports = function () {
  global.Route = require('./Route.js');
  global.Service = require('./Service.js');
  global.Page = require('./Page.js');
  global.Inject = require('./Inject.js');
  global.Injectable = require('./Injectable.js');
}
