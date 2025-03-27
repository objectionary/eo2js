// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const {RHO} = require('./attribute/specials');
const at_rho = require('./attribute/at-rho');

/**
 * Set rho attribute to the object if it does not have one.
 * @param {Object} object - Object to set rho attribute to
 * @param {Object} rho - Rho object
 * @param {String} name - Name of the object as attribute
 * @return {Object} The same object if it already has rho attribute or new copy of the object with injected rho
 */
const with_rho = function(object, rho, name) {
  let obj = object
  if (name !== RHO && !object.attrs.hasOwnProperty(RHO)) {
    obj = obj.copy()
    obj.attrs[RHO] = at_rho(rho)
  }
  return obj
}

module.exports = with_rho
