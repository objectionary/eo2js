// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const pckg = require('./package')
const {PHI, RHO, LAMBDA} = require('./attribute/specials')
const ErFailure = require('./error/ErFailure');

/**
 * Name of phi.
 * @type {string}
 */
const GLOBAL = 'Φ'

/**
 * The global scope object, which owns all other objects.
 * @type {any}
 */
const phi = {
  attrs: {},
  assets: {},
  with(_) {
    throw new ErFailure(`Can't put objects to the ${GLOBAL} object`)
  },
  take(name) {
    if ([PHI, RHO, LAMBDA].includes(name)) {
      throw new ErFailure(`Can't take ${name} attribute from ${GLOBAL} object`)
    }
    let object
    if (name === '') {
      object = def
    } else {
      object = def.take(name)
    }
    return object
  },
  copy() {
    return phi
  },
  toString() {
    return `${GLOBAL}`
  }
}

/**
 * Default empty package object.
 * @type {object}
 */
const def = pckg('', phi)

module.exports = phi
