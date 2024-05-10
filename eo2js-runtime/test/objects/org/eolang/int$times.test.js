const assert = require('assert');
const int$times = require('../../../../temp/objects/org/eolang/int$times');
const data = require('../../../../temp/runtime/data');
const dataized = require('../../../../temp/runtime/dataized');
const {RHO} = require('../../../../temp/runtime/attribute/specials');
const at_rho = require('../../../../temp/runtime/attribute/at-rho');

describe('int$times', function() {
  it('should multiply two integers', function() {
    const times = int$times()
    times.attrs[RHO] = at_rho(data.toObject(3))
    assert.equal(
      dataized(
        times.with({'x': data.toObject(4)}),
        data.INT
      ),
      12
    )
  })
})
