const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * String.length.
 * @return {Object} - String.length object
 */
const string$length = function() {
  const obj = object('string$length')
  obj.assets[LAMBDA] = function(_) {
    throw new ErFailure(
      `Atom string$length is not implemented yet`
    )
  }
  return obj
}

module.exports = string$length
