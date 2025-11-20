// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const assert = require('assert')
const bytesOf = require('../../temp/runtime/bytes-of')
const {LONG, INT, SHORT} = require('../../temp/runtime/types');

describe('bytesOf', () => {
  describe('long', () => {
    it('should return valid 8 bytes', () => {
      const value = 5n
      assert.deepStrictEqual(bytesOf.long(value).asBytes(), [0, 0, 0, 0, 0, 0, 0, 5])
    })
    it('should return the same long number', () => {
      const value = 12345n
      assert.deepStrictEqual(bytesOf.long(value).asNumber(LONG), value)
    })
    it('should convert to bytes and back', () => {
      const value = 345231n
      const bytes = bytesOf.long(value).asBytes()
      assert.deepStrictEqual(bytesOf.bytes(bytes).asNumber(LONG), value)
    })
  })
  describe('int', () => {
    it('should return valid 4 bytes', () => {
      const value = 5n
      assert.deepStrictEqual(bytesOf.int(value).asBytes(), [0, 0, 0, 5])
    })
    it('should return the same int number', () => {
      const value = 12345n
      assert.deepStrictEqual(bytesOf.int(value).asNumber(INT), value)
    })
    it('should convert to bytes and back', () => {
      const value = 345231n
      const bytes = bytesOf.int(value).asBytes()
      assert.deepStrictEqual(bytesOf.bytes(bytes).asNumber(INT), value)
    })
    it('should convert negative int and back', () => {
      assert.equal(bytesOf.int(-1n).asNumber(INT), -1n)
    })
    it('should fail if not 8 bytes given', () => {
      assert.throws(() => bytesOf.bytes([0, 0, 0, 48, 57]).asNumber(INT))
    })
    it('should fail if out of int bounds', () => {
      assert.throws(() => bytesOf.int(7000000000000n))
    })
  })
  describe('short', () => {
    it('should return valid 2 bytes', () => {
      const value = 5n
      assert.deepStrictEqual(bytesOf.short(value).asBytes(), [0, 5])
    })
    it('should return the same short number', () => {
      const value = 12345n
      assert.deepStrictEqual(bytesOf.short(value).asNumber(SHORT), value)
    })
    it('should convert to bytes and back', () => {
      const value = 123n
      const bytes = bytesOf.short(value).asBytes()
      assert.deepStrictEqual(bytesOf.bytes(bytes).asNumber(SHORT), value)
    })
    it('should convert negative short and back', () => {
      assert.equal(bytesOf.short(-1n).asNumber(SHORT), -1n)
    })
    it('should fail if not 2 bytes given', () => {
      assert.throws(() => bytesOf.short([0, 48, 57]))
    })
    it('should fail if out of short bounds', () => {
      assert.throws(() => bytesOf.short(7000000n))
    })
  })
  describe('number', () => {
    it('should return the same number', () => {
      const value = 14.9
      assert.equal(bytesOf.number(value).asNumber(), value)
    })
    it('should return valid number bytes', () => {
      assert.deepEqual(bytesOf.number(374.9).asBytes(), [64, 119, 110, 102, 102, 102, 102, 102])
    })
    it('should convert to bytes and back', () => {
      const value = 9412.21
      const bytes = bytesOf.number(value).asBytes()
      assert.equal(bytesOf.bytes(bytes).asNumber(), value)
    })
    it('should fail if not 8 bytes given', () => {
      assert.throws(() => bytesOf.number([64, 119, 110, 102]).asNumber())
    })
    it('should return positive infinity', () => {
      assert.equal(bytesOf.number(Infinity).asNumber(), Infinity)
    })
    it('should return negative infinity', () => {
      assert.equal(bytesOf.number(-Infinity).asNumber(), -Infinity)
    })
  })
  describe('string', () => {
    it('should return the same string', () => {
      const str = 'Hello, world!'
      assert.equal(bytesOf.string(str).asString(), str)
    })
    it('should return valid string bytes', () => {
      assert.deepEqual(
        bytesOf.string('Hello, world!').asBytes(),
        [72, 101, 108, 108, 111, 44, 32, 119, 111, 114, 108, 100, 33]
      )
    })
    it('should convert to bytes and back', () => {
      const value = 'Привет, мир!'
      const bytes = bytesOf.string(value).asBytes()
      assert.equal(bytesOf.bytes(bytes).asString(), value)
    })
  })
  describe('bool', () => {
    it('should return the save bool', () => {
      assert.equal(bytesOf.bool(true).asBool(), true)
      assert.equal(bytesOf.bool(false).asBool(), false)
    })
    it('should return valid bool bytes', () => {
      assert.deepEqual(bytesOf.bool(true).asBytes(), [1])
      assert.deepEqual(bytesOf.bool(false).asBytes(), [0])
    })
    it('should return valid bool from bytes', () => {
      assert.equal(bytesOf.bytes([1]).asBool(), true)
      assert.equal(bytesOf.bytes([0]).asBool(), false)
    })
    it('should fail if not 1 byte given', () => {
      assert.throws(() => bytesOf.bytes([1, 1]).asBool())
    })
  })
  describe('bytes', () => {
    it('should return the same bytes', () => {
      const bytes = [72, 101, 108, 108, 111, 44, 32, 119, 111, 114, 108, 100, 33]
      assert.deepEqual(bytesOf.bytes(bytes).asBytes(), bytes)
    })
    it('should convert hex bytes to int bytes', () => {
      const hex = ['0x48', '0x65', '0x6C', '0x6C', '0x6F', '0x2C', '0x20', '0x77', '0x6F', '0x72', '0x6C', '0x64', '0x21']
      const int = [72, 101, 108, 108, 111, 44, 32, 119, 111, 114, 108, 100, 33]
      assert.deepEqual(bytesOf.bytes(hex).asBytes(), int)
    })
    it('should convert only hex bytes', () => {
      const bts = [72, '0x65']
      assert.deepEqual(bytesOf.bytes(bts).asBytes(), [72, 101])
    })
    it('should fail while converting wrong format bytes', () => {
      const wrong = [1, 2, 'hello']
      assert.throws(() => bytesOf.bytes(wrong))
    })
  })
  describe('#verbose()', () => {
    describe('returns valid verbose string representation if', () => {
      it('length is 0', () => {
        assert.equal(bytesOf.bytes([]).verbose(), '--')
      })
      it('length is 1', () => {
        assert.equal(bytesOf.bytes([1]).verbose(), 'true')
        assert.equal(bytesOf.bytes([0]).verbose(), 'false')
        assert.equal(bytesOf.bytes([2]).verbose(), '[2]')
      })
      it('length is 8', () => {
        assert.ok(bytesOf.number(7.3).verbose().includes('7.3, or'))
        assert.ok(bytesOf.string('abcdefgh').verbose().includes('abcdefgh'))
      })
      it('length is not 8', () => {
        assert.ok(bytesOf.string('Hello, world!').verbose().includes('Hello, world!'))
        assert.ok(bytesOf.string('some').verbose().includes('some'))
      })
    })
  })
  describe('#and(other)', () => {
    it('should equal to 0 with self negated', () => {
      assert.equal(bytesOf.int(127n).and(bytesOf.int(127n).not().asBytes()).asNumber(INT), 0n)
    })
  })
  describe('#or(other)', () => {
    it('should equal to -1 with self negated', () => {
      assert.equal(bytesOf.int(127n).or(bytesOf.int(127n).not().asBytes()).asNumber(INT), -1n)
    })
  })
  describe('#xor(other)', () => {
    it('should return -1024 on 512 ^ -512', () => {
      assert.equal(bytesOf.int(512n).xor(bytesOf.int(-512n).asBytes()).asNumber(INT), -1024n)
    })
  })
  describe('#not()', () => {
    it('should return the same on double negation', () => {
      assert.equal(bytesOf.string('abc').not().not().asString(), 'abc')
    })
    it('should return opposite value on negation', () => {
      assert.equal(bytesOf.int(-128n).not().asNumber(INT), 127n)
    })
  })
  describe('#shift(bits)', () => {
    [
      [0x000000FF, -8, 0x0000FF00],
      [0x000000FF, -16, 0x00FF0000],
      [0x000000FF, -24, 0xFF000000],
      [0xFF000000, 8, 0x00FF0000],
      [0xFF000000, 16, 0x0000FF00],
      [0xFF000000, 24, 0x000000FF],
      [0x000000FF, 8, 0x00000000]
    ].forEach((set) => {
      const num = BigInt(set[0])
      const bits = BigInt(set[1])
      const expected = BigInt(set[2])
      it(`${num} shift ${bits} = ${expected}`, () => {
        assert.deepEqual(
          bytesOf.long(num).shift(bits).asNumber(LONG), bytesOf.long(expected).asNumber(LONG)
        )
      })
    })
  })
  it('-1 >> 4 != 0', () => {
    assert.notDeepStrictEqual(bytesOf.int(-1n).shift(4n).asBytes(), bytesOf.int(0n).asBytes())
  })
  it('-18 << 2 == ~71', () => {
    assert.deepStrictEqual(bytesOf.int(-18n).shift(-2n).asBytes(), bytesOf.int(71n).not().asBytes())
  })
})
