const { resolve } = require('path');
const { parse, transformFileSync, transformFromAstSync } = require('@babel/core');
const Service = require('../annotations/Service.js');

/**
 * @Todo
 * 当装饰器文件有引入 Component 的行为则将后者插入到使用装饰器的文件中
 */
function insertComponentNode({ types: t }) {
  return {
    visitor: {
      FunctionDeclaration(path, state) {
        // console.info(path.node);
      },
      // (path, state) {
      //   console.info(path);
      // }
      VariableDeclarator(path) {
        console.info(path.node);
      }
    }
  }
}

module.exports = function ({ types: t }) {


  return {
    visitor: {
      ClassDeclaration(path, state) {
        // console.info(state);
        // console.info(path.node);
        const { decorators } = path.node;
        const decoratorsIdentifierNames = [];
        if (decorators && decorators.length > 0) {
          decorators.forEach(d => {
            // console.info(d);
            decoratorsIdentifierNames.push(d.expression.name);
          })
        }
        const { ast } = transformFileSync(resolve(__dirname, '../annotations/' + 'Service' + '.js'), {
          ast: true,
          code: false,
          plugins: [
            [insertComponentAst]
          ]
        });
        // return;
        // path.insertAfter(t.expressionStatement(t.stringLiteral('a fool')))
        // console.info(decoratorsIdentifierNames);
        // @Todo
        decoratorsIdentifierNames.forEach(name => {
          const decoratorPath = resolve(__dirname, '../annotations/' + name + '.js');
          const { ast } = transformFileSync(decoratorPath, {
            ast: true,
            code: false,
            plugins: [
              // [insertComponentAst]
            ]
          });
          path.insertAfter(ast);
          // console.info(transformFromAstSync(ast));
        })
      }
    }
  }
}
