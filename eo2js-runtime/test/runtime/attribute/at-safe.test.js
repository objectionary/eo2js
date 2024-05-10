const assert = require('assert');
const at_safe = require('../../../temp/runtime/attribute/at-safe');
const ErFailure = require('../../../temp/runtime/error/ErFailure');
const ErError = require('../../../temp/runtime/error/ErError');

describe('at_safe', function() {
  describe('#put()', function() {
    it('should call #put() on origin', function() {
      let count = 0
      at_safe({put: (_) => count++}).put({})
      assert.equal(count, 1)
    })
  })
  describe('#get()', function() {
    it('should validate #get() of origin', function() {
      assert.throws(
        at_safe({
          get: () => {
            throw new ErFailure('error')
          }
        }).get,
        ErError
      )
    })
    it('should wrap "origin.get()" with "safe"', function() {
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
  describe('#copy()', function() {
    it('should call #copy() on origin', function() {
      let count = 0
      at_safe({copy: (_) => count++}).copy({})
      assert.equal(count, 1)
    })
  })
})
