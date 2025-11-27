// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const object = require('../../../runtime/object')
const {LAMBDA, RHO} = require('../../../runtime/attribute/specials');
const at_void = require('../../../runtime/attribute/at-void');
const {NUMBER} = require('../../../runtime/types');
const bytesOf = require('../../../runtime/bytes-of');
const dataized = require('../../../runtime/dataized');
const data = require('../../../runtime/data')

/**
 * Bytes.right.
 * @return {Object} - Bytes.right object
 */
const bytes$right = function() {
  const obj = object('bytes$right')
  obj.attrs.x = at_void('x')
  obj.assets[LAMBDA] = function(self) {
    return data.toObject(
      bytesOf.bytes(dataized(self.take(RHO)))
        .shift(dataized(self.take('x'), NUMBER))
        .asBytes()
    )
  }
  return obj
}

module.exports = bytes$right
