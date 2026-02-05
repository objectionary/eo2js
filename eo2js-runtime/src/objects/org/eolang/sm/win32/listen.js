// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const makeReturn = require('./return')

/**
 * listen WS2_32 or Kernel32 function call.
 * Requires native Win32 implementation.
 * @param {Object} win - Win32 object
 * @return {Object} - Result object
 */
const listen = function(win) {
  return makeReturn(win, -1)
}

module.exports = listen
