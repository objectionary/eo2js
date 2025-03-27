// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const once = require('./once');

/**
 * Lazily taken attribute from the object.
 * @param {Object} object - Object to take attribute from
 * @param {String} attribute - Attribute name to take
 * @return {Object} - Lazily taking attribute
 */
const taken = function(object, attribute) {
  return once(
    function() {
      return object.take(attribute)
    }
  )
}

module.exports = taken
