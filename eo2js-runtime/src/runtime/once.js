const lazy = require('./lazy');

/**
 * Evaluate object lazily only once.
 * @param {function(): object} callback - Function to evaluate
 * @return {Object} - Lazily evaluated object
 */
const once = function(callback) {
  let cached = null
  return new Proxy(
    function() {
      if (cached == null) {
        cached = callback()
      }
      return cached
    },
    lazy
  )
}

module.exports = once
