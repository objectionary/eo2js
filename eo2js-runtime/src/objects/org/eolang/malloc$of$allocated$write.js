const object = require('../../../runtime/object')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const ErFailure = require('../../../runtime/error/ErFailure');

/**
 * Malloc.of.allocated.write.
 * @return {Object} - Malloc.of.allocated.write object
 * @todo #3:30min Implement malloc$of$allocated$write atom. We need to implement the atom and make
 *  sure it works. For the details of implementation check the Java analogue on
 *  https://github.com/objectionary/eo/tree/master/eo-runtime/src/main/java/EOorg/EOeolang
 */
const malloc$of$allocated$write = function() {
  const obj = object('malloc$of$allocated$write')
  obj.assets[LAMBDA] = function(_) {
    throw new ErFailure(
      `Atom malloc$of$allocated$write is not implemented yet`
    )
  }
  return obj
}

module.exports = malloc$of$allocated$write
