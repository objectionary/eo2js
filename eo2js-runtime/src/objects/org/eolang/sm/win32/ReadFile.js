// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const fs = require('fs')
const dataized = require('../../../../../runtime/dataized')
const {NUMBER} = require('../../../../../runtime/types')
const ErFailure = require('../../../../../runtime/error/ErFailure')
const makeReturn = require('./return')

/**
 * ReadFile kernel32 function call.
 * Reads data from the specified file.
 * @param {Object} win - Win32 object
 * @param {Object[]} params - Function parameters
 * @return {Object} - Result object with file content
 */
const ReadFile = function(win, params) {
  if (params.length < 2) {
    throw new ErFailure(
      'ReadFile requires 2 arguments (handle, size)'
    )
  }
  const handle = dataized(params[0], NUMBER)
  const size = dataized(params[1], NUMBER)
  const length = Math.max(0, size)
  let ok = true
  let bytesRead
  let buffer = Buffer.alloc(length)
  try {
    const fd = handle === -10 ? process.stdin.fd : handle
    bytesRead = fs.readSync(fd, buffer, 0, length, null)
  } catch (e) {
    ok = false
    bytesRead = 0
    buffer = Buffer.alloc(0)
  }
  const output = Array.from(buffer.slice(0, Math.max(0, bytesRead)))
  return makeReturn(win, ok, output)
}

module.exports = ReadFile
