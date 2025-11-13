// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const data = require('../../../../../runtime/data')

/**
 * GetCurrentProcessId kernel32 function call.
 * Returns the process identifier of the calling process.
 * @param {Object} win - Win32 object
 * @param {Array} params - Function parameters
 * @return {Object} - Result object
 */
const GetCurrentProcessId = function(win, params) {
  return data.toObject(process.pid)
}

module.exports = GetCurrentProcessId
