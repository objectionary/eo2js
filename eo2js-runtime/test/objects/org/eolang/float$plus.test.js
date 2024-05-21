const assert = require('assert');
const float$plus = require('../../../../temp/objects/org/eolang/float$plus');
const {data, FLOAT} = require('../../../../temp/runtime/data');
const dataized = require('../../../../temp/runtime/dataized');
const {RHO} = require('../../../../temp/runtime/attribute/specials');
const at_rho = require('../../../../temp/runtime/attribute/at-rho');

describe('int$plus', function() {
  it('should add two floats', function() {
    const plus = float$plus()
    plus.attrs[RHO] = at_rho(data.toObject(7.1))
    assert.equal(
      dataized(plus.with({'x': data.toObject(3.4)}), FLOAT),
      10.5
    )
  })
})
