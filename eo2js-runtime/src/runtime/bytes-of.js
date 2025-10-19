// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const {LONG, INT, SHORT, NUMBER} = require('./types')

/**
 * The number of bits used to represent a byte value in two's complement binary form.
 * @type {number}
 */
const BYTE_SIZE = 8

/**
 * Integer min value.
 * @type {bigint}
 */
const INT_MIN_VALUE = -0x80000000n;

/**
 * Integer max value.
 * @type {BigInt}
 */
const INT_MAX_VALUE = 0x7fffffffn;

/**
 * Long min value.
 * @type {bigint}
 */
const LONG_MIN_VALUE = -0x8000000000000000n;

/**
 * Long max value.
 * @type {bigint}
 */
const LONG_MAX_VALUE = 0x7fffffffffffffffn;

/**
 * Short min value.
 * @type {bigint}
 */
const SHORT_MIN_VALUE = -32768n;

/**
 * Short max value.
 * @type {bigint}
 */
const SHORT_MAX_VALUE = 32767n;

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
 * Bytes of
 */
const bytesOf = {
  /**
   * Bytes of bytes.
   * @param {Array.<Number|String>} bytes - Byte array
   * @return {Object} - Bytes conversion
   */
  bytes: function(bytes) {
    if (!Array.isArray(bytes)) {
      throw new Error(`Can't take byte array bytes from non byte array (${bytes})`)
    }
    return conversion(hexToInt(bytes))
  },
  /**
   * Bytes of short.
   * @param {BigInt} num - 2 bytes integer number
   * @return {Object} - Bytes conversion
   */
  short: function(num) {
    if (typeof num !== 'bigint') {
      throw new Error(`Can't take 2 bytes from not BigInt number (${num})`)
    }
    if (num > SHORT_MAX_VALUE || num < SHORT_MIN_VALUE) {
      throw new Error(`Can't take 2 bytes from out of short bounds number (${num})`)
    }
    const buffer = new ArrayBuffer(2);
    const view = new DataView(buffer)
    view.setInt16(0, Number(num))
    return conversion(Array.from(new Int8Array(buffer)))
  },
  /**
   * Bytes of int.
   * @param {BigInt} num - 4 bytes integer number
   * @return {Object} - Bytes conversion
   */
  int: function(num) {
    if (typeof num !== 'bigint') {
      throw new Error(`Can't take 4 bytes from not BigInt number (${num})`)
    }
    if (num > INT_MAX_VALUE || num < INT_MIN_VALUE) {
      throw new Error(`Can't take 4 bytes from out of integer bounds number (${num})`)
    }
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer)
    view.setInt32(0, Number(num))
    return conversion(Array.from(new Int8Array(buffer)))
  },
  /**
   * Bytes of long.
   * @param {BigInt} num - 8 bytes integer number
   * @param {Boolean} bounds - Skip bounds checking
   * @return {Object} - Bytes conversion
   */
  long: function(num, bounds = true) {
    if (typeof num !== 'bigint') {
      throw new Error(`Can't take 8 bytes from non BigInt number (${num})`)
    }
    if (bounds && (num > LONG_MAX_VALUE || num < LONG_MIN_VALUE)) {
      throw new Error(`Can't take 8 bytes from out of long bounds number (${num})`)
    }
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer)
    view.setBigInt64(0, num)
    return conversion(Array.from(new Int8Array(buffer)))
  },
  /**
   * Bytes of number.
   * @param {Number} num - 8 byte float number
   * @return {Object} - Bytes conversion
   */
  number: function(num) {
    if (typeof num !== 'number') {
      throw new Error(`Can't take number bytes from not a number (${num})`)
    }
    const buffer = new ArrayBuffer(8)
    const view = new DataView(buffer)
    view.setFloat64(0, num)
    return conversion(Array.from(new Int8Array(buffer)))
  },
  /**
   * Bytes of string.
   * @param {String} str - String
   * @return {Object} - Bytes conversion
   */
  string: function(str) {
    if (typeof str !== 'string') {
      throw new Error(`Can't take string bytes from non string (${str})`)
    }
    return conversion(Array.from(Buffer.from(str, 'utf-8')))
  },
  /**
   * Bytes of bool.
   * @param {Boolean} bool - Boolean value
   * @return {Object} - Bytes conversion
   */
  bool: function(bool) {
    if (typeof bool !== 'boolean') {
      throw new Error(`Can't take boolean bytes from non boolean (${bool})`)
    }
    return conversion(bool ? [1] : [0])
  },
}

module.exports = bytesOf

/**
 * Bytes conversion.
 * @param {Array.<Number>} bytes
 * @return {{
 *  asBytes: (function(): Array.<Number>),
 *  asNumber: (function(String): (Number|BigInt)),
 *  asString: (function(): String),
 *  asBool: (function(): Boolean),
 *  verbose: (function(): String),
 *  and: (function(Array.<Number>): *),
 *  or: (function(Array.<Number>): *),
 *  xor: (function(Array.<Number>): *),
 *  not: (function(): *),
 *  shift: (function(Number): *)}
 * }}
 */
const conversion = function(bytes) {
  return {
    /**
     * Get byte array.
     * @return {Array.<Number>} - Byte array
     */
    asBytes: function() {
      return bytes
    },
    /**
     * Convert bytes to number.
     * @param {String} [type] - Number type
     * @return {number} - Number
     */
    asNumber: function(type = NUMBER) {
      let res
      if (type === NUMBER && bytes.length === 8) {
        res = new DataView(new Int8Array(bytes).buffer).getFloat64(0)
      } else if (type === LONG && bytes.length === 8) {
        res = new DataView(new Int8Array(bytes).buffer).getBigInt64(0)
      } else if (type === INT && bytes.length === 4) {
        res = BigInt(new DataView(new Int8Array(bytes, 4).buffer).getInt32(0))
      } else if (type === SHORT && bytes.length === 2) {
        res = BigInt(new DataView(new Int8Array(bytes, 6).buffer).getInt16(0))
      } else {
        throw new Error(`Unsupported conversion to '${type}' from ${bytes}`)
      }
      return res
    },
    /**
     * Convert bytes to string
     * @return {string} - String number
     */
    asString: function() {
      return Buffer.from(bytes).toString('utf-8')
    },
    /**
     * Convert bytes to bool.
     * @return {boolean} - Boolean
     */
    asBool: function() {
      if (bytes.length !== 1) {
        throw new Error(`Byte array must be 1 byte long to convert to bool (${bytes})`)
      }
      return bytes[0] !== 0
    },
    /**
     * Get verbose bytes string representation depends on its length
     * @return {string} - Verbose string representation of bytes
     */
    verbose: function() {
      let str
      if (bytes.length === 0) {
        str = '--'
      } else if (bytes.length === 1) {
        if (bytes[0] === 1) {
          str = 'true'
        } else if (bytes[0] === 0) {
          str = 'false'
        } else {
          str = `[${bytes[0]}]`
        }
      } else if (bytes.length === 2) {
        str = `[${this.asBytes()}] = ${this.asNumber(SHORT)}, or "${this.asString()}"`
      } else if (bytes.length === 4) {
        str = `[${this.asBytes()}] = ${this.asNumber(INT)}, or "${this.asString()}"`
      } else if (bytes.length === 8) {
        str = `[${this.asBytes()}] = ${this.asNumber()}, or ${this.asNumber(LONG)}, or "${this.asString()}"`
      } else {
        str = `[${this.asBytes()}] = "${this.asString()}"`
      }
      return str
    },
    /**
     * Logical AND.
     * @param {Array.<Number>} other - Other byte array
     * @return {{
     *  asBytes: (function(): Array.<Number>),
     *  asNumber: (function(String): (Number|BigInt)),
     *  asString: (function(): String),
     *  asBool: (function(): Boolean),
     *  verbose: (function(): String),
     *  and: (function(Array.<Number>): *),
     *  or: (function(Array.<Number>): *),
     *  xor: (function(Array.<Number>): *),
     *  not: (function(): *),
     *  shift: (function(Number): *)}
     * }}
     */
    and: function(other) {
      const copy = bytes
      for (let i = 0; i < Math.min(copy.length, other.length); ++i) {
        copy[i] = copy[i] & other[i]
      }
      return bytesOf.bytes(copy)
    },
    /**
     * Logical OR.
     * @param {Array.<Number>} other - Other byte array
     * @return {{
     *  asBytes: (function(): Array.<Number>),
     *  asNumber: (function(String): (Number|BigInt)),
     *  asString: (function(): String),
     *  asBool: (function(): Boolean),
     *  verbose: (function(): String),
     *  and: (function(Array.<Number>): *),
     *  or: (function(Array.<Number>): *),
     *  xor: (function(Array.<Number>): *),
     *  not: (function(): *),
     *  shift: (function(Number): *)}
     * }}
     */
    or: function(other) {
      const copy = bytes
      for (let i = 0; i < Math.min(copy.length, other.length); ++i) {
        copy[i] = copy[i] | other[i]
      }
      return bytesOf.bytes(copy)
    },
    /**
     * XOR.
     * @param {Array.<Number>} other - Other byte array
     * @return {{
     *  asBytes: (function(): Array.<Number>),
     *  asNumber: (function(String): (Number|BigInt)),
     *  asString: (function(): String),
     *  asBool: (function(): Boolean),
     *  verbose: (function(): String),
     *  and: (function(Array.<Number>): *),
     *  or: (function(Array.<Number>): *),
     *  xor: (function(Array.<Number>): *),
     *  not: (function(): *),
     *  shift: (function(Number): *)}
     * }}
     */
    xor: function(other) {
      const copy = bytes
      for (let i = 0; i < Math.min(copy.length, other.length); ++i) {
        copy[i] = copy[i] ^ other[i]
      }
      return bytesOf.bytes(copy)
    },
    /**
     * Logical NOT.
     * @return {{
     *  asBytes: (function(): Array.<Number>),
     *  asNumber: (function(String): (Number|BigInt)),
     *  asString: (function(): String),
     *  asBool: (function(): Boolean),
     *  verbose: (function(): String),
     *  and: (function(Array.<Number>): *),
     *  or: (function(Array.<Number>): *),
     *  xor: (function(Array.<Number>): *),
     *  not: (function(): *),
     *  shift: (function(Number): *)}
     * }}
     */
    not: function() {
      const copy = bytes
      for (let i = 0; i < copy.length; ++i) {
        copy[i] = ~copy[i]
      }
      return bytesOf.bytes(copy)
    },
    /**
     * Big-endian unsigned shift.
     * Shifts left if value is positive, or right otherwise.
     * Does not perform sign extension.
     * @param {Number} bits - Bits amount
     * @return {{
     *  asBytes: (function(): Array.<Number>),
     *  asNumber: (function(String): (Number|BigInt)),
     *  asString: (function(): String),
     *  asBool: (function(): Boolean),
     *  verbose: (function(): String),
     *  and: (function(Array.<Number>): *),
     *  or: (function(Array.<Number>): *),
     *  xor: (function(Array.<Number>): *),
     *  not: (function(): *),
     *  shift: (function(Number): *)}
     * }}
     */
    shift: function(bits) {
      bits = Number(bits)
      const bts = bytes
      const mod = Math.abs(bits) % BYTE_SIZE;
      const offset = Math.floor(Math.abs(bits) / BYTE_SIZE);
      if (bits < 0) {
        const carry = (0x01 << mod) - 1
        for (let index = 0; index < bts.length; ++index) {
          const source = index + offset;
          if (source >= bts.length) {
            bts[index] = 0;
          } else {
            let dst = bts[source] << mod
            if (source + 1 < bts.length) {
              dst |= bts[source + 1] >>> (BYTE_SIZE - mod) & (carry & 0xFF);
            }
            bts[index] = dst;
          }
        }
      } else {
        const carry = 0xFF << (BYTE_SIZE - mod)
        for (let index = bts.length - 1; index >= 0; --index) {
          const source = index - offset;
          if (source < 0) {
            bts[index] = 0;
          } else {
            let dst = (0xFF & bts[source]) >>> mod;
            if (source - 1 >= 0) {
              dst |= bts[source - 1] << (BYTE_SIZE - mod) & (carry & 0xFF);
            }
            bts[index] = dst;
          }
        }
      }
      return bytesOf.bytes(bts)
    }
  }
}
