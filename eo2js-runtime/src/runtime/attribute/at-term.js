// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

/**
 * Attribute as φTerm.
 * @param {Object} origin - Original attribute
 * @return {Object} - Attribute with default φTerm
 */
const at_term = function(origin) {
  return {
    ...origin,
    φTerm() {
      return origin.get().φTerm()
    }
  }
}

module.exports = at_term
