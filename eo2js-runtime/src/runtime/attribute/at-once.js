/**
 * Attribute that caches result after get.
 * Resets cache on copying.
 * @param {object} origin - Original attribute
 * @return {Object} - Attribute
 */
const at_once = function(origin) {
  let cache = null
  return {
    put: function(object) {
      origin.put(object)
    },
    get: function() {
      if (cache == null) {
        cache = origin.get()
      }
      return cache
    },
    copy: function(rho) {
      return at_once(origin.copy(rho))
    }
  }
}

module.exports = at_once
