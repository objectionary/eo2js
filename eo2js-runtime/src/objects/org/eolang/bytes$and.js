// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const object = require('../../../runtime/object')
const {LAMBDA, RHO} = require('../../../runtime/attribute/specials');
const at_void = require('../../../runtime/attribute/at-void');
const bytesOf = require('../../../runtime/bytes-of');
const dataized = require('../../../runtime/dataized');
const data = require('../../../runtime/data');

/**
 * Bytes.and.
 * @return {Object} - Bytes.and object
 */
const bytes$and = function() {
  const obj = object('bytes$and')
  obj.attrs['b'] = at_void('b')
  obj.assets[LAMBDA] = function(self) {
    return data.toObject(
      bytesOf.bytes(dataized(self.take(RHO)))
        .and(dataized(self.take('b')))
        .asBytes()
    )
  }
  return obj
}

module.exports = bytes$and
