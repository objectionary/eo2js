// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const ErFailure = require('../../../../../runtime/error/ErFailure')

/**
 * Kernel32 native bindings.
 * @todo #3:60min Implement Kernel32 bindings for Win32 via node-ffi-napi/win32-api.
 *  We need real calls to kernel32.dll functions to match the JVM runtime.
 *  The current JS fallbacks should remain as a non-native fallback.
 */
const Kernel32 = function() {
  throw new ErFailure('Kernel32 native bindings are not implemented yet')
}

module.exports = Kernel32
