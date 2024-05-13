const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * Cage.φ.
 * @return {Object} - Cage.φ object
 * @todo #3:30min Implement cage$φ atom. We need to implement the atom and make sure it
 *  works. For the details of implementation check the Java analogue on
 *  https://github.com/objectionary/eo/tree/master/eo-runtime/src/main/java/EOorg/EOeolang
 */
const cage$φ = function() {
  const obj = object('cage$φ')
  obj.assets[LAMBDA] = function(_) {
    throw new ErFailure(
      `Atom cage$φ is not implemented yet`
    )
  }
  return obj
}

module.exports = cage$φ
