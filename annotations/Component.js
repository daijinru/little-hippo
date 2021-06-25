/**
 * 为类装饰器的第一个参数 target 添加静态属性 $$component: {} 和 $$component[namespace]
 * @param {Function} wrapped 待包装原始函数
 * @param {String} namespace 在 $$component 添加的属性对象
 * @return {ClassDecorator} 返回新的类装饰器函数
 */
module.exports = function(wrapped, namespace) {
  return function() {
    if (typeof arguments[0] !==  'function') {
      throw new TypeError('仅支持修饰类');
    }
    if (!arguments[0].$$component) {
      arguments[0].$$component = {};
      arguments[0].$$component[namespace] = {};
    }
    return wrapped.apply(this, arguments);
  }
}
