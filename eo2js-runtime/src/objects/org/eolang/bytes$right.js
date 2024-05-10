const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * Bytes.right.
 * @return {Object} - Bytes.right object
 */
const bytes$right = function() {
  const obj = object('bytes$right')
  obj.assets[LAMBDA] = function(_) {
    throw new ErFailure(
      `Atom bytes$right is not implemented yet`
    )
  }
  return obj
}

module.exports = bytes$right
