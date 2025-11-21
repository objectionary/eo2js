// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const {DELTA} = require('./attribute/specials')
const bytesOf = require('./bytes-of');

/**
 * Data to object converter.
 * @type {{
 *  BYTES: string,
 *  NUMBER: string,
 *  BOOL: string,
 *  STRING: string,
 *  toObject: (function(string|boolean|number|array.<string>|array.<number>): object),
 *  toTuple: (function(array.<object>): object)
 * }}
 */
const data = {
  /**
   * Convert given data to phi object.
   * @param {string|boolean|number|array.<string>|array.<number>|BigInt} data
   * @return {object} - Object from given data
   */
  toObject(data) {
    const phi = require('./phi')
    const eolang = phi.take('org.eolang')
    let object
    if (Array.isArray(data)) {
      object = eolang.take('bytes').with({
        [DELTA]: bytesOf.bytes(data).asBytes()
      })
    } else if (typeof data === 'boolean') {
      if (data) {
        object = eolang.take('true')
      } else {
        object = eolang.take('false')
      }
    } else if (typeof data === 'number' || typeof data === 'bigint') {
      data = Number(data)
      if (Number.isNaN(data)) {
        object = eolang.take('nan')
      } else if (data === Number.POSITIVE_INFINITY) {
        object = eolang.take('positive-infinity')
      } else if (data === Number.NEGATIVE_INFINITY) {
        object = eolang.take('negative-infinity')
      } else {
        object = eolang.take('number').with({
          0: eolang.take('bytes').with({
            [DELTA]: bytesOf.number(data).asBytes()
          })
        })
      }
    } else if (typeof data === 'string') {
      object = eolang.take('string').with({
        0: eolang.take('bytes').with({
          [DELTA]: bytesOf.string(data).asBytes()
        })
      })
    } else {
      throw new Error(`Can't convert to object data ${data} of given type ${typeof data}`)
    }
    return object
  },
  /**
   * Convert given array of objects to `org.eolang.tuple`.
   * @param {array.<object>} objects - Array of objects
   * @return {object} - The `org.eolang.tuple` of provided objects
   */
  toTuple(objects) {
    const phi = require('./phi')
    const tuple = phi.take('org.eolang.tuple')
    let args = tuple.take('empty')
    objects.forEach((object) => {
      args = tuple.with({
        0: args,
        1: object
      })
    })
    return args
  }
}

module.exports = data
