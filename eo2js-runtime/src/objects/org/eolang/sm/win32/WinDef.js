// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const ErFailure = require('../../../../../runtime/error/ErFailure')

/**
 * WinDef native bindings.
 * @todo #3:60min Implement WinDef bindings for Win32 via node-ffi-napi/win32-api.
 *  This module should define Win32 primitive types for FFI usage and keep
 *  the API aligned with EO Java runtime expectations.
 */
const WinDef = function() {
  throw new ErFailure('WinDef native bindings are not implemented yet')
}

module.exports = WinDef
