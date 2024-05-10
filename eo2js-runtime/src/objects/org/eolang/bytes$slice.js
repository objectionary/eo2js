const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * Bytes.slice.
 * @return {Object} - Bytes.slice object
 */
const bytes$slice = function() {
  const obj = object('bytes$slice')
  obj.assets[LAMBDA] = function(_) {
    throw new ErFailure(
      `Atom bytes$slice is not implemented yet`
    )
  }
  return obj
}

module.exports = bytes$slice
