const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * String.slice.
 * @return {Object} - String.slice object
 * @todo #3:30min Implement string$slice atom. We need to implement the atom and make sure it
 *  works. For the details of implementation check the Java analogue on
 *  https://github.com/objectionary/eo/tree/master/eo-runtime/src/main/java/EOorg/EOeolang
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
