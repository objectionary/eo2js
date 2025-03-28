// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const object = require('../../../runtime/object')
const {LAMBDA, RHO} = require('../../../runtime/attribute/specials');
const at_void = require('../../../runtime/attribute/at-void');
const data = require('../../../runtime/data');
const bytesOf = require('../../../runtime/bytes-of');
const dataized = require('../../../runtime/dataized');

/**
 * Bytes.xor.
 * @return {Object} - Bytes.xor object
 */
const bytes$xor = function() {
  const obj = object('bytes$xor')
  obj.attrs['b'] = at_void('b')
  obj.assets[LAMBDA] = function(self) {
    return data.toObject(
      bytesOf.bytes(dataized(self.take(RHO)))
        .xor(dataized(self.take('b')))
        .asBytes()
    )
  }
  return obj
}

module.exports = bytes$xor
