// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const at_void = require('../../../temp/runtime/attribute/at-void')
const object = require('../../../temp/runtime/object')
const assert = require('assert')

describe('at_void', () => {
  describe('#get()', () => {
    it('should throw an error if is not set', () => {
      assert.throws(() => at_void('void').get())
    })
    it('should return object if is set', () => {
      const attr = at_void('void')
      attr.put(42)
      assert.equal(attr.get(), 42)
    })
  })
  describe('#put()', () => {
    it('should not throw an error if is not set', () => {
      const attr = at_void('void')
      assert.doesNotThrow(() => attr.put(42))
    })
    it('should throw an error if is already set', () => {
      const attr = at_void('void')
      attr.put(42)
      assert.throws(() => attr.put(87))
    })
  })
  describe('#copy()', () => {
    it('should return new void attribute if is not set', () => {
      const attr = at_void('void')
      assert.notDeepStrictEqual(attr.copy(), attr)
    })
    it('should pass set object to new attribute', () => {
      const obj = object()
      const attr = at_void('void')
      attr.put(obj)
      assert.deepStrictEqual(attr.get(), obj)
    })
  })
})
