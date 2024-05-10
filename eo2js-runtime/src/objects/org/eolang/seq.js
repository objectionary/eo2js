const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * Seq.
 * @return {Object} - Seq object
 */
const seq = function() {
  const obj = object('seq')
  obj.assets[LAMBDA] = function(_) {
    throw new ErFailure(
      `Atom seq is not implemented yet`
    )
  }
  return obj
}

module.exports = seq
