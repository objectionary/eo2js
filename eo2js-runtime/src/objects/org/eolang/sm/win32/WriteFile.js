// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const fs = require('fs')
const dataized = require('../../../../../runtime/dataized')
const {NUMBER, BYTES} = require('../../../../../runtime/types')
const ErFailure = require('../../../../../runtime/error/ErFailure')
const makeReturn = require('./return')

/**
 * WriteFile kernel32 function call.
 * Writes data to the specified file.
 * @param {Object} win - Win32 object
 * @param {Object[]} params - Function parameters
 * @return {Object} - Result object
 */
const WriteFile = function(win, params) {
  if (params.length < 3) {
    throw new ErFailure(
      'WriteFile requires 3 arguments (handle, buffer, size)'
    )
  }
  const handle = dataized(params[0], NUMBER)
  const buffer = dataized(params[1], BYTES)
  const size = dataized(params[2], NUMBER)
  const length = Math.max(0, size)
  const slice = buffer.slice(0, length)
  let ok = true
  let written
  try {
    let fd = handle
    if (handle === -11) {
      fd = process.stdout.fd
    } else if (handle === -12) {
      fd = process.stderr.fd
    }
    written = fs.writeSync(fd, Buffer.from(slice))
  } catch (e) {
    ok = false
    written = 0
  }
  return makeReturn(win, ok, written)
}

module.exports = WriteFile
