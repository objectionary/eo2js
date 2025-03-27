// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const dataized = require('../../../runtime/dataized')
const object = require('../../../runtime/object')
const {SHORT} = require('../../../runtime/types')
const {LAMBDA, RHO} = require('../../../runtime/attribute/specials')
const data = require('../../../runtime/data')
const phi = require('../../../runtime/phi');
const bytesOf = require('../../../runtime/bytes-of');

/**
 * The i16.as-i32.
 * @return {any} - The i16.as-i32 object
 */
const i16$as_i32 = function() {
  const obj = object('i16$as-i32')
  obj.assets[LAMBDA] = function(self) {
    return phi.take('org.eolang.i32').with({
      0: data.toObject(
        bytesOf.int(
          dataized(self.take(RHO), SHORT)
        ).asBytes()
      )
    })
  }
  return obj
}

module.exports = i16$as_i32
