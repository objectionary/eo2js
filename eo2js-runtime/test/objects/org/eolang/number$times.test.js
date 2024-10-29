const assert = require('assert');
const {NUMBER} = require('../../../../temp/runtime/types');
const dataized = require('../../../../temp/runtime/dataized');
const number$times = require('../../../../temp/objects/org/eolang/number$times');
const {RHO} = require('../../../../temp/runtime/attribute/specials');
const at_rho = require('../../../../temp/runtime/attribute/at-rho');
const data = require('../../../../temp/runtime/data')

describe('number$times', function() {
  it('should multiply two numbers', function() {
    const times = number$times()
    times.attrs[RHO] = at_rho(data.toObject(5.5))
    assert.equal(
      dataized(times.with({'x': data.toObject(12.1)}), NUMBER),
      5.5 * 12.1
    )
  })
})
