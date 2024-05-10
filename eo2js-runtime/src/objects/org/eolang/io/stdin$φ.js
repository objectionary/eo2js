const object = require('../../../../runtime/object')
const {LAMBDA} = require('../../../../runtime/attribute/specials');
const ErFailure = require('../../../../runtime/error/ErFailure');

/**
 * Stdin.φ.
 * @return {Object} - Stdin.φ object
 */
const stdin$φ = function() {
  const obj = object('stdin$φ')
  obj.assets[LAMBDA] = function() {
    throw new ErFailure(
      `Atom stdin$φ is not implemented yet`
    )
  }
  return obj
}

module.exports = stdin$φ
