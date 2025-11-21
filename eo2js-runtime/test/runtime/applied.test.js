// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const applied = require('../../temp/runtime/applied')
const taken = require('../../temp/runtime/taken')
const object = require('../../temp/runtime/object')
const attr = require('../../temp/runtime/attribute/attr')
const assert = require('assert');
const os = require('os');

describe('applied', () => {
  it('should not really apply an attribute', () => {
    const obj = object()
    obj.attrs.x = attr.void('x')
    applied(obj, {x: object('y')})
    assert.throws(() => obj.take('x'))
  })
  it('should apply an attribute on next direct call', () => {
    const obj = object()
    obj.attrs.x = attr.void('x')
    assert.doesNotThrow(() => taken(applied(obj, {x: object('y')}), 'x'))
  })
  it('should apply an attribute on property taking', () => {
    const obj = object()
    obj.attrs.x = attr.void('x')
    assert.doesNotThrow(() => applied(obj, {x: object('y')}).attrs.x.get())
  })
  it('should ', () => {
    console.log(os.type())
  });
})
