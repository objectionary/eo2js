// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const dataized = require('../../../../../runtime/dataized')
const {STRING, NUMBER} = require('../../../../../runtime/types')
const ErFailure = require('../../../../../runtime/error/ErFailure')
const makeReturn = require('./return')

/**
 * GetEnvironmentVariable kernel32 function call.
 * Retrieves the contents of the specified environment variable.
 * @param {Object} win - Win32 object
 * @param {Object[]} params - Function parameters
 * @return {Object} - Result object with environment variable value
 */
const GetEnvironmentVariable = function(win, params) {
  if (params.length < 2) {
    throw new ErFailure(
      'GetEnvironmentVariable requires 2 arguments (variable name, buffer size)'
    )
  }
  const varName = dataized(params[0], STRING)
  const size = dataized(params[1], NUMBER)
  const value = process.env[String(varName)] ?? ''
  const output = size > 0 ? String(value).slice(0, size) : ''
  return makeReturn(win, output.length, output)
}

module.exports = GetEnvironmentVariable
