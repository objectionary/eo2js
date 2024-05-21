const assert = require('assert');
const float$div = require('../../../../temp/objects/org/eolang/float$div');
const {data, FLOAT} = require('../../../../temp/runtime/data');
const dataized = require('../../../../temp/runtime/dataized');
const {RHO} = require('../../../../temp/runtime/attribute/specials');
const at_rho = require('../../../../temp/runtime/attribute/at-rho');

describe('float$div', function() {
  it('should divide two floats', function() {
    const div = float$div()
    div.attrs[RHO] = at_rho(data.toObject(13.2))
    assert.equal(
      dataized(div.with({'x': data.toObject(5.7)}), FLOAT),
      13.2 / 5.7
    )
  })
  it('should not fail on division by zero', function() {
    const div = float$div()
    div.attrs[RHO] = at_rho(data.toObject(13.2))
    assert.doesNotThrow(
      () => dataized(div.with({'x': data.toObject(0.0)}), FLOAT)
    )
  });
})
