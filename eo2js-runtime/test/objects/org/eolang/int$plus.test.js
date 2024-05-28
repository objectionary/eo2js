const assert = require('assert');
const int$plus = require('../../../../temp/objects/org/eolang/int$plus');
const {data, INT} = require('../../../../temp/runtime/data');
const dataized = require('../../../../temp/runtime/dataized');
const {RHO} = require('../../../../temp/runtime/attribute/specials');
const at_rho = require('../../../../temp/runtime/attribute/at-rho');

describe('int$plus', function() {
  it('should add two integers', function() {
    const plus = int$plus()
    plus.attrs[RHO] = at_rho(data.toObject(BigInt(7)))
    assert.equal(
      dataized(plus.with({'x': data.toObject(BigInt(3))}), INT),
      BigInt(10)
    )
  })
})
