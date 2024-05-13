const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * Cage.encaged.encage.
 * @return {Object} - Cage.encaged.encage object
 * @todo #3:30min Implement cage$encaged$encage atom. We need to implement the atom and make sure it
 *  works. For the details of implementation check the Java analogue on
 *  https://github.com/objectionary/eo/tree/master/eo-runtime/src/main/java/EOorg/EOeolang
 */
const cage$encaged$encage = function() {
  const obj = object('cage$encaged$encage')
  obj.assets[LAMBDA] = function(_) {
    throw new ErFailure(
      `Atom cage$encaged$encage is not implemented yet`
    )
  }
  return obj
}

module.exports = cage$encaged$encage
