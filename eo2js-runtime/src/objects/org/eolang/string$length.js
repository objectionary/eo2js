const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * String.length.
 * @return {Object} - String.length object
 * @todo #3:30min Implement string$length atom. We need to implement the atom and make sure it
 *  works. For the details of implementation check the Java analogue on
 *  https://github.com/objectionary/eo/tree/master/eo-runtime/src/main/java/EOorg/EOeolang
 */
const string$length = function() {
  const obj = object('string$length')
  obj.assets[LAMBDA] = function(_) {
    throw new ErFailure(
      `Atom string$length is not implemented yet`
    )
  }
  return obj
}

module.exports = string$length
