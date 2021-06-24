/**
 * 为 component 类型的装饰器所装饰的「类的构造函数」添加 component: true
 * @param  {Function} wrapped 被包裹的装饰器，适用类装饰器
 * @return {Function} 返回被包裹的函数
 */
module.exports = function(wrapped) {
  return function() {
    if (typeof arguments[0] ===  'function') {
      arguments[0].component = {};
    }
    return wrapped.apply(this, arguments);
  }
}
