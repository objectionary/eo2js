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
  with: function(_) {
    throw new ErFailure(`Can't put objects to the ${GLOBAL} object`)
  },
  take: function(name) {
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
  copy: function() {
    return phi
  },
  toString: function() {
    return `${GLOBAL}`
  }
}

/**
 * Default empty package object.
 * @type {object}
 */
const def = pckg('', phi)

module.exports = phi
