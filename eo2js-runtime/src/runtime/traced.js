// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const trapped = require('./trapped');
const ErFailure = require('./error/ErFailure');

/**
 * Max possible depth of cage recursion
 * @type {number}
 * @todo #61:30min Find a way to set this parameter dynamically via command line options. This
 *  parameter is used to limit cage self recursion. It would be better to be able to set it via
 *  command line options and environment variables.
 */
const RECURSION_THRESHOLD = 100

/**
 * Cages that are currently being dataized. If one cage is being datazed, and
 * it needs to be dataized inside current dataization, the locator of current object be here.
 * @type {{}}
 */
const DATAIZING_CAGES = {}

/**
 * Increment counter of cage in the {@link DATAIZING_CAGES}.
 * @param {Number} locator - Locator of the cage
 * @param {Number} depth - Depth of cage recursion
 */
const increment = function(locator, depth) {
  const exists = DATAIZING_CAGES.hasOwnProperty(locator)
  DATAIZING_CAGES[locator] = exists ? DATAIZING_CAGES[locator] + 1 : 1
  if (DATAIZING_CAGES[locator] > depth) {
    throw new ErFailure(
      `The cage with locator ${locator} has reached the maximum nesting depth = ${depth}`
    )
  }
}

/**
 * Decrement counter of cage in the {@link DATAIZING_CAGES}.
 * @param {Number} locator - Locator of the cage
 */
const decrement = function(locator) {
  if (DATAIZING_CAGES.hasOwnProperty(locator)) {
    const count = DATAIZING_CAGES[locator] - 1
    if (count === 0) {
      delete DATAIZING_CAGES[locator]
    } else {
      DATAIZING_CAGES[locator] = count
    }
  }
}

/**
 * Object that traces if the "cage.new" got into recursion during the dataization.
 * @param {Object} object - Encaged object
 * @param {Number} locator - Locator of the object
 * @param {Number} depth - Max depth of cage recursion
 * @return {Object}
 */
const traced = function(object, locator, depth = RECURSION_THRESHOLD) {
  return trapped(
    object,
    (_, target, thisArg, args) => {
      increment(locator, depth)
      const ret = target.call(thisArg, ...args)
      decrement(locator)
      return ret
    }
  )
}

module.exports = {
  traced,
  RECURSION_THRESHOLD
}
