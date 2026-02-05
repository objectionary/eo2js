// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const object = require('../../../../runtime/object')
const {LAMBDA} = require('../../../../runtime/attribute/specials');
const ErFailure = require('../../../../runtime/error/ErFailure');
const dispatch = require('./win32/dispatch')

/**
 * Win32.φ dispatcher for Win32 system function calls.
 * @return {Object} - Win32.φ object
 */
const win32$φ = function() {
  const obj = object('win32$φ')
  obj.assets[LAMBDA] = function(self) {
    const result = dispatch(self)
    if (result === undefined) {
      throw new ErFailure('win32$φ dispatch returned undefined')
    }
    return result
  }
  return obj
}

module.exports = win32$φ
