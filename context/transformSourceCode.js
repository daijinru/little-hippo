const { execSync } = require('child_process');
const fs = require('fs-extra');

module.exports = function (context) {
  const name = 'hippoApplication';
  const babelConfig = context.ROOT_PATH + '/compiler/babel.config.js';
  const hippoCompliedDir = context.ROOT_PATH + '/.' + name;
  const cmd = context.cmd;
  if (fs.pathExistsSync(hippoCompliedDir)) {
    execSync(`rm -rf ${hippoCompliedDir}`);
  }
  const command = 'npx babel '
    + (cmd.watch ? '--watch ' : '')
    + `--config-file ${babelConfig} `
    + `--out-dir ${hippoCompliedDir} `
    + `${context.SRC_PATH} `;
  execSync(command, cmd.stdio ? { stdio: 'inherit'} : null);
}
