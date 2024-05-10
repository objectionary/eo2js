const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * Bytes.not.
 * @return {Object} - Bytes.not object
 */
const bytes$not = function() {
  const obj = object('bytes$not')
  obj.assets[LAMBDA] = function(_) {
    throw new ErFailure(
      `Atom bytes$not is not implemented yet`
    )
  }
  return obj
}

module.exports = bytes$not
