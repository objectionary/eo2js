// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const ErFailure = require('../error/ErFailure');
const {RHO} = require('./specials');
const at_term = require('./at-term');

/**
 * Attribute that keeps \rho.
 * @param {Object} [object] - Rho object
 * @return {Object} - Rho attribute
 */
const at_rho = function(object = null) {
  let rho = object
  return at_term({
    put(obj) {
      if (rho == null) {
        rho = obj
      }
    },
    get() {
      if (rho === null) {
        throw new ErFailure(`Attribute ${RHO} is not set, can't #get()`)
      }
      return rho
    },
    copy(_) {
      return at_rho(rho)
    }
  })
}

module.exports = at_rho
