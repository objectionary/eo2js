const assert = require('assert');
const int$plus = require('../../../../temp/objects/org/eolang/int$plus');
const data = require('../../../../temp/runtime/data');
const dataized = require('../../../../temp/runtime/dataized');
const {RHO} = require('../../../../temp/runtime/attribute/specials');
const at_rho = require('../../../../temp/runtime/attribute/at-rho');

describe('int$plus', function() {
  it('should add two integers', function() {
    const plus = int$plus()
    plus.attrs[RHO] = at_rho(data.toObject(7))
    assert.equal(
      dataized(
        plus.with({'x': data.toObject(3)}),
        data.INT
      ),
      10
    )
  })
})
