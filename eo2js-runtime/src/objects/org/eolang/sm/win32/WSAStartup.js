// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const ErFailure = require('../../../../../runtime/error/ErFailure')

/**
 * WSAStartup WS2_32 or Kernel32 function call.
 * Requires native Win32 implementation.
 * @param {Object} win - Win32 object
 * @return {Object} - Throws error
 */
const WSAStartup = function(win) {
  throw new ErFailure(
    'WSAStartup function requires native Win32 implementation'
  )
}

module.exports = WSAStartup
