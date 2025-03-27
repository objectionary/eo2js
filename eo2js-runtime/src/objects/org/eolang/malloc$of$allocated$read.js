// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const object = require('../../../runtime/object')
const {LAMBDA, RHO} = require('../../../runtime/attribute/specials');
const at_void = require('../../../runtime/attribute/at-void');
const dataized = require('../../../runtime/dataized');
const {NUMBER} = require('../../../runtime/types');
const heaps = require('../../../runtime/heaps');
const data = require('../../../runtime/data')

/**
 * Malloc.of.allocated.read.
 * @return {Object} - Malloc.of.allocated.read object
 */
const malloc$of$allocated$read = function() {
  const obj = object('malloc$of$allocated$read')
  obj.attrs['offset'] = at_void('offset')
  obj.attrs['length'] = at_void('length')
  obj.assets[LAMBDA] = function(self) {
    return data.toObject(
      heaps.read(
        dataized(self.take(RHO).take('id'), NUMBER),
        dataized(self.take('offset'), NUMBER),
        dataized(self.take('length'), NUMBER)
      )
    )
  }
  return obj
}

module.exports = malloc$of$allocated$read
