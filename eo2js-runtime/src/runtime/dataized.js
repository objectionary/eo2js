// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const {NUMBER, BOOL, BYTES, STRING, INT, LONG, SHORT} = require('./types')
const bytesOf = require('./bytes-of');
const ErFailure = require('./error/ErFailure');

/**
 * Dataized.
 * @param {object} object - Object to dataize
 * @param {string} [type] - Type to cast to
 * @return {string|number|BigInt|boolean|array.<number>} - Data
 */
const dataized = function(object, type= BYTES) {
  const bytes = bytesOf.bytes(object.data())
  let data
  if (type === NUMBER) {
    data = bytes.asNumber()
  } else if (type === INT) {
    data = bytes.asNumber(INT)
  } else if (type === LONG) {
    data = bytes.asNumber(LONG)
  } else if (type === SHORT) {
    data = bytes.asNumber(SHORT)
  } else if (type === BOOL) {
    data = bytes.asBool()
  } else if (type === STRING) {
    data = bytes.asString()
  } else if (type === BYTES) {
    data = bytes.asBytes()
  } else {
    throw new ErFailure(`Can't dataize to the given type (${type}),
    only ${NUMBER}, ${LONG}, ${INT}, ${SHORT} ${BOOL}, ${STRING}, ${BYTES} are allowed`)
  }
  return data
}

module.exports = dataized
