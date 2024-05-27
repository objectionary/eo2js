const {RHO, LAMBDA, PHI} = require('./attribute/specials.js')
const ErFailure = require('./error/ErFailure');
const validated = require('./validated');
const safe = require('./safe');
const at_rho = require('./attribute/at-rho');
const with_rho = require('./with-rho');
const {DELTA} = require('./attribute/specials');

/**
 * Object.
 * @param {String} name - Name of the object
 * @return {object} Object
 */
const object = function(name = 'object') {
  return {
    /**
     * Attributes.
     */
    attrs: {},
    /**
     * Assets.
     */
    assets: {},
    /**
     * Copy itself.
     * @return {Object} - Copied object.
     */
    copy: function() {
      const copy = object(name)
      Object.keys(this.attrs)
        .forEach((key) => {
          copy.attrs[key] = this.attrs[key].copy(copy)
        })
      Object.keys(this.assets)
        .forEach((key) => {
          copy.assets[key] = this.assets[key]
        })
      return copy
    },
    /**
     * Set attributes or {@see DELTA} asset to the object.
     * @param {Object} bindings - Attribute bindings
     * @return {Object} - Self with attached attributes
     * @throws ErFailure - If something wrong with bindings
     */
    with: function(bindings) {
      const copy = this.copy()
      const attrs = Object.keys(copy.attrs)
      Object.keys(bindings).forEach((attr) => {
        const binding = bindings[attr]
        const pos = Number(attr)
        if (!isNaN(pos)) {
          if (pos < 0) {
            throw new ErFailure(`Can't put attribute by negative position (${pos})`)
          }
          if (!Number.isInteger(pos)) {
            throw new ErFailure(`Can't put attribute by float position (${pos})`)
          }
          const filtered = attrs.filter((at) => at !== RHO)
          const index = filtered.findIndex((_, index) => index === pos)
          if (index === -1) {
            throw new ErFailure(`There's no attribute with position ${pos}`)
          }
          attr = filtered[index]
        }
        if (attr === DELTA) {
          copy.assets[DELTA] = binding
        } else {
          if (!attrs.includes(attr)) {
            throw new ErFailure(`Attribute ${attr} is absent, can't put`)
          }
          copy.attrs[attr].put(binding)
        }
      })
      return copy
    },
    /**
     * Retrieve object by attribute/asset name
     * @param {String} name - Attribute/asset name
     * @return {Object} - Retrieved attribute/asset by name
     * @throws ErFailure - If something wrong with attribute/asset retrieving
     */
    take: function(name) {
      name = String(name)
      let object
      if (name === RHO && !this.attrs.hasOwnProperty(RHO)) {
        object = at_rho().get()
      } else if (name === LAMBDA) {
        if (this.attrs.hasOwnProperty(LAMBDA)) {
          throw new ErFailure(`${LAMBDA} can't be used as attribute, only as asset`)
        }
        if (!this.assets.hasOwnProperty(LAMBDA)) {
          throw new ErFailure(`Can't take ${LAMBDA} asset because it's absent`)
        }
        object = validated(
          () => safe(with_rho(this.assets[LAMBDA](this), this, name))
        )
      } else if (this.attrs.hasOwnProperty(name)) {
        object = validated(
          () => safe(with_rho(this.attrs[name].get(), this, name))
        )
      } else if (this.attrs.hasOwnProperty(PHI)) {
        object = this.take(PHI).take(name)
      } else if (this.assets.hasOwnProperty(LAMBDA)) {
        object = this.take(LAMBDA).take(name)
      } else {
        throw new ErFailure(`Can't find ${name} attribute`)
      }
      return object
    },
    /**
     * Retrieve data from the object
     * @return {Array.<Number>} - Data
     */
    data: function() {
      let data
      if (this.assets.hasOwnProperty(DELTA)) {
        data = this.assets[DELTA]
      } else if (this.assets.hasOwnProperty(LAMBDA)) {
        data = this.take(LAMBDA).data()
      } else if (this.attrs.hasOwnProperty(PHI)) {
        data = this.take(PHI).data()
      } else {
        throw new ErFailure(`There's no data in the object ${this.toString()}, can't take it`)
      }
      return data
    },
    /**
     * Print itself.
     * @return {String} - String representation of object
     */
    toString: function() {
      return `${name}`
    }
  }
}

module.exports = object
