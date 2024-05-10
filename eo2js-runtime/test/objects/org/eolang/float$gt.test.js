const assert = require('assert');
const float$gt = require('../../../../temp/objects/org/eolang/float$gt');
const data = require('../../../../temp/runtime/data');
const dataized = require('../../../../temp/runtime/dataized');
const {RHO} = require('../../../../temp/runtime/attribute/specials');
const at_rho = require('../../../../temp/runtime/attribute/at-rho');

describe('float$gt', function() {
  it('should confirm that 7.2 > 3.1', function() {
    const gt = float$gt()
    gt.attrs[RHO] = at_rho(data.toObject(7.2))
    assert.equal(
      dataized(
        gt.with({'x': data.toObject(3.1)}),
        data.BOOL
      ),
      true
    )
  })
  it('should not confirm that 10.4 > 20.1', function() {
    const gt = float$gt()
    gt.attrs[RHO] = at_rho(data.toObject(10.4))
    assert.equal(
      dataized(
        gt.with({'x': data.toObject(20.1)}),
        data.BOOL
      ),
      false
    )
  })
})
