// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const ErFailure = require('../../../../../runtime/error/ErFailure')

/**
 * WSAGetLastError WS2_32 or Kernel32 function call.
 * Requires native Win32 implementation.
 * @param {Object} win - Win32 object
 * @return {Object} - Throws error
 */
const WSAGetLastError = function(win) {
  throw new ErFailure(
    'WSAGetLastError function requires native Win32 implementation'
  )
}

module.exports = WSAGetLastError
