// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const at_once = require('../../../temp/runtime/attribute/at-once')
const assert = require('assert');

describe('at_once', () => {
  describe('#put()', () => {
    it('should throw an error', () => {
      assert.throws(() => at_once({}).put())
    })
  })
  describe('#get()', () => {
    it('should take from origin only once', () => {
      let count = 0
      const origin = {get: () => ++count}
      const attr = at_once(origin)
      assert.equal(attr.get(), 1)
      assert.equal(attr.get(), attr.get())
    })
  })
  describe('#copy()', () => {
    it('should return new attribute', () => {
      const origin = {copy: () => 'Hello'}
      const attr = at_once(origin)
      assert.notDeepStrictEqual(attr.copy(), attr)
    })
    it('should reset cache', () => {
      let count = 0;
      const origin = {get: () => ++count, copy: () => origin}
      const attr = at_once(origin)
      attr.get()
      attr.copy().get()
      assert.equal(count, 2)
    });
  })
})
