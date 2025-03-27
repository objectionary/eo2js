// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

/**
 * Evaluate object lazily only once.
 * @param {function(): object} callback - Function to evaluate
 * @return {Object} - Lazily evaluated object
 */
const once = function(callback) {
  let cached = null
  return new Proxy(
    callback,
    {
      get: function(target, property, _) {
        if (cached === null) {
          cached = target()
        }
        return cached[property]
      }
    }
  )
}

module.exports = once
