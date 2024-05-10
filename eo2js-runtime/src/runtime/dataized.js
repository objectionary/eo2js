const {DELTA} = require('./attribute/specials.js')
const {LAMBDA, PHI} = require('./attribute/specials')
const {INT, FLOAT, BOOL, BYTES, STRING} = require('./data')
const bytesOf = require('./bytes-of');
const ErFailure = require('./error/ErFailure');

/**
 * Dataized.
 * @param {object} object - Object to dataize
 * @param {string} [type] - Type to cast to
 * @return {string|number|boolean|array.<number>} - Data
 */
const dataized = function(object, type) {
  while (!object.assets.hasOwnProperty(DELTA)) {
    if (object.assets.hasOwnProperty(LAMBDA)) {
      object = object.take(LAMBDA)
    } else if (object.attrs.hasOwnProperty(PHI)) {
      object = object.take(PHI)
    } else {
      throw new ErFailure(`Can't dataize, asset ${DELTA} is absent`)
    }
  }
  let data = object.assets[DELTA]
  const bytes = bytesOf(data)
  if (type !== undefined) {
    if (type === INT) {
      data = bytes.asInt()
    } else if (type === FLOAT) {
      data = bytes.asFloat()
    } else if (type === BOOL) {
      data = bytes.asBool()
    } else if (type === STRING) {
      data = bytes.asString()
    } else if (type === BYTES) {
      data = bytes.asBytes()
    } else {
      throw new ErFailure(`Can't dataize to the given type (${type}), 
      only ${INT}, ${FLOAT}, ${BOOL}, ${STRING}, ${BYTES} are allowed`)
    }
  } else if (Array.isArray(data)) {
    data = bytes.asBytes()
  }
  return data
}

module.exports = dataized
