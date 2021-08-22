const { execSync } = require('child_process');
const fs = require('fs-extra')
const { resolve } = require('path');

module.exports = function ({ ROOT_PATH, SRC_PATH, OUTPUT_PATH, cmd }) {
  const babelConfig = resolve(ROOT_PATH, './context/babel/config.js');
  if (fs.pathExistsSync(OUTPUT_PATH)) {
    require(resolve(ROOT_PATH, './util/index.js'))
      .removeDirSync(OUTPUT_PATH);
  }
  const command = 'npx babel '
    + (cmd.watch ? '--watch ' : '')
    + `--config-file ${babelConfig} `
    + `--out-dir ${OUTPUT_PATH} `
    + `${SRC_PATH} `;
  execSync(command, cmd.stdio ? { stdio: 'inherit'} : null);
}
