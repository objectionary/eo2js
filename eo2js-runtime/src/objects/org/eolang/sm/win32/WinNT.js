// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const ErFailure = require('../../../../../runtime/error/ErFailure')

/**
 * WinNT native bindings.
 * @todo #3:60min Implement WinNT bindings for Win32 via node-ffi-napi/win32-api.
 *  This module should define Win32 NT structures for FFI usage.
 */
const WinNT = function() {
  throw new ErFailure('WinNT native bindings are not implemented yet')
}

module.exports = WinNT
