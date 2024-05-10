const ErFailure = require('../error/ErFailure');
const {RHO} = require('./specials');
/**
 * Attribute that keeps \rho attribute.
 * @param {Object} [object] - Rho object
 * @return {Object} - Rho attribute
 */
const at_rho = function(object = null) {
  let rho = object
  return {
    put: function(obj) {
      if (rho == null) {
        rho = obj
      }
    },
    get: function() {
      if (rho === null) {
        throw new ErFailure(`Attribute ${RHO} is not set, can't #get()`)
      }
      return rho
    },
    copy: function(_) {
      return at_rho(rho)
    }
  }
}

module.exports = at_rho
