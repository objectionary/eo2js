// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const ErFailure = require('../../../../../runtime/error/ErFailure')

/**
 * Winsock native bindings.
 * @todo #3:60min Implement Winsock bindings for Win32 via node-ffi-napi/win32-api.
 *  We need real calls to WS2_32.dll functions to match the JVM runtime.
 *  The current JS fallbacks should remain as a non-native fallback.
 */
const Winsock = function() {
  throw new ErFailure('Winsock native bindings are not implemented yet')
}

module.exports = Winsock
