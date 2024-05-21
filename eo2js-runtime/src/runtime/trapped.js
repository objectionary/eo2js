/**
 * Trap for an object.
 * @param {function(): object} callback - Function that returns object
 * @return {Object} - Object that evaluated lazily
 */
const trapped = function(callback) {
  return new Proxy(
    callback,
    {
      get: function(target, property, _) {
        return target()[property]
      }
    }
  )
}

module.exports = trapped
