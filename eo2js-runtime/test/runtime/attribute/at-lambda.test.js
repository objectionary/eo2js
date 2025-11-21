// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const assert = require('assert');
const at_lambda = require('../../../temp/runtime/attribute/at-lambda');
const object = require('../../../temp/runtime/object');
const ErFailure = require('../../../temp/runtime/error/ErFailure');
const ErError = require('../../../temp/runtime/error/ErError');

describe('at_lambda', () => {
  describe('#put()', () => {
    it('should fail', () => {
      assert.throws(() => at_lambda({}, () => null).put({}))
    })
  })
  describe('#get()', () => {
    it('should execute callback', () => {
      const obj = object('')
      assert.deepStrictEqual(
        at_lambda({}, (_) => obj).get(),
        obj
      )
    })
    it('should pass given object to callback', () => {
      const obj = {
        counter: 0
      }
      at_lambda(obj, (rho) => rho.counter++).get()
      assert.equal(obj.counter, 1)
    })
    it('should validate given callback', () => {
      assert.throws(
        at_lambda({}, (_) => {
          throw new ErFailure('error')
        }).get,
        ErError
      )
    })
  })
})
