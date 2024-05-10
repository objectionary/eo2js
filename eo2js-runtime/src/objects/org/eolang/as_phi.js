const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * As_phi.
 * @return {Object} - As_phi object
 */
const as_phi = function() {
  const obj = object('as_phi')
  obj.assets[LAMBDA] = function(_) {
    throw new ErFailure(
      `Atom as_phi is not implemented yet`
    )
  }
  return obj
}

module.exports = as_phi
