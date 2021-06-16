module.exports = function(cmd) {
  const ApplicationContext = require('./context/ApplicationContext.js');
  new ApplicationContext(cleanArgs(process.argv));

  function cleanArgs (cmd = []) {
    if (!cmd || !Array.isArray(cmd)) return;
    const args = {};
    let key = '';
    let flag = 0;
    cmd.forEach(c => {
      if (flag) {
        args[key] = c;
        key = '';
        flag = 0;
      } else {
        if (c.startsWith('--') || c.startsWith('-') && !key) {
          key = c.replace(/^--/, '').replace(/^-/, '');
          flag = 1;
        }
      }
    })
    return args;
  }
}
