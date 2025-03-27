// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const at_once = require('../../../temp/runtime/attribute/at-once')
const assert = require('assert');

describe('at_once', function() {
  describe('#put()', function() {
    it('should throw an error', function() {
      assert.throws(() => at_once({}).put())
    })
  })
  describe('#get()', function() {
    it('should take from origin only once', function() {
      let count = 0
      const origin = {get: () => ++count}
      const attr = at_once(origin)
      assert.equal(attr.get(), 1)
      assert.equal(attr.get(), attr.get())
    })
  })
  describe('#copy()', function() {
    it('should return new attribute', function() {
      const origin = {copy: () => 'Hello'}
      const attr = at_once(origin)
      assert.notDeepStrictEqual(attr.copy(), attr)
    })
    it('should reset cache', function() {
      let count = 0;
      const origin = {get: () => ++count, copy: () => origin}
      const attr = at_once(origin)
      attr.get()
      attr.copy().get()
      assert.equal(count, 2)
    });
  })
})
