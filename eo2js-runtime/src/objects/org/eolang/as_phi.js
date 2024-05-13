const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * As_phi.
 * @return {Object} - As_phi object
 * @todo #3:30min Implement as_phi atom. We need to implement the atom and make sure it
 *  works. For the details of implementation check the Java analogue on
 *  https://github.com/objectionary/eo/tree/master/eo-runtime/src/main/java/EOorg/EOeolang
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
