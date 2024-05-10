const assert = require('assert');
const data = require('../../../../temp/runtime/data');
const dataized = require('../../../../temp/runtime/dataized');
const float$times = require('../../../../temp/objects/org/eolang/float$times');
const {RHO} = require('../../../../temp/runtime/attribute/specials');
const at_rho = require('../../../../temp/runtime/attribute/at-rho');

describe('float$times', function() {
  it('should multiply two floats', function() {
    const times = float$times()
    times.attrs[RHO] = at_rho(data.toObject(5.5))
    assert.equal(
      dataized(
        times.with({'x': data.toObject(12.1)}),
        data.FLOAT
      ),
      5.5 * 12.1
    )
  })
})
