// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const assert = require('assert');
const i64$gt = require('../../../../temp/objects/org/eolang/i64$gt');
const {BOOL} = require('../../../../temp/runtime/types');
const dataized = require('../../../../temp/runtime/dataized');
const {RHO} = require('../../../../temp/runtime/attribute/specials');
const at_rho = require('../../../../temp/runtime/attribute/at-rho');
const at_simple = require('../../../../temp/runtime/attribute/at-simple');
const data = require('../../../../temp/runtime/data');
const bytesOf = require('../../../../temp/runtime/bytes-of');

/**
 * Build an i64-like object that holds 8 bytes representing the given BigInt
 * and exposes itself via the `as-i64` attribute (so it can be reused both as
 * the ρ of `i64.gt` and as its argument).
 * @param {bigint} value - Long value
 * @return {object} - i64-like object
 */
const longObject = function(value) {
  const obj = data.toObject(bytesOf.long(value).asBytes());
  obj.attrs['as-i64'] = at_simple(obj);
  return obj;
};

describe('i64$gt', () => {
  it('should confirm that 7L > 3L', () => {
    const gt = i64$gt();
    gt.attrs[RHO] = at_rho(longObject(7n));
    assert.equal(
      dataized(gt.with({'x': longObject(3n)}), BOOL),
      true
    );
  });
  it('should not confirm that 5L > 10L', () => {
    const gt = i64$gt();
    gt.attrs[RHO] = at_rho(longObject(5n));
    assert.equal(
      dataized(gt.with({'x': longObject(10n)}), BOOL),
      false
    );
  });
});
