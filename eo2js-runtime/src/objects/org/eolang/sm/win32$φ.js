// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const object = require('../../../../runtime/object')
const {LAMBDA} = require('../../../../runtime/attribute/specials');

/**
 * Win32.φ - checks if the current platform is Windows.
 * @return {Object} - Win32.φ object that returns a boolean on dataization
 */
const win32$φ = function() {
  const obj = object('win32$φ')
  obj.assets[LAMBDA] = function(_) {
    return process.platform === 'win32'
  }
  return obj
}

module.exports = win32$φ
