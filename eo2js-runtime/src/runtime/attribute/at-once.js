// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

/**
 * Attribute that caches result after get.
 * Resets cache on copying.
 * @param {object} origin - Original attribute
 * @return {Object} - Attribute
 */
const at_once = function(origin) {
  const cache = {
    object: null,
    term: null
  }
  return {
    put(object) {
      origin.put(object)
    },
    get() {
      if (cache.object === null) {
        cache.object = origin.get()
      }
      return cache.object
    },
    copy(rho) {
      return at_once(origin.copy(rho))
    },
    φTerm() {
      if (cache.term === null) {
        cache.term = origin.φTerm()
      }
      return cache.term
    }
  }
}

module.exports = at_once
