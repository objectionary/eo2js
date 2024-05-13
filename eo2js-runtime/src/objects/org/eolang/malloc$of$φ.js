const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * Malloc.of.φ.
 * @return {Object} - Malloc.of.φ object
 * @todo #3:30min Implement malloc$of$φ atom. We need to implement the atom and make sure it
 *  works. For the details of implementation check the Java analogue on
 *  https://github.com/objectionary/eo/tree/master/eo-runtime/src/main/java/EOorg/EOeolang
 */
const malloc$of$φ = function() {
  const obj = object('malloc$of$φ')
  obj.assets[LAMBDA] = function(_) {
    throw new ErFailure(
      `Atom malloc$of$φ is not implemented yet`
    )
  }
  return obj
}

module.exports = malloc$of$φ
