const at_lambda = require('./at-lambda');
/**
 * Simple attribute.
 * @param {object} object - Object ot return
 * @return {any} - Simple attribute
 */
const at_simple = function(object) {
  return at_lambda(
    this, (_) => object
  )
}

module.exports = at_simple
