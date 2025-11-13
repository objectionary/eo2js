// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const fs = require('fs')
const data = require('../../../../../runtime/data')
const ErFailure = require('../../../../../runtime/error/ErFailure')

/**
 * ReadFile kernel32 function call.
 * Reads data from the specified file.
 * @param {Object} win - Win32 object
 * @param {Object} args - Arguments object with 'at' and 'length' properties
 * @param {Function} getArg - Function to get argument by index
 * @param {number} length - Number of arguments
 * @return {Object} - Result object with file content
 */
const ReadFile = function(win, args, getArg, length) {
  if (length < 1) {
    throw new ErFailure(
      'ReadFile requires at least 1 argument (file path)'
    )
  }
  const filePath = getArg(0)
  try {
    const content = fs.readFileSync(String(filePath), 'utf8')
    return data.toObject(content)
  } catch (e) {
    throw new ErFailure(
      `Failed to read file '${filePath}': ${e.message}`
    )
  }
}

module.exports = ReadFile
