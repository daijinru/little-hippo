const path = require('path');
const fs = require('fs');
const os = require('os');

module.exports = function (
  path,
  options = { recursive: true, unsafe: false }
) {
  if(validatePath(path, options)) {
    try {
      fs.rmSync(path, { recursive: options.recursive ?? true });
      return true;
    } catch(e) {
      return handleError(e);
    }
  } else {
    return undefined;
  }
}

function isPathInside(childPath, parentPath) {
	const relation = path.relative(parentPath, childPath);

	return Boolean(
		relation &&
		relation !== '..' &&
		!relation.startsWith(`..${path.sep}`) &&
		relation !== path.resolve(childPath)
	);
}

function validatePath(path, options) {
  if(options.unsafe) {
    return true;
  } else {
    return isPathInside(path, process.cwd()) || isPathInside(path, os.tmpdir());
  }
}
