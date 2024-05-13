const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * Seq.
 * @return {Object} - Seq object
 * @todo #3:30min Implement seq atom. We need to implement the atom and make sure it
 *  works. For the details of implementation check the Java analogue on
 *  https://github.com/objectionary/eo/tree/master/eo-runtime/src/main/java/EOorg/EOeolang
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
