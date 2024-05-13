const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * Malloc.of.allocated.read.
 * @return {Object} - Malloc.of.allocated.read object
 * @todo #3:30min Implement malloc$of$allocated$read atom. We need to implement the atom and make
 *  sure it works. For the details of implementation check the Java analogue on
 *  https://github.com/objectionary/eo/tree/master/eo-runtime/src/main/java/EOorg/EOeolang
 */
const malloc$of$allocated$read = function() {
  const obj = object('malloc$of$allocated$read')
  obj.assets[LAMBDA] = function(_) {
    throw new ErFailure(
      `Atom malloc$of$allocated$read is not implemented yet`
    )
  }
  return obj
}

module.exports = malloc$of$allocated$read
