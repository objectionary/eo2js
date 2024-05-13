const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * Bytes.eq.
 * @return {Object} - Bytes.eq object
 * @todo #3:30min Implement bytes$eq atom. We need to implement the atom and make sure it
 *  works. For the details of implementation check the Java analogue on
 *  https://github.com/objectionary/eo/tree/master/eo-runtime/src/main/java/EOorg/EOeolang
 */
const bytes$eq = function() {
  const obj = object('bytes$eq')
  obj.assets[LAMBDA] = function(_) {
    throw new ErFailure(
      `Atom bytes$eq is not implemented yet`
    )
  }
  return obj
}

module.exports = bytes$eq
