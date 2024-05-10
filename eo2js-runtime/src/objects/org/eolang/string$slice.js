const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * String.slice.
 * @return {Object} - String.slice object
 */
const string$slice = function() {
  const obj = object('string$slice')
  obj.assets[LAMBDA] = function(_) {
    throw new ErFailure(
      `Atom string$slice is not implemented yet`
    )
  }
  return obj
}

module.exports = string$slice
