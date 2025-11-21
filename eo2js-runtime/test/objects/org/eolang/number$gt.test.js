// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const assert = require('assert');
const number$gt = require('../../../../temp/objects/org/eolang/number$gt');
const {BOOL} = require('../../../../temp/runtime/types');
const dataized = require('../../../../temp/runtime/dataized');
const {RHO} = require('../../../../temp/runtime/attribute/specials');
const at_rho = require('../../../../temp/runtime/attribute/at-rho');
const data = require('../../../../temp/runtime/data')

describe('number$gt', () => {
  it('should confirm that 7.2 > 3.1', () => {
    const gt = number$gt()
    gt.attrs[RHO] = at_rho(data.toObject(7.2))
    assert.equal(
      dataized(gt.with({'x': data.toObject(3.1)}), BOOL),
      true
    )
  })
  it('should not confirm that 10.4 > 20.1', () => {
    const gt = number$gt()
    gt.attrs[RHO] = at_rho(data.toObject(10.4))
    assert.equal(
      dataized(gt.with({'x': data.toObject(20.1)}), BOOL),
      false
    )
  })
})
