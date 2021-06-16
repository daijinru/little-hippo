const Service = require('@vue/cli-service');

module.exports = function (context) {
  const rawArgv = process.argv.slice(2);
  const args = require('minimist')(rawArgv, {
    boolean: [
      // build
      'modern',
      'report',
      'report-json',
      'inline-vue',
      'watch',
      // serve
      'open',
      'copy',
      'https',
      // inspect
      'verbose'
    ]
  })
  const command = args._[0]
  const service = new Service(process.cwd());
  service.run(command, args, rawArgv)
    .catch(err => {
      console.error(err);
      process.exit(1);
    })
}
