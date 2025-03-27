// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const object = require('../../../../runtime/object')
const {LAMBDA, RHO} = require('../../../../runtime/attribute/specials');
const data = require('../../../../runtime/data');
const {NUMBER} = require('../../../../runtime/types');
const dataized = require('../../../../runtime/dataized');

/**
 * Angle.cos.
 * @return {Object} - Angle.cos object
 */
const angle$cos = function() {
  const obj = object('angle$cos')
  obj.assets[LAMBDA] = function(self) {
    return data.toObject(
      Math.cos(dataized(self.take(RHO), NUMBER))
    )
  }
  return obj
}

module.exports = angle$cos
