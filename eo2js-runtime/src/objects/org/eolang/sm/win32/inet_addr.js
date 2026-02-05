// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const dataized = require('../../../../../runtime/dataized')
const {STRING} = require('../../../../../runtime/types')
const ErFailure = require('../../../../../runtime/error/ErFailure')
const makeReturn = require('./return')

/**
 * inet_addr WS2_32 function call.
 * Converts an IP address string to its integer representation.
 * @param {Object} win - Win32 object
 * @param {Object[]} params - Function parameters
 * @return {Object} - Result object with IP as integer
 */
const inet_addr = function(win, params) {
  if (params.length < 1) {
    throw new ErFailure(
      'inet_addr requires 1 argument (IP address string)'
    )
  }
  const ipString = dataized(params[0], STRING)
  const ipRegex = /^(?<first>\d{1,3})\.(?<second>\d{1,3})\.(?<third>\d{1,3})\.(?<fourth>\d{1,3})$/
  const match = String(ipString).match(ipRegex)
  if (!match) {
    return makeReturn(win, -1)
  }
  const octets = ['first', 'second', 'third', 'fourth'].map(
    (key) => parseInt(match.groups[key], 10)
  )
  for (let i = 0; i < 4; i += 1) {
    const octet = octets[i]
    if (octet > 255) {
      return makeReturn(win, -1)
    }
  }
  const ipInt = (((octets[3] * 256) + octets[2]) * 256 + octets[1]) * 256 + octets[0]
  return makeReturn(win, ipInt)
}

module.exports = inet_addr
