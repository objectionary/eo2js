const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * Dataized.
 * @return {Object} - Dataized object
 * @todo #3:30min Implement dataized atom. We need to implement the atom and make sure it
 *  works. For the details of implementation check the Java analogue on
 *  https://github.com/objectionary/eo/tree/master/eo-runtime/src/main/java/EOorg/EOeolang
 */
const dataized = function() {
  const obj = object('dataized')
  obj.assets[LAMBDA] = function(_) {
    throw new ErFailure(
      `Atom dataized is not implemented yet`
    )
  }
  return obj
}

module.exports = dataized
