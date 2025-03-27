// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const dataized = require('../../../runtime/dataized')
const object = require('../../../runtime/object')
const {LONG} = require('../../../runtime/types')
const {LAMBDA, RHO} = require('../../../runtime/attribute/specials')
const data = require('../../../runtime/data')

/**
 * The i64.as-number.
 * @return {any} - The i64.as-number object
 */
const i64$as_number = function() {
  const obj = object('i64$as-number')
  obj.assets[LAMBDA] = function(self) {
    return data.toObject(
      Number(dataized(self.take(RHO), LONG))
    )
  }
  return obj
}

module.exports = i64$as_number
