// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const ErFailure = require('../error/ErFailure');
const {EMPTY} = require('./specials');

/**
 * Void attribute.
 * @param {string} name - Name of the attribute
 * @param {Object} object - Object
 * @return {Object} - Free attribute
 */
const at_void = function(name, object = null) {
  let obj = object
  return {
    put(object) {
      if (obj !== null) {
        throw new ErFailure(`Void attribute '${name}' is already set, can't reset`)
      }
      obj = object
    },
    get() {
      if (obj === null) {
        throw new ErFailure(`Void attribute '${name}' is not set, can't take`)
      }
      return obj
    },
    copy(_) {
      return at_void(name, obj)
    },
    φTerm() {
      let term
      if (obj === null) {
        term = EMPTY
      } else {
        term = obj.φTerm()
      }
      return term
    }
  }
}

module.exports = at_void
