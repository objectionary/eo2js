// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const validated = require('./validated');
const trapped = require('./trapped');

/**
 * Object that catches {@link ErFailure} and
 * throws {@link ErError} in its 'take' and 'with' methods.
 * @param {Object} origin - Original object
 * @return {Object} - Safe object
 */
const safe = function(origin) {
  return trapped(
    origin,
    function(_, target, thisArg, args) {
      return validated(() => target.call(origin, ...args))
    }
  )
}

module.exports = safe
