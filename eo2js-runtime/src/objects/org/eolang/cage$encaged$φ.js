const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * Cage.encaged.φ.
 * @return {Object} - Cage.encaged.φ object
 * @todo #3:30min Implement cage$encaged$φ atom. We need to implement the atom and make sure it
 *  works. For the details of implementation check the Java analogue on
 *  https://github.com/objectionary/eo/tree/master/eo-runtime/src/main/java/EOorg/EOeolang
 */
const cage$encaged$φ = function() {
  const obj = object('cage$encaged$φ')
  obj.assets[LAMBDA] = function(_) {
    throw new ErFailure(
      `Atom cage$encaged$φ is not implemented yet`
    )
  }
  return obj
}

module.exports = cage$encaged$φ
