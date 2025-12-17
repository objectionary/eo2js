// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const object = require('../../../../runtime/object')
const {LAMBDA, RHO} = require('../../../../runtime/attribute/specials');
const data = require('../../../../runtime/data');
const {NUMBER} = require('../../../../runtime/types');
const dataized = require('../../../../runtime/dataized');
const at_void = require('../../../../runtime/attribute/at-void');

/**
 * Real.pow.
 * @return {Object} - Real.pow object
 */
const real$pow = function() {
  const obj = object('real$pow')
  obj.attrs.x = at_void('x')
  obj.assets[LAMBDA] = function(self) {
    return data.toObject(
      dataized(self.take(RHO), NUMBER)**dataized(self.take('x'), NUMBER)
    )
  }
  return obj
}

module.exports = real$pow
