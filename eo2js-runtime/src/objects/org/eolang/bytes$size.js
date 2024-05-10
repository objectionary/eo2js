const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * Bytes.size.
 * @return {Object} - Bytes.size object
 */
const bytes$size = function() {
  const obj = object('bytes$size')
  obj.assets[LAMBDA] = function(_) {
    throw new ErFailure(
      `Atom bytes$size is not implemented yet`
    )
  }
  return obj
}

module.exports = bytes$size
