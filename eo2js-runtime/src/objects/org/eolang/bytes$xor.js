const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * Bytes.xor.
 * @return {Object} - Bytes.xor object
 */
const bytes$xor = function() {
  const obj = object('bytes$xor')
  obj.assets[LAMBDA] = function(_) {
    throw new ErFailure(
      `Atom bytes$xor is not implemented yet`
    )
  }
  return obj
}

module.exports = bytes$xor
