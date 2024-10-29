const object = require('../../../../runtime/object')
const {LAMBDA, RHO} = require('../../../../runtime/attribute/specials');
const ErFailure = require('../../../../runtime/error/ErFailure');

/**
 * File.open.file-stream.write.written-bytes.
 * @return {Object} - File.open.file-stream.write.written-bytes object
 */
const file$open$file_stream$write$written_bytes = function() {
  const obj = object('file$open$file_stream$write$written_bytes')
  obj.assets[LAMBDA] = function(_) {
    throw new ErFailure(
      `Atom file$open$file_stream$write$written_bytes is not implemented yet`
    )
  }
  return obj
}

module.exports = file$open$file_stream$write$written_bytes
