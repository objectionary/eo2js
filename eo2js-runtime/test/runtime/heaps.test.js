// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const heaps = require('../../temp/runtime/heaps');
const assert = require('assert')

describe('heaps', function() {
  it('should allocate memory', function() {
    const id = heaps.malloc(10)
    assert.doesNotThrow(() => heaps.read(id, 0, 10))
    heaps.free(id)
  })
  it('should allocate and read empty bytes', function() {
    const id = heaps.malloc(5)
    assert.deepEqual(heaps.read(id, 0, 5), [0, 0, 0, 0, 0])
    heaps.free(id)
  })
  it('should write and read', function() {
    const id = heaps.malloc(5)
    const bytes = [1, 2, 3, 4, 5]
    heaps.write(id, 0, bytes)
    assert.deepEqual(heaps.read(id, 0, bytes.length), bytes)
    heaps.free(id)
  })
  it('should fail on writing to empty block', function() {
    assert.throws(() => heaps.write(0, 0, [1]))
  })
  it('should fail on reading from empty block', function() {
    assert.throws(() => heaps.read(0, 0, 1))
  })
  it('should fail on reading if out of bounds', function() {
    const id = heaps.malloc(2)
    assert.throws(() => heaps.read(id, 1, 3))
    heaps.free(id)
  })
  it('should read by offset and length', function() {
    const id = heaps.malloc(5)
    heaps.write(id, 0, [1, 2, 3, 4, 5])
    assert.deepEqual(heaps.read(id, 1, 3), [2, 3, 4])
    heaps.free(id)
  })
  it('should fail on writing more than allocated', function() {
    const id = heaps.malloc(2)
    const bytes = [1, 2, 3, 4, 5]
    assert.throws(() => heaps.write(id, 0, bytes))
    heaps.free(id)
  })
  it('should fail to write more than allocated with offset', function() {
    const id = heaps.malloc(3)
    const bytes = [1, 2, 3]
    assert.throws(() => heaps.write(id, 1, bytes))
    heaps.free(id)
  })
  it('should concat on writing less that allocated', function() {
    const id = heaps.malloc(5)
    heaps.write(id, 0, [1, 1, 3, 4, 5])
    heaps.write(id, 2, [2, 2])
    assert.deepEqual(heaps.read(id, 0, 5), [1, 1, 2, 2, 5])
    heaps.free(id)
  })
  it('should free memory successfully', function() {
    const id = heaps.malloc(5)
    heaps.free(id)
    assert.throws(() => heaps.read(id, 0, 5))
  })
  it('should fail on clearing an empty block', function() {
    assert.throws(() => heaps.free(0))
  })
})
