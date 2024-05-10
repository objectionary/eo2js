const validated = require('./validated');

/**
 * Object that catches {@link ErFailure} and
 * throws {@link ErError} in its 'take' and 'with' methods.
 * @param {Object} origin - Original object
 * @return {Object} - Safe object
 */
const safe = function(origin) {
  const take = origin.take
  const wth = origin.with
  origin.take = function(name) {
    return validated(() => take.call(origin, name))
  }
  origin.with = function(bindings) {
    return validated(() => wth.call(origin, bindings))
  }
  return origin
}

module.exports = safe
