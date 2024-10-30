const object = require('../../../../runtime/object')
const {LAMBDA} = require('../../../../runtime/attribute/specials');
const ErFailure = require('../../../../runtime/error/ErFailure');

/**
 * File.open.process-file.
 * @return {Object} - File.open.process-file object
 * @todo #3:30min Implement file$open$process_file atom.
 *  We need to implement the atom and make sure it
 *  works. For the details of implementation check the Java analogue on
 *  https://github.com/objectionary/eo/tree/master/eo-runtime/src/main/java/EOorg/EOeolang
 */
const file$open$process_file = function() {
  const obj = object('file$open$process_file')
  obj.assets[LAMBDA] = function(_) {
    throw new ErFailure(
      `Atom file$open$process_file is not implemented yet`
    )
  }
  return obj
}

module.exports = file$open$process_file
