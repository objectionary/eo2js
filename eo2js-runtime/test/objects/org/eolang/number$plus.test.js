// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const assert = require('assert');
const number$plus = require('../../../../temp/objects/org/eolang/number$plus');
const {NUMBER} = require('../../../../temp/runtime/types');
const dataized = require('../../../../temp/runtime/dataized');
const {RHO} = require('../../../../temp/runtime/attribute/specials');
const at_rho = require('../../../../temp/runtime/attribute/at-rho');
const data = require('../../../../temp/runtime/data')

describe('number$plus', function() {
  it('should add two floats', function() {
    const plus = number$plus()
    plus.attrs[RHO] = at_rho(data.toObject(7.1))
    assert.equal(
      dataized(plus.with({'x': data.toObject(3.4)}), NUMBER),
      10.5
    )
  })
})
