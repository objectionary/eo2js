const {DELTA, PHI, LAMBDA} = require('../../temp/runtime/attribute/specials')
const assert = require('assert')
const dataized = require('../../temp/runtime/dataized')
const object = require('../../temp/runtime/object')
const {INT, FLOAT, BOOL, STRING, BYTES} = require('../../temp/runtime/data')
const at_simple = require('../../temp/runtime/attribute/at-simple');

describe('dataized', function() {
  it(`should throw an error if ${DELTA} asset is absent`, function() {
    assert.throws(() => dataized(object({})))
  })
  it(`should return ${DELTA} asset if present`, function() {
    const value = 5
    const obj = object({})
    obj.assets[DELTA] = value
    assert.equal(dataized(obj), value)
  })
  it(`should return ${DELTA} asset through ${PHI} attribute`, function() {
    const value = 5
    const obj = object({})
    const phi = object(obj)
    phi.assets[DELTA] = value
    obj.attrs[PHI] = at_simple(phi)
    assert.equal(dataized(obj), value)
  });
  it(`should return ${DELTA} asset through ${LAMBDA} asset`, function() {
    const value = 10
    const obj = object({})
    const other = object({})
    other.assets[DELTA] = value
    obj.assets[LAMBDA] = function(_) {
      return other
    }
    assert.equal(dataized(obj), value)
  });
  it('should successfully cast zero to int', function() {
    const obj = object({})
    obj.assets[DELTA] = ['0x00', '0x00', '0x00', '0x00', '0x00', '0x00', '0x00', '0x00']
    assert.equal(dataized(obj, INT), 0)
  });
  it('should successfully cast 12345 to integer', function() {
    const num = ['0x00', '0x00', '0x00', '0x00', '0x00', '0x00', '0x30', '0x39'];
    const obj = object({})
    obj.assets[DELTA] = num
    assert.equal(dataized(obj, INT), 12345)
  });
  it('should successfully cast zero to float', function() {
    const obj = object({})
    obj.assets[DELTA] = ['0x00', '0x00', '0x00', '0x00', '0x00', '0x00', '0x00', '0x00']
    assert.equal(dataized(obj, FLOAT), 0.0)
  });
  it('should successfully cast 374.9 to float', function() {
    const num = ['0x40', '0x77', '0x6E', '0x66', '0x66', '0x66', '0x66', '0x66'];
    const obj = object({})
    obj.assets[DELTA] = num
    assert.equal(dataized(obj, FLOAT), 374.9)
  });
  it('should successfully cast "Hello, world!" to string', function() {
    const hello = ['0x48', '0x65', '0x6C', '0x6C', '0x6F', '0x2C', '0x20', '0x77', '0x6F', '0x72', '0x6C', '0x64', '0x21']
    const obj = object({})
    obj.assets[DELTA] = hello
    assert.equal(dataized(obj, STRING), 'Hello, world!')
  });
  it('should successfully cast to TRUE', function() {
    const bool = ['0x01']
    const obj = object({})
    obj.assets[DELTA] = bool
    assert.equal(dataized(obj, BOOL), true)
  });
  it('should successfully cast to FALSE', function() {
    const bool = ['0x00']
    const obj = object({})
    obj.assets[DELTA] = bool
    assert.equal(dataized(obj, BOOL), false)
  });
  it('should successfully cast to bytes', function() {
    const bytes = ['0x48', '0x65', '0x6C', '0x6C', '0x6F', '0x2C', '0x20', '0x77', '0x6F', '0x72', '0x6C', '0x64', '0x21']
    const expected = [72, 101, 108, 108, 111, 44, 32, 119, 111, 114, 108, 100, 33]
    const obj = object({})
    obj.assets[DELTA] = bytes
    assert.deepEqual(dataized(obj, BYTES), expected)
  });
  it('should successfully cast to bytes without explicit casting', function() {
    const bytes = ['0x48', '0x65', '0x6C', '0x6C', '0x6F', '0x2C', '0x20', '0x77', '0x6F', '0x72', '0x6C', '0x64', '0x21']
    const expected = [72, 101, 108, 108, 111, 44, 32, 119, 111, 114, 108, 100, 33]
    const obj = object({})
    obj.assets[DELTA] = bytes
    assert.deepEqual(dataized(obj), expected)
  });
  it('should throw an error if type is invalid', function() {
    const obj = object({})
    obj.assets[DELTA] = 5
    assert.throws(() => dataized(obj, 'wrong'))
  });
})
