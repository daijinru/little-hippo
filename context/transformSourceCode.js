const { execSync } = require('child_process');
const fs = require('fs-extra');

module.exports = function (context) {
  const name = 'hippoApplication';
  const babelConfig = context.HIPPO_PATH + '/babel.config.js';
  const hippoCompliedDir = context.HIPPO_PATH + '/.' + name;
  if (fs.pathExistsSync(hippoCompliedDir)) {
    execSync(`rm -rf ${hippoCompliedDir}`);
  }
  const command = ''
    + `npx babel --config-file ${babelConfig} `
    + `--out-dir ${context.ROOT_PATH}/.${name} `
    + `${context.SRC_PATH} `;
  execSync(command);
}
