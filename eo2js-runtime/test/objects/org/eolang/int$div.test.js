const assert = require('assert');
const int$div = require('../../../../temp/objects/org/eolang/int$div');
const data = require('../../../../temp/runtime/data');
const dataized = require('../../../../temp/runtime/dataized');
const {RHO} = require('../../../../temp/runtime/attribute/specials');
const at_rho = require('../../../../temp/runtime/attribute/at-rho');

describe('int$div', function() {
  it('should divide two integers', function() {
    const div = int$div()
    div.attrs[RHO] = at_rho(data.toObject(42))
    assert.equal(
      dataized(
        div.with({'x': data.toObject(6)}),
        data.INT
      ),
      7
    )
  })
})
