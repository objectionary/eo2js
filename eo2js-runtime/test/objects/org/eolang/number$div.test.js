// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const assert = require('assert');
const number$div = require('../../../../temp/objects/org/eolang/number$div');
const {NUMBER} = require('../../../../temp/runtime/types');
const dataized = require('../../../../temp/runtime/dataized');
const {RHO} = require('../../../../temp/runtime/attribute/specials');
const at_rho = require('../../../../temp/runtime/attribute/at-rho');
const data = require('../../../../temp/runtime/data')

describe('number$div', () => {
  it('should divide two floats', () => {
    const div = number$div()
    div.attrs[RHO] = at_rho(data.toObject(13.2))
    assert.equal(
      dataized(div.with({'x': data.toObject(5.7)}), NUMBER),
      13.2 / 5.7
    )
  })
})
