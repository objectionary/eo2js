const object = require('../../../../runtime/object')
const {LAMBDA, RHO} = require('../../../../runtime/attribute/specials');
const ErFailure = require('../../../../runtime/error/ErFailure');

/**
 * File.open.process-file.
 * @return {Object} - File.open.process-file object
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
