// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const object = require('../../../../runtime/object')
const {LAMBDA, RHO} = require('../../../../runtime/attribute/specials');
const data = require('../../../../runtime/data');
const {NUMBER} = require('../../../../runtime/types');
const dataized = require('../../../../runtime/dataized');

/**
 * Real.asin.
 * @return {Object} - Real.asin object
 */
const real$asin = function() {
  const obj = object('real$asin')
  obj.assets[LAMBDA] = function(self) {
    return data.toObject(
      Math.asin(dataized(self.take(RHO), NUMBER))
    )
  }
  return obj
}

module.exports = real$asin
