const assert = require('assert');
const error = require('../../../../temp/objects/org/eolang/error');
const {data} = require('../../../../temp/runtime/data');
const object = require('../../../../temp/runtime/object');
const dataized = require('../../../../temp/runtime/dataized');
const ErError = require('../../../../temp/runtime/error/ErError');

describe('error', function() {
  it(`should throw ${ErError.name} error`, function() {
    assert.throws(
      () => dataized(error().with({0: data.toObject('some error')})),
      ErError
    )
  })
  it('should not fail if message is not string', function() {
    assert.doesNotThrow(() => new ErError(object('first')))
  })
})
