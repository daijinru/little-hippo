const EventEmitter = require('events');
const path = require('path');
/**
 * 应用上下文入口
 * @param {object} cmd CLI 命令参数
 */
module.exports = class Application extends EventEmitter {
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
      const ROOT_PATH = this.context.ROOT_PATH = process.cwd();
      this.context.SRC_PATH = path.resolve(ROOT_PATH, cmd.scan);
      this.context.OUTPUT_PATH = path.resolve(ROOT_PATH, '.hippoApplication');
    }
    this.context.cmd = cmd;
    return this;
  }
  transformBuildInAnnotations() {
    require('./transform')(this.context);
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
