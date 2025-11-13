// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const ErFailure = require('../../../../../runtime/error/ErFailure')

/**
 * socket WS2_32 function call.
 * Creates a socket (requires native Win32 implementation).
 * @param {Object} win - Win32 object
 * @return {Object} - Throws error
 */
const socket = function(win) {
  throw new ErFailure(
    'Socket operations require native Win32 implementation'
  )
}

module.exports = socket
