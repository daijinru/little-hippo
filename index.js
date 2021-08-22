module.exports = function() {
  const ApplicationContext = require('./context/Application.js');
  new ApplicationContext(cleanArgs(process.argv));

  function cleanArgs (cmd = []) {
    if (!cmd || !Array.isArray(cmd)) return;
    const args = {};
    let key = '';
    let flag = 0;

    const argsDefault = {
      '--scan': 'requireString',
      '--watch': true,
      '--stdio': true,
    }

    cmd.forEach(c => {
      const isCmdKey = c.startsWith('--') || c.startsWith('-');
      if (isCmdKey && argsDefault[c]) {
        const k = c.replace('--', '');
        args[k] = argsDefault[c];
        // 符合以下条件说明该命令需要值类型的设置
        if (args[k] === 'requireString') {
          flag = 1;
          key = k;
        }
      } else {
        if (flag && args[key] === 'requireString') {
          args[key] = c;
        }
      }
    })
    return args;
  }
}
