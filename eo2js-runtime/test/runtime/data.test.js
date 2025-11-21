// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const assert = require('assert')
const {STRING, NUMBER, BOOL} = require('../../temp/runtime/types')
const data = require('../../temp/runtime/data')
const dataized = require('../../temp/runtime/dataized');

const isObject = function(obj) {
  return obj.hasOwnProperty('attrs') &&
    obj.hasOwnProperty('assets') &&
    obj.hasOwnProperty('take') &&
    obj.hasOwnProperty('copy') &&
    obj.hasOwnProperty('with') &&
    obj.hasOwnProperty('toString')
}

describe('data', () => {
  describe('to string', () => {
    it('should convert string to object', () => {
      assert.ok(isObject(data.toObject('Hello')))
    })
    it('should be dataized as string', () => {
      assert.equal(dataized(data.toObject('Hello'), STRING), 'Hello')
    })
  })
  describe('to number', () => {
    it('should convert number to object', () => {
      assert.ok(isObject(data.toObject(42.7)))
    })
    it('should be dataized as number', () => {
      assert.equal(dataized(data.toObject(13.2), NUMBER), 13.2)
    })
  })
  describe('to bool', () => {
    it('should convert bool to object', () => {
      assert.ok(isObject(data.toObject(true)))
    })
    it('should be dataized as bool', () => {
      assert.equal(dataized(data.toObject(false), BOOL), false)
    })
  })
  describe('to bytes', () => {
    it('should convert byte array to object', () => {
      assert.ok(isObject(data.toObject([0, 1, 2])))
    })
    it('should be dataized as byte array', () => {
      assert.deepEqual(dataized(data.toObject([10, 52, 28])), [10, 52, 28])
    })
  })
})
