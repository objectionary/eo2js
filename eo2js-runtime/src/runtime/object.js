const {RHO, LAMBDA, PHI} = require('./attribute/specials.js')
const ErFailure = require('./error/ErFailure');
const validated = require('./validated');
const safe = require('./safe');
const at_rho = require('./attribute/at-rho');
const with_rho = require('./with-rho');
const {DELTA} = require('./attribute/specials');

/**
 * Filter object attributes function.
 * @param {string} key - Object key
 * @return {boolean} - If key isn't in default attributes set
 */
const noDefault = function(key) {
  return ![RHO].includes(key)
}

/**
 * Object.
 * @param {String} name - Name of the object
 * @return {object} Object
 */
const object = function(name = 'object') {
  const obj = {
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
     * @return {obj} - Self with attached attributes
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
          const filtered = attrs.filter(noDefault)
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
     * Retrieve object by attribute name or position.
     * @param {String} attr - Attribute name or position
     * @return {Object} - Retrieved attribute by name or position
     * @throws ErFailure - If something wrong with attribute retrieving
     */
    take: function(attr) {
      attr = String(attr)
      let object
      if (attr === RHO && !this.attrs.hasOwnProperty(RHO)) {
        object = at_rho().get()
      } else if (attr === LAMBDA) {
        if (this.attrs.hasOwnProperty(LAMBDA)) {
          throw new ErFailure(`${LAMBDA} can't be used as attribute, only as asset`)
        }
        if (!this.assets.hasOwnProperty(LAMBDA)) {
          throw new ErFailure(`Can't take ${LAMBDA} asset because it's absent`)
        }
        object = validated(
          () => safe(with_rho(this.assets[LAMBDA](this), this, attr))
        )
      } else if (this.attrs.hasOwnProperty(attr)) {
        object = validated(
          () => safe(with_rho(this.attrs[attr].get(), this, attr))
        )
      } else if (this.attrs.hasOwnProperty(PHI)) {
        object = this.take(PHI).take(attr)
      } else if (this.assets.hasOwnProperty(LAMBDA)) {
        object = this.take(LAMBDA).take(attr)
      } else {
        throw new ErFailure(`Can't find ${attr} attribute`)
      }
      return object
    },
    /**
     * Print itself.
     * @return {String} - String representation of object
     */
    toString: function() {
      return `${name}`
    }
  }
  return obj
}

module.exports = object
