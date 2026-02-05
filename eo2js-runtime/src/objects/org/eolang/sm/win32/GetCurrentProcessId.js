// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const makeReturn = require('./return')

/**
 * GetCurrentProcessId kernel32 function call.
 * Returns the process identifier of the calling process.
 * @param {Object} win - Win32 object
 * @return {Object} - Result object
 */
const GetCurrentProcessId = function(win) {
  return makeReturn(win, process.pid)
}

module.exports = GetCurrentProcessId
