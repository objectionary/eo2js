const applied = require('../../temp/runtime/applied')
const taken = require('../../temp/runtime/taken')
const object = require('../../temp/runtime/object')
const attr = require('../../temp/runtime/attribute/attr')
const assert = require('assert');
const os = require('os');

describe('applied', function() {
  it('should not really apply an attribute', function() {
    const obj = object()
    obj.attrs['x'] = attr.void('x')
    applied(obj, {x: object('y')})
    assert.throws(() => obj.take('x'))
  })
  it('should apply an attribute on next direct call', function() {
    const obj = object()
    obj.attrs['x'] = attr.void('x')
    assert.doesNotThrow(() => taken(applied(obj, {x: object('y')}), 'x'))
  })
  it('should apply an attribute on property taking', function() {
    const obj = object()
    obj.attrs['x'] = attr.void('x')
    assert.doesNotThrow(() => applied(obj, {x: object('y')}).attrs['x'].get())
  })
  it('should ', function() {
    console.log(os.type())
  });
})
