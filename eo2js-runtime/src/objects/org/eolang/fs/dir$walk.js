const object = require('../../../../runtime/object')
const {LAMBDA, RHO} = require('../../../../runtime/attribute/specials');
const at_void = require('../../../../runtime/attribute/at-void');
const data = require('../../../../runtime/data');
const dataized = require('../../../../runtime/dataized');
const fs = require('fs');
const path = require('path');

/**
 * Dir.walk recursively walks a directory and returns files matching a glob pattern.
 * @return {Object} - Dir.walk object
 */
const dir$walk = function() {
  const obj = object('dir$walk')
  obj.attrs['glob'] = at_void('glob')
  obj.assets[LAMBDA] = function(self) {
    const dirPath = dataized(self.take(RHO).take('file').take('path')).toString();
    const pattern = dataized(self.take('glob')).toString();
    const absPath = path.resolve(dirPath);
    const phi = require('../../../../runtime/phi');
    const eolang = phi.take('org.eolang');
    const fs_file = eolang.take('fs.file');

    const walkSync = function(dir, pattern) {
      let results = [];
      const list = fs.readdirSync(dir);
      list.forEach(function(file) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
          results = results.concat(walkSync(filePath, pattern));
        } else {
          const relativePath = path.relative(absPath, filePath);
          if (require('minimatch')(relativePath, pattern)) {
            results.push(fs_file.copy().with({0: data.toObject(relativePath)}));
          }
        }
      });
      return results;
    }

    try {
      const files = walkSync(absPath, pattern);
      return data.toTuple(files);
    } catch (err) {
      throw new Error(`Can't walk at ${absPath}: ${err.message}`);
    }
  }
  return obj
}

module.exports = dir$walk
