/**
 * Lazy object Proxy.
 * @param {function(): object} callback - Function that return. objects
 * @return {Object} - Object that evaluated lazily
 */
const lazy = function(callback) {
  return new Proxy(
    callback,
    {
      get: function(target, property, _) {
        return target()[property]
      },
      apply: function(target, thisArg, arguments) {
        return target().call(thisArg, ...arguments)
      }
    }
  )
}

module.exports = lazy
