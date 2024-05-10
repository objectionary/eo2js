const assert = require('assert');
const bytesOf = require('../../temp/runtime/bytes-of');

describe('bytesOf', function() {
  describe('int', function() {
    it('should return the same int ', function() {
      const value = 5
      assert.equal(bytesOf(value).asInt(), value)
    })
    it('should return valid int bytes', function() {
      assert.deepEqual(bytesOf(12345).asBytes(), [0, 0, 0, 0, 0, 0, 48, 57])
    })
    it('should convert to bytes and back', function() {
      const value = 1234
      const bytes = bytesOf(value).asBytes()
      assert.equal(bytesOf(bytes).asInt(), value)
    });
    it('should fail if not 8 bytes given', function() {
      assert.throws(() => bytesOf([0, 0, 0, 48, 57]).asInt())
    });
  })
  describe('float', function() {
    it('should return the same float', function() {
      const value = 14.9
      assert.equal(bytesOf(value).asFloat(), value)
    })
    it('should return valid float bytes', function() {
      assert.deepEqual(bytesOf(374.9).asBytes(), [64, 119, 110, 102, 102, 102, 102, 102])
    });
    it('should convert to bytes and back', function() {
      const value = 9412.21
      const bytes = bytesOf(value).asBytes()
      assert.equal(bytesOf(bytes).asFloat(), value)
    });
    it('should fail if not 8 bytes given', function() {
      assert.throws(() => bytesOf([64, 119, 110, 102]).asFloat())
    });
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
    });
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
    });
  })
})
