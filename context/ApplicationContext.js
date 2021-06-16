const EventEmitter = require('events');
const path = require('path');
/**
 * 在这里创建应用上下文
 * @param {object} cmd CLI 命令参数
 */
module.exports = class ApplicationContext extends EventEmitter {
  cmd = {};
  components = [];
  devServer = null;
  context = {};
  constructor(cmd) {
    super();
    this.cmd = cmd;
    this
      .doStarter()
      .createContextPaths(cmd)
      // .doRegisterDecorators()
      .doCompiledSourceCode()
      // .doComponentScan()
      // .createDevServe()
      .doFinished()
    return this;
  }
  /**
   * 创建上下文中的路径参数
   * @param {object} cmd 命令行参数
   * @returns this
   */
  createContextPaths(cmd) {
    if (cmd.scan) {
      this.context.ROOT_PATH = process.cwd();
      this.context.HIPPO_PATH = path.resolve(__dirname, '../');
      this.context.SRC_PATH = path.resolve(process.cwd(), cmd.scan);
    }
    return this;
  }
  doStarter() {
    this.emit('hippo:start');
    return this;
  }
  doRegisterDecorators() {
    require('../annotations/index.js')();
    return this;
  }
  doCompiledSourceCode() {
    require('./transformSourceCode')(this.context);
    return this;
  }
  doComponentScan() {
    this.components = require('./componentScan.js')(this.context);
    this.context.components = this.components;
    return this;
  }
  createDevServe() {
    this.devServer = require('../services/startupVueCliService.js')(this.context);
    this.context.devServer = this.devServer;
    return this;
  }
  doFinished() {
    this.emit('hippo:finished');
    return this;
  }
}

// module.exports = function (cmd) {
//   require('../decorators/index.js')();
//   const components = require('./componentScan.js')();
//   require('./createViteServe.js')(components);
// }
