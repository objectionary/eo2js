// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const assert = require('assert')
const phi = require('../../temp/runtime/phi')
const {PHI, RHO, LAMBDA} = require('../../temp/runtime/attribute/specials')

describe('Φ', () => {
  describe('#take()', () => {
    it('should return the same default package object', () => {
      assert.deepStrictEqual(phi.take(''), phi.take(''))
    })
    it('should throw an error if special attributes are taken', () => {
      assert.throws(() => phi.take(PHI))
      assert.throws(() => phi.take(LAMBDA))
      assert.throws(() => phi.take(RHO))
    })
    it('should return the same existed package object', () => {
      assert.deepStrictEqual(phi.take('org'), phi.take('org'))
    });
  })
  describe('#copy()', () => {
    it('should not copy', () => {
      assert.deepStrictEqual(phi.copy(), phi)
    })
  })
  describe('#with()', () => {
    it('should fail', () => {
      assert.throws(() => phi.with({'x': 1}))
    })
  })
})
