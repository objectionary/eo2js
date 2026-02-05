// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const fs = require('fs')
const data = require('../../../../../runtime/data')
const ErFailure = require('../../../../../runtime/error/ErFailure')

/**
 * WriteFile kernel32 function call.
 * Writes data to the specified file.
 * @param {Object} win - Win32 object
 * @param {Object} args - Arguments object with 'at' and 'length' properties
 * @param {Function} getArg - Function to get argument by index
 * @param {number} length - Number of arguments
 * @return {Object} - Result object
 */
const WriteFile = function(win, args, getArg, length) {
  if (length < 2) {
    throw new ErFailure(
      'WriteFile requires at least 2 arguments (file path and content)'
    )
  }
  const filePath = getArg(0)
  const content = getArg(1)
  try {
    fs.writeFileSync(String(filePath), String(content), 'utf8')
    return data.toObject(true)
  } catch (e) {
    throw new ErFailure(
      `Failed to write file '${filePath}': ${e.message}`
    )
  }
}

module.exports = WriteFile
