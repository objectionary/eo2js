const object = require('../../../../runtime/object')
const {LAMBDA} = require('../../../../runtime/attribute/specials');
const at_void = require('../../../../runtime/attribute/at-void');
const ErFailure = require('../../../../runtime/error/ErFailure');

/**
 * Console.read.read-bytes.
 * @return {Object} - Console.read.read-bytes object
 * @todo #100:30min Implement console$read$read_bytes atom. We need to implement the atom
 *  and make sure it works. For the details of implementation check the Java analogue on
 *  https://github.com/objectionary/eo/tree/master/eo-runtime/src/main/java/EOorg/EOeolang
 */
const console$read$read_bytes = function() {
  const obj = object('console.read.read-bytes')
  obj.attrs['size'] = at_void('size')
  obj.assets[LAMBDA] = function() {
    throw new ErFailure(
      `Atom console$read$read_bytes is not implemented yet`
    )
  }
  return obj
}

module.exports = console$read$read_bytes
