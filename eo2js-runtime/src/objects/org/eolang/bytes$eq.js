const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * Bytes.eq.
 * @return {Object} - Bytes.eq object
 */
const bytes$eq = function() {
  const obj = object('bytes$eq')
  obj.assets[LAMBDA] = function(_) {
    throw new ErFailure(
      `Atom bytes$eq is not implemented yet`
    )
  }
  return obj
}

module.exports = bytes$eq
