// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const once = require('../../temp/runtime/once')
const assert = require('assert');

describe('once', function() {
  it('should execute callback only once', function() {
    let count = 0
    const obj = once(() => ({x: ++count}))
    obj.x
    assert.equal(obj.x, 1)
  })
})
