// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const makeReturn = require('./return')

/**
 * closesocket WS2_32 or Kernel32 function call.
 * Requires native Win32 implementation.
 * @param {Object} win - Win32 object
 * @return {Object} - Result object
 */
const closesocket = function(win) {
  return makeReturn(win, -1)
}

module.exports = closesocket
