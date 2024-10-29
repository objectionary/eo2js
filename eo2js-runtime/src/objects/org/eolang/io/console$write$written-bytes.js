const object = require('../../../../runtime/object')
const {LAMBDA} = require('../../../../runtime/attribute/specials');
const at_void = require('../../../../runtime/attribute/at-void');
const dataized = require('../../../../runtime/dataized');
const {STRING} = require('../../../../runtime/types');
const data = require('../../../../runtime/data')

/**
 * Console.write.written-bytes.
 * @param {object} out - Output stream to write to
 * @return {Object} - Console.write.written-bytes object
 */
const console$write$written_bytes = function(out = console) {
  const obj = object('console.write.written-bytes')
  obj.attrs['buffer'] = at_void('buffer')
  obj.assets[LAMBDA] = function(self) {
    out.log(dataized(self.take('buffer'), STRING))
    return data.toObject(true)
  }
  return obj
}

module.exports = console$write$written_bytes
