// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const dataized = require('../../../runtime/dataized')
const object = require('../../../runtime/object')
const {LONG} = require('../../../runtime/types')
const {LAMBDA, RHO} = require('../../../runtime/attribute/specials')
const at_void = require('../../../runtime/attribute/at-void')
const data = require('../../../runtime/data')
const phi = require('../../../runtime/phi');

/**
 * The i64.gt.
 * @return {any} - The i64.gt object
 */
const i64$gt = function() {
  const obj = object('i64$gt')
  obj.attrs['x'] = at_void('x')
  obj.assets[LAMBDA] = function(self) {
    return phi.take('org.eolang.i64').with({
      0: data.toObject(
        dataized(self.take(RHO), LONG) > dataized(self.take('x').take('as-i64'), LONG)
      )
    })
  }
  return obj
}

module.exports = i64$gt
