const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * Bytes.xor.
 * @return {Object} - Bytes.xor object
 * @todo #3:30min Implement bytes$xor atom. We need to implement the atom and make sure it
 *  works. For the details of implementation check the Java analogue on
 *  https://github.com/objectionary/eo/tree/master/eo-runtime/src/main/java/EOorg/EOeolang
 */
const bytes$xor = function() {
  const obj = object('bytes$xor')
  obj.assets[LAMBDA] = function(_) {
    throw new ErFailure(
      `Atom bytes$xor is not implemented yet`
    )
  }
  return obj
}

module.exports = bytes$xor
