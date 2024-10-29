const object = require('../../../../runtime/object')
const {LAMBDA} = require('../../../../runtime/attribute/specials');
const ErFailure = require('../../../../runtime/error/ErFailure');

/**
 * Win32.φ.
 * @return {Object} - Win32.φ object
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
