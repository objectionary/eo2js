// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const makeReturn = require('./return')

/**
 * socket WS2_32 function call.
 * Creates a socket (requires native Win32 implementation).
 * @param {Object} win - Win32 object
 * @return {Object} - Result object
 */
const socket = function(win) {
  return makeReturn(win, -1)
}

module.exports = socket
