// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const taken = require('../../temp/runtime/taken')
const object = require('../../temp/runtime/object')
const attr = require('../../temp/runtime/attribute/attr')
const assert = require('assert');

describe('taken', () => {
  it('should not really take an attribute', () => {
    let count = 0
    const obj = object()
    obj.attrs.x = attr.lambda(
      obj, (_) => {
        ++count
        return object('next')
      }
    )
    taken(obj, 'x')
    assert.equal(count, 0)
  })
  it('should take an attribute on next direct call', () => {
    let count = 0
    const obj = object()
    obj.attrs.x = attr.lambda(
      obj, (_) => {
        ++count
        const next = object('x')
        next.attrs.y = attr.lambda(
          next, (_) => {
            ++count
            return object('y')
          }
        )
        return next
      }
    )
    taken(obj, 'x').take('y')
    assert.equal(count, 2)
  })
  it('should take an attribute on property taking', () => {
    let count = 0
    const obj = object()
    obj.attrs.x = attr.lambda(
      obj, (_) => {
        const next = object('x')
        next.assets.count = ++count
        return next
      }
    )
    assert.equal(taken(obj, 'x').assets.count, 1)
  })
})
