// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const object = require('../../../runtime/object')
const {LAMBDA, RHO} = require('../../../runtime/attribute/specials');
const at_void = require('../../../runtime/attribute/at-void');
const {NUMBER} = require('../../../runtime/types');
const heaps = require('../../../runtime/heaps');
const dataized = require('../../../runtime/dataized');
const data = require('../../../runtime/data')

/**
 * Malloc.of.allocated.resized.
 * @return {Object} - Malloc.of.allocated.resized object
 */
const malloc$of$allocated$resized = function() {
  const obj = object('malloc$of$allocated$resize')
  obj.attrs.size = at_void('size')
  obj.assets[LAMBDA] = function(self) {
    heaps.resize(
      dataized(self.take(RHO).take('id'), NUMBER),
      dataized(self.take('size'), NUMBER)
    )
    return data.toObject(true)
  }
  return obj
}

module.exports = malloc$of$allocated$resized
