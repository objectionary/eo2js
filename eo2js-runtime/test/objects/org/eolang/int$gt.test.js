const assert = require('assert');
const int$gt = require('../../../../temp/objects/org/eolang/int$gt');
const {data, BOOL} = require('../../../../temp/runtime/data');
const dataized = require('../../../../temp/runtime/dataized');
const {RHO} = require('../../../../temp/runtime/attribute/specials');
const at_rho = require('../../../../temp/runtime/attribute/at-rho');

describe('int$gt', function() {
  it('should confirm that 7 > 3', function() {
    const gt = int$gt()
    gt.attrs[RHO] = at_rho(data.toObject(7))
    assert.equal(
      dataized(gt.with({'x': data.toObject(3)}), BOOL),
      true
    )
  })
  it('should not confirm that 10 > 20', function() {
    const gt = int$gt()
    gt.attrs[RHO] = at_rho(data.toObject(10))
    assert.equal(
      dataized(gt.with({'x': data.toObject(20)}), BOOL),
      false
    )
  })
})
