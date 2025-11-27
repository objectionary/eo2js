// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const {DELTA, PHI, LAMBDA} = require('../../temp/runtime/attribute/specials')
const assert = require('assert')
const dataized = require('../../temp/runtime/dataized')
const object = require('../../temp/runtime/object')
const {NUMBER, BOOL, STRING, BYTES} = require('../../temp/runtime/types')
const at_simple = require('../../temp/runtime/attribute/at-simple');

describe('dataized', () => {
  it(`should throw an error if ${DELTA} asset is absent`, () => {
    assert.throws(() => dataized(object()))
  })
  it(`should return ${DELTA} asset if present`, () => {
    const bytes = [0, 5]
    const obj = object()
    obj.assets[DELTA] = bytes
    assert.deepEqual(dataized(obj), bytes)
  })
  it(`should return ${DELTA} asset through ${PHI} attribute`, () => {
    const bytes = [0, 5]
    const obj = object()
    const phi = object(obj)
    phi.assets[DELTA] = bytes
    obj.attrs[PHI] = at_simple(phi)
    assert.deepEqual(dataized(obj), bytes)
  });
  it(`should return ${DELTA} asset through ${LAMBDA} asset`, () => {
    const bytes = [0, 10]
    const obj = object()
    const other = object()
    other.assets[DELTA] = bytes
    obj.assets[LAMBDA] = function(_) {
      return other
    }
    assert.deepEqual(dataized(obj), [0, 10])
  });
  it('should successfully cast zero to number', () => {
    const obj = object()
    obj.assets[DELTA] = ['0x00', '0x00', '0x00', '0x00', '0x00', '0x00', '0x00', '0x00']
    assert.equal(dataized(obj, NUMBER), 0)
  });
  it('should successfully cast zero to float', () => {
    const obj = object()
    obj.assets[DELTA] = ['0x00', '0x00', '0x00', '0x00', '0x00', '0x00', '0x00', '0x00']
    assert.equal(dataized(obj, NUMBER), 0.0)
  });
  it('should successfully cast 374.9 to float', () => {
    const num = ['0x40', '0x77', '0x6E', '0x66', '0x66', '0x66', '0x66', '0x66'];
    const obj = object()
    obj.assets[DELTA] = num
    assert.equal(dataized(obj, NUMBER), 374.9)
  });
  it('should successfully cast "Hello, world!" to string', () => {
    const hello = ['0x48', '0x65', '0x6C', '0x6C', '0x6F', '0x2C', '0x20', '0x77', '0x6F', '0x72', '0x6C', '0x64', '0x21']
    const obj = object()
    obj.assets[DELTA] = hello
    assert.equal(dataized(obj, STRING), 'Hello, world!')
  });
  it('should successfully cast to TRUE', () => {
    const bool = ['0x01']
    const obj = object()
    obj.assets[DELTA] = bool
    assert.equal(dataized(obj, BOOL), true)
  });
  it('should successfully cast to FALSE', () => {
    const bool = ['0x00']
    const obj = object()
    obj.assets[DELTA] = bool
    assert.equal(dataized(obj, BOOL), false)
  });
  it('should successfully cast to bytes', () => {
    const bytes = ['0x48', '0x65', '0x6C', '0x6C', '0x6F', '0x2C', '0x20', '0x77', '0x6F', '0x72', '0x6C', '0x64', '0x21']
    const expected = [72, 101, 108, 108, 111, 44, 32, 119, 111, 114, 108, 100, 33]
    const obj = object()
    obj.assets[DELTA] = bytes
    assert.deepEqual(dataized(obj, BYTES), expected)
  });
  it('should successfully cast to bytes without explicit casting', () => {
    const bytes = ['0x48', '0x65', '0x6C', '0x6C', '0x6F', '0x2C', '0x20', '0x77', '0x6F', '0x72', '0x6C', '0x64', '0x21']
    const expected = [72, 101, 108, 108, 111, 44, 32, 119, 111, 114, 108, 100, 33]
    const obj = object()
    obj.assets[DELTA] = bytes
    assert.deepEqual(dataized(obj), expected)
  });
  it('should throw an error if type is invalid', () => {
    const obj = object()
    obj.assets[DELTA] = 5
    assert.throws(() => dataized(obj, 'wrong'))
  });
})
