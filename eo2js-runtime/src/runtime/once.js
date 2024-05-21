const trapped = require('./trapped');

/**
 * Evaluate object lazily only once.
 * @param {function(): object} callback - Function to evaluate
 * @return {Object} - Lazily evaluated object
 */
const once = function(callback) {
  let cached = null
  return trapped(
    function() {
      if (cached == null) {
        cached = callback()
      }
      return cached
    }
  )
}

module.exports = once
