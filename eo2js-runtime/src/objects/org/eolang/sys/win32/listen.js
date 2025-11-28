// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const ErFailure = require('../../../../../runtime/error/ErFailure')

/**
 * listen WS2_32 or Kernel32 function call.
 * Requires native Win32 implementation.
 * @param {Object} win - Win32 object
 * @return {Object} - Throws error
 */
const listen = function(win) {
  throw new ErFailure(
    'listen function requires native Win32 implementation'
  )
}

module.exports = listen
