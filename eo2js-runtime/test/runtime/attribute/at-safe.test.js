// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const assert = require('assert');
const at_safe = require('../../../temp/runtime/attribute/at-safe');
const ErFailure = require('../../../temp/runtime/error/ErFailure');
const ErError = require('../../../temp/runtime/error/ErError');

describe('at_safe', () => {
  describe('#put()', () => {
    it('should call #put() on origin', () => {
      let count = 0
      at_safe({put: (_) => count++}).put({})
      assert.equal(count, 1)
    })
  })
  describe('#get()', () => {
    it('should validate #get() of origin', () => {
      assert.throws(
        at_safe({
          get: () => {
            throw new ErFailure('error')
          }
        }).get,
        ErError
      )
    })
    it('should wrap "origin.get()" with "safe"', () => {
      const obj = at_safe({
        get: () => ({
          take: (_) => {
            throw new ErFailure('take')
          },
          with: (_) => {
            throw new ErFailure('with')
          }
        })
      }).get()
      assert.throws(() => obj.take('x'), ErError)
      assert.throws(() => obj.with({}), ErError)
    });
  })
  describe('#copy()', () => {
    it('should call #copy() on origin', () => {
      let count = 0
      at_safe({copy: (_) => count++}).copy({})
      assert.equal(count, 1)
    })
  })
})
