const assert = require('assert')
const phi = require('../../temp/runtime/phi')
const {PHI, RHO, LAMBDA} = require('../../temp/runtime/attribute/specials')

describe('Φ', function() {
  describe('#take()', function() {
    it('should return the same default package object', function() {
      assert.deepStrictEqual(phi.take(''), phi.take(''))
    })
    it('should throw an error if special attributes are taken', function() {
      assert.throws(() => phi.take(PHI))
      assert.throws(() => phi.take(LAMBDA))
      assert.throws(() => phi.take(RHO))
    })
    it('should return the same existed package object', function() {
      assert.deepStrictEqual(phi.take('org'), phi.take('org'))
    });
  })
  describe('#copy()', function() {
    it('should not copy', function() {
      assert.deepStrictEqual(phi.copy(), phi)
    })
  })
  describe('#with()', function() {
    it('should fail', function() {
      assert.throws(() => phi.with({'x': 1}))
    })
  })
})
