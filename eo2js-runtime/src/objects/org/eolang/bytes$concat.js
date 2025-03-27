// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const object = require('../../../runtime/object')
const {LAMBDA, RHO} = require('../../../runtime/attribute/specials');
const at_void = require('../../../runtime/attribute/at-void');
const data = require('../../../runtime/data');
const dataized = require('../../../runtime/dataized');

/**
 * Bytes.concat.
 * @return {Object} - Bytes.concat object
 */
const bytes$concat = function() {
  const obj = object('bytes$concat')
  obj.attrs['b'] = at_void('b')
  obj.assets[LAMBDA] = function(self) {
    return data.toObject([
      ...dataized(self.take(RHO)),
      ...dataized(self.take('b'))
    ])
  }
  return obj
}

module.exports = bytes$concat
