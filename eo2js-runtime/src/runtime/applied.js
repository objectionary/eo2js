// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const once = require('./once');

/**
 * Object with applied bindings lazily.
 * @param {Object} object - Object to apply bindings to
 * @param {Object} bindings - Bindings to apply
 * @return {Object} - Object with applied bindings
 */
const applied = function(object, bindings) {
  return once(
    function() {
      return object.with(bindings)
    }
  )
}

module.exports = applied
