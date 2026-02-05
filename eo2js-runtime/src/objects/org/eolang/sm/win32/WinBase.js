// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const ErFailure = require('../../../../../runtime/error/ErFailure')

/**
 * WinBase native bindings.
 * @todo #3:60min Implement WinBase bindings for Win32 via node-ffi-napi/win32-api.
 *  This module should provide base types and helpers used by Kernel32 calls.
 */
const WinBase = function() {
  throw new ErFailure('WinBase native bindings are not implemented yet')
}

module.exports = WinBase
