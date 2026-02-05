// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const ErFailure = require('../../../../../runtime/error/ErFailure')

/**
 * Wincon native bindings.
 * @todo #3:60min Implement Wincon bindings for Win32 via node-ffi-napi/win32-api.
 *  This module should expose console-specific Win32 bindings if needed.
 */
const Wincon = function() {
  throw new ErFailure('Wincon native bindings are not implemented yet')
}

module.exports = Wincon
