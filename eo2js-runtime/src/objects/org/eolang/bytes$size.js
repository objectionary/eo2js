const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * Bytes.size.
 * @return {Object} - Bytes.size object
 * @todo #3:30min Implement bytes$size atom. We need to implement the atom and make sure it
 *  works. For the details of implementation check the Java analogue on
 *  https://github.com/objectionary/eo/tree/master/eo-runtime/src/main/java/EOorg/EOeolang
 */
const bytes$size = function() {
  const obj = object('bytes$size')
  obj.assets[LAMBDA] = function(_) {
    throw new ErFailure(
      `Atom bytes$size is not implemented yet`
    )
  }
  return obj
}

module.exports = bytes$size
