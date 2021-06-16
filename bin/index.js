#!/usr/bin/env node
const program = require('commander');

program
  .usage('<command> [options]');

program.on('--help', () => {
  console.warn(`Run npm run help`);
});

program
  .command('serve')
  .description('启动本地开发环境')
  .option('--scan <path>', '指定扫描路径')
  .action(cmd => {
    require('../index.js')(cmd);
    // nodemon({
    //   script: path.resolve(__dirname, '../index.js'),
    //   exec: 'babel-node --config-file="./babel.config.js"',
    //   args: process.argv.slice(3),
    // });
  });

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

program.parse(process.argv);

// program
//   .command('build')
//   .description('压缩编译项目的静态文件到指定路径')
//   .option('--env <env>', '指定加载环境变量')
//   .option('--output <path>', '指定静态文件的输出路径')
//   .action((cmd) => {
//     require('../runner/build')(cleanArgs(cmd));
//   });
