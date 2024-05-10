const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * Bytes.or.
 * @return {Object} - Bytes.or object
 */
const bytes$or = function() {
  const obj = object('bytes$or')
  obj.assets[LAMBDA] = function(_) {
    throw new ErFailure(
      `Atom bytes$or is not implemented yet`
    )
  }
  return obj
}

module.exports = bytes$or
