// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const data = require('../../../../../runtime/data')
const ErFailure = require('../../../../../runtime/error/ErFailure')

/**
 * GetEnvironmentVariable kernel32 function call.
 * Retrieves the contents of the specified environment variable.
 * @param {Object} win - Win32 object
 * @param {Object} args - Arguments object with 'at' and 'length' properties
 * @param {Function} getArg - Function to get argument by index
 * @param {number} length - Number of arguments
 * @return {Object} - Result object with environment variable value
 */
const GetEnvironmentVariable = function(win, args, getArg, length) {
  if (length < 1) {
    throw new ErFailure(
      'GetEnvironmentVariable requires 1 argument (variable name)'
    )
  }
  const varName = getArg(0)
  const value = process.env[String(varName)]
  if (value === undefined) {
    throw new ErFailure(
      `Environment variable '${varName}' not found`
    )
  }
  return data.toObject(value)
}

module.exports = GetEnvironmentVariable
