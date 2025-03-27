// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const at_simple = require('../../../temp/runtime/attribute/at-simple')
const assert = require('assert')

describe('at_simple', function() {
  describe('#put()', function() {
    it('should fail on put', function() {
      assert.throws(() => at_simple(5).put(10))
    })
  })
  describe('#get()', function() {
    it('should just return an object', function() {
      assert.equal(at_simple(42).get(), 42)
    })
  })
  describe('#copy()', function() {
    it('should return new attribute', function() {
      const origin = {
        copy: (_) => origin,
        with: (_) => origin
      }
      const attr = at_simple(origin)
      assert.notDeepStrictEqual(attr.copy(), attr)
    })
  })
})
