const assert = require('assert')
const bytesOf = require('../../temp/runtime/bytes-of')

describe('bytesOf', function() {
  describe('int', function() {
    it('should return the same int ', function() {
      const value = BigInt(5)
      assert.equal(bytesOf(value).asInt(), value)
    })
    it('should return valid int bytes', function() {
      assert.deepEqual(bytesOf(BigInt(12345)).asBytes(), [0, 0, 0, 0, 0, 0, 48, 57])
    })
    it('should convert to bytes and back', function() {
      const value = BigInt(1234)
      const bytes = bytesOf(value).asBytes()
      assert.equal(bytesOf(bytes).asInt(), value)
    })
    it('should convert negative int an back', function() {
      assert.equal(bytesOf(BigInt(-1)).asInt(), BigInt(-1))
    })
    it('should fail if not 8 bytes given', function() {
      assert.throws(() => bytesOf([0, 0, 0, 48, 57]).asInt())
    })
  })
  describe('float', function() {
    it('should return the same float', function() {
      const value = 14.9
      assert.equal(bytesOf(value).asFloat(), value)
    })
    it('should return valid float bytes', function() {
      assert.deepEqual(bytesOf(374.9).asBytes(), [64, 119, 110, 102, 102, 102, 102, 102])
    })
    it('should convert to bytes and back', function() {
      const value = 9412.21
      const bytes = bytesOf(value).asBytes()
      assert.equal(bytesOf(bytes).asFloat(), value)
    })
    it('should fail if not 8 bytes given', function() {
      assert.throws(() => bytesOf([64, 119, 110, 102]).asFloat())
    })
    it('should return positive infinity', function() {
      assert.equal(bytesOf(Infinity).asFloat(), Infinity)
    })
    it('should return negative infinity', function() {
      assert.equal(bytesOf(-Infinity).asFloat(), -Infinity)
    })
  })
  describe('string', function() {
    it('should return the same string', function() {
      const str = 'Hello, world!'
      assert.equal(bytesOf(str).asString(), str)
    })
    it('should return valid string bytes', function() {
      assert.deepEqual(
        bytesOf('Hello, world!').asBytes(),
        [72, 101, 108, 108, 111, 44, 32, 119, 111, 114, 108, 100, 33]
      )
    })
    it('should convert to bytes and back', function() {
      const value = 'Привет, мир!'
      const bytes = bytesOf(value).asBytes()
      assert.equal(bytesOf(bytes).asString(), value)
    })
  })
  describe('bool', function() {
    it('should return the save bool', function() {
      assert.equal(bytesOf(true).asBool(), true)
      assert.equal(bytesOf(false).asBool(), false)
    })
    it('should return valid bool bytes', function() {
      assert.deepEqual(bytesOf(true).asBytes(), [1])
      assert.deepEqual(bytesOf(false).asBytes(), [0])
    })
    it('should return valid bool from bytes', function() {
      assert.equal(bytesOf([1]).asBool(), true)
      assert.equal(bytesOf([0]).asBool(), false)
    })
    it('should fail if not 1 byte given', function() {
      assert.throws(() => bytesOf([1, 1]).asBool())
    })
  })
  describe('bytes', function() {
    it('should return the same bytes', function() {
      const bytes = [72, 101, 108, 108, 111, 44, 32, 119, 111, 114, 108, 100, 33]
      assert.deepEqual(bytesOf(bytes).asBytes(), bytes)
    })
    it('should convert hex bytes to int bytes', function() {
      const hex = ['0x48', '0x65', '0x6C', '0x6C', '0x6F', '0x2C', '0x20', '0x77', '0x6F', '0x72', '0x6C', '0x64', '0x21']
      const int = [72, 101, 108, 108, 111, 44, 32, 119, 111, 114, 108, 100, 33]
      assert.deepEqual(bytesOf(hex).asBytes(), int)
    })
    it('should convert only hex bytes', function() {
      const bts = [72, '0x65']
      assert.deepEqual(bytesOf(bts).asBytes(), [72, 101])
    })
    it('should fail while converting wrong format bytes', function() {
      const wrong = [1, 2, 'hello']
      assert.throws(() => bytesOf(wrong))
    })
  })
  describe('#verbose()', function() {
    describe('returns valid verbose string representation if', function() {
      it('length is 0', function() {
        assert.equal(bytesOf([]).verbose(), '--')
      })
      it('length is 1', function() {
        assert.equal(bytesOf([1]).verbose(), 'true')
        assert.equal(bytesOf([0]).verbose(), 'false')
        assert.equal(bytesOf([2]).verbose(), '[2]')
      })
      it('length is 8', function() {
        assert.ok(bytesOf(BigInt(BigInt(5))).verbose().startsWith('[0,0,0,0,0,0,0,5] = 5, or '))
        assert.ok(bytesOf(7.3).verbose().includes(', or 7.3, or'))
        assert.ok(bytesOf('abcdefgh').verbose().includes('abcdefgh'))
      })
      it('length is not 8', function() {
        assert.ok(bytesOf('Hello, world!').verbose().includes('Hello, world!'))
        assert.ok(bytesOf('some').verbose().includes('some'))
      })
    })
  })
  describe('#and(other)', function() {
    it('should equal to 0 with self negated', function() {
      assert.equal(bytesOf(127).and(bytesOf(127).not().asBytes()).asInt(), 0)
    })
  })
  describe('#or(other)', function() {
    it('should equal to -1 with self negated', function() {
      assert.equal(bytesOf(127).or(bytesOf(127).not().asBytes()).asInt(), -1)
    })
  })
  describe('#xor(other)', function() {
    it('should return -1024 on 512 ^ -512', function() {
      assert.equal(bytesOf(BigInt(512)).xor(bytesOf(BigInt(-512)).asBytes()).asInt(), BigInt(-1024))
    })
  })
  describe('#not()', function() {
    it('should return the same on double negation', function() {
      assert.equal(bytesOf('abc').not().not().asString(), 'abc')
    })
    it('should return opposite value on negation', function() {
      assert.equal(bytesOf(BigInt(-128)).not().asInt(), BigInt(127))
    })
  })
  describe('#shift(bits)', function() {
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
      it(`${num} shift ${bits} = ${expected}`, function() {
        assert.deepEqual(bytesOf(num).shift(bits).asInt(), bytesOf(expected).asInt())
      })
    })
  })
  it('-1 >> 4 != 0', function() {
    assert.notDeepStrictEqual(bytesOf(BigInt(-1)).shift(4).asBytes(), bytesOf(BigInt(0)).asBytes())
  })
  it('-18 << 2 == ~71', function() {
    assert.deepStrictEqual(bytesOf(BigInt(-18)).shift(-2).asBytes(), bytesOf(BigInt(71)).not().asBytes())
  })
})
