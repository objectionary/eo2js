const object = require('../../../../runtime/object')
const {LAMBDA, RHO} = require('../../../../runtime/attribute/specials');
const at_void = require('../../../../runtime/attribute/at-void');
const ErFailure = require('../../../../runtime/error/ErFailure');

/**
 * Dir.walk.
 * @return {Object} - Dir.walk object
 */
const dir$walk = function() {
  const obj = object('dir$walk')
  obj.attrs['glob'] = at_void('glob')
  obj.assets[LAMBDA] = function(_) {
    throw new ErFailure(
      `Atom dir$walk is not implemented yet`
    )
  }
  return obj
}

module.exports = dir$walk
