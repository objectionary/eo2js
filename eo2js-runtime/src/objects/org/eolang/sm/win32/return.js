// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const object = require('../../../../../runtime/object')
const data = require('../../../../../runtime/data')

/**
 * Check if value is a phi object.
 * @param {*} value - Value to check
 * @return {boolean} - True if phi object
 */
const isPhi = function(value) {
  return Boolean(
    value
      && typeof value === 'object'
      && value.attrs
      && typeof value.take === 'function'
  )
}

/**
 * Convert a value to phi object.
 * @param {*} value - Value to convert
 * @return {Object} - Phi object
 */
const toPhi = function(value) {
  if (isPhi(value)) {
    return value
  }
  return data.toObject(value)
}

/**
 * Make a win32 return object with code/output fields.
 * @param {Object} win - Win32 object
 * @param {*} code - Code value
 * @param {*} [output] - Output value (defaults to empty object)
 * @return {Object} - Return object
 */
const makeReturn = function(win, code, output = undefined) {
  const result = win.take('return').copy()
  const out = output === undefined ? object('empty') : output
  return result.with({
    code: toPhi(code),
    output: toPhi(out),
  })
}

module.exports = makeReturn
