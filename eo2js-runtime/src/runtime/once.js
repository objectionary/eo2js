const lazy = require('./lazy');

/**
 * Evaluate object lazily only once.
 * @param {function(): object} callback - Function to evaluate
 * @return {Object} - Lazily evaluated object
 */
const once = function(callback) {
  let cached = null
  return lazy(
    function() {
      if (cached == null) {
        cached = callback()
      }
      return cached
    }
  )
}

module.exports = once
