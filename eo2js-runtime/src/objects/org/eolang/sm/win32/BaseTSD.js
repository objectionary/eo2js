// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const ErFailure = require('../../../../../runtime/error/ErFailure')

/**
 * BaseTSD native bindings.
 * @todo #3:60min Implement BaseTSD bindings for Win32 via node-ffi-napi/win32-api.
 *  This module should define pointer-sized base types and helpers required by
 *  Kernel32 and Winsock bindings in the Node.js runtime.
 */
const BaseTSD = function() {
  throw new ErFailure('BaseTSD native bindings are not implemented yet')
}

module.exports = BaseTSD
