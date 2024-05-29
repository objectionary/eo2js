const cages = require('../../temp/runtime/cages');
const object = require('../../temp/runtime/object');
const assert = require('assert');

describe('cages', function() {
  it('should initialize object for the first time', function() {
    assert.doesNotThrow(() => cages.init(object()))
  })
  it('should encage object with locator', function() {
    const first = object()
    const second = object()
    const locator = cages.init(first)
    cages.encage(locator, second)
    assert.equal(cages.get(locator).toString(), second.toString())
  })
  it('should fail to encage object if it was not initialized', function() {
    assert.throws(() => cages.encage(0, object()))
  })
  it('should fail to encage object of different forma', function() {
    const locator = cages.init(object('first'))
    assert.throws(() => cages.encage(locator, object('second')))
  })
  it('should fail to get object if it was not initialized', function() {
    assert.throws(() => cages.get(0))
  })
  it('should get object by right locator', function() {
    const first = cages.init(object('first'))
    cages.init(object('second'))
    assert.ok(cages.get(first).toString().includes('first'))
  })
})
