// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const object = require('../../../../runtime/object')
const {LAMBDA, RHO} = require('../../../../runtime/attribute/specials');
const data = require('../../../../runtime/data');
const {NUMBER} = require('../../../../runtime/types');
const dataized = require('../../../../runtime/dataized');

/**
 * Angle.sin.
 * @return {Object} - Angle.sin object
 */
const angle$sin = function() {
  const obj = object('angle$sin')
  obj.assets[LAMBDA] = function(self) {
    return data.toObject(
      Math.sin(dataized(self.take(RHO), NUMBER))
    )
  }
  return obj
}

module.exports = angle$sin
