const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * ATOM.
 * @return {Object} - ATOM object
 */
const atom = function() {
  const obj = object('atom')
  obj.assets[LAMBDA] = function(_) {
    throw new ErFailure(
      `Atom atom is not implemented yet`
    )
  }
  return obj
}

module.exports = atom
