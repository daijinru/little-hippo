const parser = require('@babel/parser');
const Service = require('../annotations/Service.js');

module.exports = function ({ types: t }) {
  return {
    visitor: {
      // BinaryExpression(path, state) {
      //   console.info(path, state);
      // },
      // ImportDeclaration(path, state) {
      //   console.info(path, state);
      // },
      ClassDeclaration(path, state) {
        // console.info(state);
        // console.info(path.node);
        const { decorators } = path.node;
        console.info(parser.parse('const name = "a"'));
        if (decorators && decorators.length > 0) {
          decorators.forEach(d => {
            // console.info(d);
          })
        }
      }
    }
  }
}
