// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const ErFailure = require('../../../../../runtime/error/ErFailure')

/**
 * closesocket WS2_32 or Kernel32 function call.
 * Requires native Win32 implementation.
 * @todo #3:60min Implement closesocket using native Winsock bindings in Node.js.
 *  The implementation must return win32.return with code/output and preserve WSA error codes
 *  to match EO Java runtime behavior in socket.eo.
 * @param {Object} win - Win32 object
 * @return {Object} - Result object
 */
const closesocket = function(win) {
  throw new ErFailure(
    'closesocket function requires native Win32 implementation'
  )
}

module.exports = closesocket
