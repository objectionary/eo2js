const validated = require('../validated');
const safe = require('../safe');

/**
 * Attribute that catches {@link ErFailure} and throws {@link ErError}.
 * @param {object} origin - Original attribute
 * @return {Object} - Attribute
 */
const at_safe = function(origin) {
  return {
    put: function(object) {
      return origin.put(object)
    },
    get: function() {
      return validated(() => safe(origin.get()))
    },
    copy: function(rho) {
      return at_safe(origin.copy(rho))
    }
  }
}

module.exports = at_safe
