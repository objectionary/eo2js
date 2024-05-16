const taken = require('../../temp/runtime/taken')
const object = require('../../temp/runtime/object')
const attr = require('../../temp/runtime/attribute/attr')
const assert = require('assert');

describe('taken', function() {
  it('should not really take an attribute', function() {
    let count = 0
    const obj = object()
    obj.attrs['x'] = attr.lambda(
      obj, function(_) {
        ++count
        return object('next')
      }
    )
    taken(obj, 'x')
    assert.equal(count, 0)
  })
  it('should take an attribute on next direct call', function() {
    let count = 0
    const obj = object()
    obj.attrs['x'] = attr.lambda(
      obj, function(_) {
        ++count
        const next = object('x')
        next.attrs['y'] = attr.lambda(
          next, function(_) {
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
  it('should take an attribute on property taking', function() {
    let count = 0
    const obj = object()
    obj.attrs['x'] = attr.lambda(
      obj, function(_) {
        const next = object('x')
        next.assets.count = ++count
        return next
      }
    )
    assert.equal(taken(obj, 'x').assets.count, 1)
  })
})
