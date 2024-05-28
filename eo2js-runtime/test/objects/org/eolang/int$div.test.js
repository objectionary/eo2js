const assert = require('assert');
const int$div = require('../../../../temp/objects/org/eolang/int$div');
const {data, INT} = require('../../../../temp/runtime/data');
const dataized = require('../../../../temp/runtime/dataized');
const {RHO} = require('../../../../temp/runtime/attribute/specials');
const at_rho = require('../../../../temp/runtime/attribute/at-rho');

describe('int$div', function() {
  it('should divide two integers', function() {
    const div = int$div()
    div.attrs[RHO] = at_rho(data.toObject(BigInt(42)))
    assert.equal(
      dataized(div.with({'x': data.toObject(BigInt(6))}), INT),
      BigInt(7)
    )
  })
})
