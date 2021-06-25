const { resolve } = require('path');
const { transformFileSync } = require('@babel/core');

/**
 * 替换源文件中使用装饰器的表达式
 * 需要预先经过 babel-plugin-proposal-decorators 转换
 * 例如
 * ```javascript
 * @Service()
 * class Abc {}
 * ```
 * 将会被转换成 Service(_class)
 * 然后 Service 将被替换成实际的 Service() 函数表达式并保留原有参数
 */
module.exports = class PluginDecoratorsTransform {
  constructor({ types }) {
    this.AnnotationsPath = resolve(__dirname, '../annotations') + '/';
    this.annotationsModule = require(this.AnnotationsPath + 'index.js');
    this.types = types;
  }

  CallExpression(path, state) {
    let decoratorName = null;
    if (this.annotationsModule.isLegalByName(path.node.callee.name)) {
      decoratorName = path.node.callee.name;
    }
    if (
      decoratorName
      && this.types.isIdentifier(path.node.callee)
    ) {
      const { ast } = transformFileSync(
        this.AnnotationsPath + decoratorName + '.js',
        { ast: true, code: false, plugins: [[insertComponentNode(this.AnnotationsPath)]] }
      );
      ast.program.body.forEach(node => {
        if (
          this.types.isFunctionDeclaration(node)
          && this.types.isIdentifier(node.id, { name: decoratorName })
        ) {
          const argumentsNode = path.node.arguments;
          const params = node.params;
          const body = node.body;
          const callee = this.types.functionExpression(null, params, body);
          path.replaceWith(this.types.callExpression(callee, argumentsNode))
        }
      })
    }
  }
}

/**
 * 使用 Component 实际函数替换装饰器中的 Component(wrapped)
 * 因此要求装饰器的编码风格需要遵循其 README.md 所述
 */
function insertComponentNode(filePath) {
  return function({ types: t }) {
    const visitor = {};
    visitor.CallExpression = function (path) {
      const node = path.node;
      if (t.isIdentifier(node.callee, { name: 'Component' })) {
        const arguments = node.arguments;
        const { ast } = transformFileSync(filePath + 'Component.js', {ast: true, code: false});
        const callee = ast.program.body[0].expression.right;
        path.replaceWithMultiple(t.callExpression(callee, arguments));
      }
    };
    return { visitor };
  }
}
