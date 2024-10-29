const object = require('../../../../runtime/object')
const {LAMBDA} = require('../../../../runtime/attribute/specials');
const ErFailure = require('../../../../runtime/error/ErFailure');

/**
 * Posix.φ.
 * @return {Object} - Posix.φ object
 */
const posix$φ = function() {
  const obj = object('posix$φ')
  obj.assets[LAMBDA] = function(_) {
    throw new ErFailure(
      `Atom posix$φ is not implemented yet`
    )
  }
  return obj
}

module.exports = posix$φ
