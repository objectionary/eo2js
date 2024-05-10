/**
 * Hex byte array to int byte array.
 * Converts this:
 * [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x30, 0x39]
 * to this:
 * [0, 0, 0, 0, 0, 0, 48, 57]
 * If int byte array is provided - return it
 * @param {array.<string>|array.<number>} bytes - Byte array
 * @return {array.<number>} - Int byte array
 */
const hexToInt = function(bytes) {
  let byte
  return bytes.map((hex) => {
    if (typeof hex === 'number' && Number.isInteger(hex)) {
      byte = hex
    } else if (hex.length === 4 && hex.indexOf('0x') === 0) {
      byte = parseInt(hex, 16)
    } else {
      throw new Error(
        `Wrong format of element ${hex} in byte array ${bytes}\nShould be either integer of hexadecimal starting with '0x'`
      )
    }
    return byte
  })
}

/**
 * Bytes of.
 * @param {string|number|boolean|array.<string>|array.<number>} data - Data to cast to bytes
 * @return {{asInt: (function(): number), asBool: (function(): boolean), asString: (function(): string), asFloat: (function(): number), asBytes: (function(): array.<number>)}}
 */
const bytesOf = function(data) {
  let bytes
  if (typeof data === 'number') {
    const buffer = new ArrayBuffer(8)
    const view = new DataView(buffer)
    if (Number.isInteger(data)) {
      view.setInt32(4, data)
    } else {
      view.setFloat64(0, data)
    }
    bytes = Array.from(new Uint8Array(buffer))
  } else if (typeof data === 'string') {
    bytes = Array.from(Buffer.from(data, 'utf-8'))
  } else if (typeof data === 'boolean') {
    bytes = [data ? 1 : 0]
  } else if (Array.isArray(data)) {
    bytes = hexToInt(data)
  } else {
    throw new Error(`Can't convert to bytes object of given type (${typeof data})`)
  }
  return {
    asBytes: function() {
      return bytes
    },
    asInt: function() {
      if (bytes.length !== 8) {
        throw new Error(`Byte array must be 8 bytes long to convert to int (${bytes})`)
      }
      return new DataView(new Uint8Array(bytes).buffer).getInt32(4)
    },
    asFloat: function() {
      if (bytes.length !== 8) {
        throw new Error(`Byte array must be 8 bytes long to convert to float (${bytes})`)
      }
      return new DataView(new Uint8Array(bytes).buffer).getFloat64(0)
    },
    asString: function() {
      return Buffer.from(bytes).toString('utf-8')
    },
    asBool: function() {
      if (bytes.length !== 1) {
        throw new Error(`Byte array must be 1 byte long to convert to bool (${bytes})`)
      }
      return bytes[0] !== 0
    }
  }
}

module.exports = bytesOf
