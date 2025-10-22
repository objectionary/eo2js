// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const at_lambda = require('./at-lambda');
const at_once = require('./at-once');

/**
 * Simple attribute.
 * @param {object} object - Object to return
 * @return {Object} - Simple attribute
 */
const at_simple = function(object) {
  return at_once(
    at_lambda(
      this, (_) => object
    )
  )
}

module.exports = at_simple
