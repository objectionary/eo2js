// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const fs = require('fs')
const path = require('path')
const object = require('./object')
const {LAMBDA, RHO} = require('./attribute/specials')
const at_simple = require('./attribute/at-simple')
const ErFailure = require('./error/ErFailure');
const at_rho = require('./attribute/at-rho');
const with_rho = require('./with-rho');

/**
 * Try to find an object by given directory and FQN.
 * Context "this" should be set to the object {@link pckg}.
 * @param {String} dir - Relative directory where object may be placed
 * @param {String} name - Name of the current object
 * @param {array.<String>} fqn - Parts of FQN of the object. E.g. ['org', 'eolang', 'int']
 * @return {Object|null} - Found object or null
 */
const tryFind = function(dir, name, fqn) {
  let obj = null
  const pth = path.resolve(__dirname, dir, ...fqn)
  if (fs.existsSync(pth)) {
    this.attrs[name] = at_simple(pckg(name, this))
    obj = this.take(name)
  } else {
    const file = `${pth}.js`
    if (fs.existsSync(file)) {
      this.attrs[name] = at_simple(with_rho(require(file)(), this, name))
      obj = this.take(name)
    }
  }
  return obj
}

/**
 * Found object.
 * Tries to find object in local directory. If there's no luck, checks if
 * we're in the "node_modules" directory (which means, that eo2js-runtime is used as
 * dependency). If so - tries to find object in main project directory.
 * Context "this" should be set to the object {@link pckg}.
 * @param {String} name - Name of the object
 * @param {String} full - FQN of the object
 * @return {Object} - Found object
 */
const found = function(name, full) {
  const split = full.split('.')
  let obj = tryFind.call(this, '../objects', name, split)
  if (obj === null && __dirname.includes('node_modules')) {
    obj = tryFind.call(this, '../../../..', name, split)
  }
  if (obj === null) {
    throw new Error(`Couldn't find object '${name}' from '${full}'`)
  }
  return obj
}

/**
 * Package object.
 * @param {String} fqn - FQN of package object
 * @param {object} rho - Rho
 * @return {object} - Package object
 */
const pckg = function(fqn, rho) {
  const obj = object(`Package '${fqn}'`)
  obj.attrs[RHO] = at_rho(rho)
  obj.assets[LAMBDA] = function(self) {
    if (fqn !== '') {
      const rho = self.take(RHO)
      return `${rho.assets[LAMBDA](rho)}.${fqn}`
    }
    return fqn
  }
  obj.with = function(_) {
    throw new ErFailure(`Can't put object to Package object '${fqn}'`)
  }
  obj.take = function(name) {
    let obj
    if (this.attrs.hasOwnProperty(name)) {
      obj = this.attrs[name].get()
    } else if (name.includes('.')) {
      const split = name.split('.')
      let next = this.take(split[0])
      for (let i = 1; i < split.length; ++i) {
        next = next.take(split[i])
      }
      obj = next
    } else {
      const before = this.assets[LAMBDA](this)
      const full = before === '' ? name : `${before.substring(1)}.${name}`
      obj = found.call(this, name, full)
    }
    return obj
  }
  obj.copy = function() {
    return this
  }
  return obj
}

module.exports = pckg
