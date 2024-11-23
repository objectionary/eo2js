const object = require('../../../../runtime/object')
const {LAMBDA} = require('../../../../runtime/attribute/specials');
const at_void = require('../../../../runtime/attribute/at-void');
const at_string = require('../../../../runtime/attribute/at-string');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

/**
 * Dir.walk recursively walks a directory and returns files matching a glob pattern.
 * @return {Object} - Dir.walk object
 */
const dir$walk = function() {
  const obj = object('dir$walk')
  obj.attrs['glob'] = at_void('glob')
  obj.assets[LAMBDA] = function(_) {
    const pattern = obj.attrs['glob'].data;
    const files = glob.sync(pattern);
    return at_string(files.join('\n'));
  }
  return obj
}

module.exports = dir$walk
