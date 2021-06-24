const { resolve } = require('path');
const { transformFileSync } = require('@babel/core');

/**
 * AnnotationsPath 文件夹路径常量
 * annotations 装饰器模块
 */
const AnnotationsPath = resolve(__dirname, '../annotations') + '/';
const annotations = require('../annotations/index.js');

/**
 * 当装饰器文件有引入 Component 的行为则将后者插入到使用装饰器的文件中
 * 是否引入 Component 是一个完整的 require 表达式，但是无需关注是否使用它，例如 Component(wrapped)
 */
function insertComponentNode({ types: t }) {
  const visitor = {};
  visitor.CallExpression = function(path) {
    // const expression = path.node.expression;
    const node = path.node;
    if (t.isIdentifier(node.callee, { name: 'Component' })) {
      const arguments = node.arguments;
      const { ast } = transformFileSync(AnnotationsPath + 'Component.js', { ast: true, code: false });
      const callee = ast.program.body[0].expression.right;
      path.replaceWithMultiple(t.callExpression(callee, arguments));
    }
  };
  /**
   * 在上述步骤已经将 Component(Wrapped) 调用表达式中的 Component 替换为实际函数
   * 然后在这里移除在引入实际函数时的 const component = require('./component.js') 写法
   */
  visitor.Identifier = function(path) {
    if (path.node.name === 'Component') {
      path.parentPath.remove();
    }
    if (path.node.name === 'Service') {
      // path.remove();
      console.info(path.parentPath.parentPath.node);
    }
  };
  return { visitor };
}

module.exports = function ({ types: t }) {
  return {
    visitor: {
      ClassDeclaration(path, state) {
        const { decorators } = path.node;
        const decoratorsIdentifierNames = [];
        if (decorators && decorators.length > 0) {
          decorators.forEach(d => {
            if (annotations.isLegalByName(d.expression.name)) {
              decoratorsIdentifierNames.push(d.expression.name);
            }
          })
        }
        decoratorsIdentifierNames.forEach(name => {
          const { ast } = transformFileSync(AnnotationsPath + name + '.js', {
            ast: true,
            code: false,
            plugins: [
              [insertComponentNode]
            ]
          });
          if (path.scope.hasBinding('Service')) {
            console.info(1);
          }
          path.insertAfter(ast);
        })
      }
    }
  }
}
