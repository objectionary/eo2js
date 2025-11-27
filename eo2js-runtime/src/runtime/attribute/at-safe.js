// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const validated = require('../validated');
const safe = require('../safe');
const at_term = require('./at-term');

/**
 * Attribute that catches {@link ErFailure} and throws {@link ErError}.
 * @param {object} origin - Original attribute
 * @return {Object} - Attribute
 */
const at_safe = function(origin) {
  return at_term({
    put(object) {
      origin.put(object)
    },
    get() {
      return validated(() => safe(origin.get()))
    },
    copy(rho) {
      return at_safe(origin.copy(rho))
    }
  })
}

module.exports = at_safe
