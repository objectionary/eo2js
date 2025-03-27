// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const object = require('../../../runtime/object')
const {LAMBDA, RHO} = require('../../../runtime/attribute/specials');
const dataized = require('../../../runtime/dataized');
const {NUMBER} = require('../../../runtime/types');
const heaps = require('../../../runtime/heaps');
const data = require('../../../runtime/data')

/**
 * Malloc.of.φ.
 * @return {Object} - Malloc.of.φ object
 */
const malloc$of$φ = function() {
  const obj = object('malloc$of$φ')
  obj.assets[LAMBDA] = function(self) {
    const rho = self.take(RHO);
    const identifier = heaps.malloc(
      Number(dataized(rho.take('size'), NUMBER))
    )
    let res;
    try {
      res = data.toObject(
        dataized(
          rho.take('scope').with({
            0: rho.take('allocated').with({
              id: data.toObject(identifier)
            })
          })
        )
      )
    } finally {
      heaps.free(identifier)
    }
    return res
  }
  return obj
}

module.exports = malloc$of$φ
