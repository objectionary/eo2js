/**
 * Lazy object Proxy.
 * Allows to get object lazily from {@code target} function and take property/call method from it.
 * @type {{apply: (function(function(): object, any, array.<any>): any), get: (function(function(): Object, String, any): any)}}
 */
const lazy = {
  get: function(target, property, _) {
    return target()[property]
  },
  apply: function(target, thisArg, arguments) {
    return target().call(thisArg, ...arguments)
  }
}

module.exports = lazy
