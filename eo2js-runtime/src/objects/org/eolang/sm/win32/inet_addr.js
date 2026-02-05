// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const data = require('../../../../../runtime/data')
const ErFailure = require('../../../../../runtime/error/ErFailure')

/**
 * inet_addr WS2_32 function call.
 * Converts an IP address string to its integer representation.
 * @param {Object} win - Win32 object
 * @param {Object} args - Arguments object with 'at' and 'length' properties
 * @param {Function} getArg - Function to get argument by index
 * @param {number} length - Number of arguments
 * @return {Object} - Result object with IP as integer
 */
const inet_addr = function(win, args, getArg, length) {
  if (length < 1) {
    throw new ErFailure(
      'inet_addr requires 1 argument (IP address string)'
    )
  }
  const ipString = getArg(0)
  // Validate IP address format (simplified IPv4 validation)
  const ipRegex = /^(?<first>\d{1,3})\.(?<second>\d{1,3})\.(?<third>\d{1,3})\.(?<fourth>\d{1,3})$/
  const match = String(ipString).match(ipRegex)
  if (!match) {
    throw new ErFailure(
      `Invalid IP address format: '${ipString}'`
    )
  }
  const octets = ['first', 'second', 'third', 'fourth'].map(
    (key) => parseInt(match.groups[key], 10)
  )
  // Check each octet is 0-255
  for (let i = 0; i < 4; i++) {
    const octet = octets[i]
    if (octet > 255) {
      throw new ErFailure(
        `Invalid IP address: octet ${octet} is greater than 255`
      )
    }
  }
  // Return IP as integer (standard inet_addr behavior)
  const ipInt = (((octets[0] * 256) + octets[1]) * 256 + octets[2]) * 256 + octets[3]
  return data.toObject(ipInt)
}

module.exports = inet_addr
