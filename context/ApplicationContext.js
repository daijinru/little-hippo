const EventEmitter = require('events');
const path = require('path');
/**
 * 在这里创建应用上下文
 * @param {object} cmd CLI 命令参数
 */
module.exports = class ApplicationContext extends EventEmitter {
  cmd = {};
  context = {};
  constructor(cmd) {
    super();
    this.cmd = cmd;
    this
      .starter()
      .initializeApplicationConfiguration()
      .initializeApplicationContext(cmd)
      .transformBuildInAnnotations()
      .initializeApplicationServer()
      .finished()
    return this;
  }
  starter() {
    this.emit('hippo:start');
    return this;
  }
  contextPrepared() {
    return this;
  }
  initializeApplicationConfiguration() {
    return this;
  }
  /**
   * 创建上下文中的路径参数
   * @param {object} cmd 命令行参数
   * @returns this
   */
  initializeApplicationContext(cmd) {
    if (cmd.scan) {
      this.context.ROOT_PATH = process.cwd();
      this.context.SRC_PATH = path.resolve(process.cwd(), cmd.scan);
    }
    this.context.cmd = cmd;
    return this;
  }
  transformBuildInAnnotations() {
    require('./transformSourceCode')(this.context);
    return this;
  }
  initializeApplicationServer() {
    return this;
  }
  finished() {
    this.emit('hippo:finished');
    return this;
  }
}

// module.exports = function (cmd) {
//   require('../decorators/index.js')();
//   const components = require('./componentScan.js')();
//   require('./createViteServe.js')(components);
// }
