// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const object = require('../../../../runtime/object')
const {LAMBDA} = require('../../../../runtime/attribute/specials');
const {STRING, NUMBER, BOOL} = require('../../../../runtime/types');
const at_void = require('../../../../runtime/attribute/at-void');
const dataized = require('../../../../runtime/dataized');
const ErFailure = require('../../../../runtime/error/ErFailure');
const data = require('../../../../runtime/data')

/**
 * Percent sign.
 * @type {string}
 */
const PERCENT = '%'

/**
 * Convert byte array to string.
 * @param {array.<number>} bts - Byte array
 * @return {string} - Byte array as string
 */
const normalizeByte = function(byte) {
  const normalized = byte % 256
  return normalized >= 0 ? normalized : normalized + 256
}

const bytesToHex = function(bts) {
  return Array.from(bts, (byte) => (`0${normalizeByte(byte).toString(16)}`).slice(-2)).join('-').toUpperCase()
}

/**
 * Object conversion.
 * @type {{
 *  s: (function(string): object),
 *  d: (function(string): object),
 *  f: (function(string): object)
 * }}
 */
const CONVERSION = {
  's'(obj) {
    return dataized(obj, STRING)
  },
  'd'(obj) {
    return Math.floor(dataized(obj, NUMBER)).toString()
  },
  'f'(obj) {
    return dataized(obj, NUMBER).toString()
  },
  'x'(obj) {
    return bytesToHex(dataized(obj))
  },
  'b'(obj) {
    return dataized(obj, BOOL).toString()
  }
}

/**
 * Count amount of format occurrences.
 * @param {string} str - Given string
 * @return {number} - Amount of formats in string
 */
const formats = function(str) {
  let count = 0;
  for (let idx = 0; idx < str.length; ++idx) {
    if (
      str.charAt(idx) === PERCENT &&
      idx + 1 !== str.length &&
      Object.hasOwn(CONVERSION, str.charAt(idx + 1))
    ) {
      ++count;
    }
  }
  return count;
}

/**
 * Format given {@code element} depending on format char.
 * @param {string} symbol - Format char
 * @param {object} element - Element ready for formatting
 * @return {string} - Formatted object
 */
const formatted = function(symbol, element) {
  if (!Object.hasOwn(CONVERSION, symbol)) {
    throw new ErFailure(
      `The format %${symbol} is unsupported, only ${Object.keys(CONVERSION).join(', ')} formats can be used`
    );
  }
  return CONVERSION[symbol](element)
}

/**
 * Sscanf.
 * @return {Object} - Sscanf object
 */
const sprintf = function() {
  const obj = object('sscanf')
  obj.attrs.format = at_void('format')
  obj.attrs.args = at_void('args')
  obj.assets[LAMBDA] = function(self) {
    const format = dataized(this.take('format'), STRING)
    const args = this.take('args')
    const retriever = args.take('at')
    const length = dataized(args.take('length'), NUMBER)
    let printed = ''
    let pattern = format
    let index = 0
    let idx
    let next
    while (true) {
      idx = pattern.indexOf(PERCENT)
      if (idx === -1) {
        printed += pattern
        break
      }
      if (index === length) {
        throw new ErFailure(
          `The amount of arguments ${length} does not match the amount of format occurrences ${formats(format)}`
        )
      }
      next = pattern.charAt(idx + 1)
      if (next === PERCENT) {
        printed += pattern.substring(0, idx + 1)
        pattern = pattern.substring(idx + 1)
      } else {
        printed += pattern.substring(0, idx) + formatted(
          next,
          retriever.with({
            0: data.toObject(index)
          })
        )
        ++index
        pattern = pattern.substring(idx + 2)
      }
    }
    return data.toObject(printed)
  }
  return obj
}

module.exports = sprintf
