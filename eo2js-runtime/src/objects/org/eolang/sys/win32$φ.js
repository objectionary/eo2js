const object = require('../../../../runtime/object')
const {LAMBDA} = require('../../../../runtime/attribute/specials');
const ErFailure = require('../../../../runtime/error/ErFailure');

/**
 * Win32.φ.
 * @return {Object} - Win32.φ object
 * @todo #3:30min Implement win32$φ atom. We need to implement the atom and make sure it
 *  works. For the details of implementation check the Java analogue on
 *  https://github.com/objectionary/eo/tree/master/eo-runtime/src/main/java/EOorg/EOeolang
 */
const win32$φ = function() {
  const obj = object('win32$φ')
  obj.assets[LAMBDA] = function(_) {
    throw new ErFailure(
      `Atom win32$φ is not implemented yet`
    )
  }
  return obj
}

module.exports = win32$φ
