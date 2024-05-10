const {DELTA} = require('./attribute/specials')
const bytesOf = require('./bytes-of');

/**
 * Data to object converter.
 * @type {{BYTES: string, FLOAT: string, BOOL: string, STRING: string, INT: string, toObject: (function(string|boolean|number|array.<string>|array.<number>): object)}}
 */
const data = {
  toObject: function(data) {
    const phi = require('./phi')
    const eolang = phi.take('org.eolang')
    let object
    if (Array.isArray(data)) {
      object = eolang.take('bytes').with({
        [DELTA]: bytesOf(data).asBytes()
      })
    } else if (typeof data === 'boolean') {
      if (data) {
        object = eolang.take('true')
      } else {
        object = eolang.take('false')
      }
    } else {
      if (typeof data === 'number') {
        if (Number.isInteger(data)) {
          object = eolang.take('int')
        } else {
          object = eolang.take('float')
        }
      } else if (typeof data === 'string') {
        object = eolang.take('string')
      } else {
        throw new Error(`Can't convert to object data ${data} of given type ${typeof data}`)
      }
      object = object.with({
        'as-bytes': eolang.take('bytes').with({
          [DELTA]: bytesOf(data).asBytes()
        })
      })
    }
    return object
  },
  INT: 'int',
  STRING: 'string',
  FLOAT: 'float',
  BOOL: 'bool',
  BYTES: 'bytes'
}

module.exports = data
