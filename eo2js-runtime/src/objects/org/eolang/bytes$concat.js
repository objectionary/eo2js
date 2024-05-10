const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * Bytes.concat.
 * @return {Object} - Bytes.concat object
 */
const bytes$concat = function() {
  const obj = object('bytes$concat')
  obj.assets[LAMBDA] = function(_) {
    throw new ErFailure(
      `Atom bytes$concat is not implemented yet`
    )
  }
  return obj
}

module.exports = bytes$concat
