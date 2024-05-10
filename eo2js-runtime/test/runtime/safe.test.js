const safe = require('../../temp/runtime/safe');
const ErFailure = require('../../temp/runtime/error/ErFailure');
const assert = require('assert');
const ErError = require('../../temp/runtime/error/ErError');

describe('safe', function() {
  it('should validate #with() and #take() methods', function() {
    const obj = safe({
      take: function(_) {
        throw new ErFailure('take')
      },
      with: function(_) {
        throw new ErFailure('with')
      }
    })
    assert.throws(() => obj.take('x'), ErError)
    assert.throws(() => obj.with({}), ErError)
  })
})
