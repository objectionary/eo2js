// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const object = require('../../../../runtime/object')
const {LAMBDA, RHO} = require('../../../../runtime/attribute/specials');
const {STRING} = require('../../../../runtime/types');
const dataized = require('../../../../runtime/dataized');
const ErFailure = require('../../../../runtime/error/ErFailure');
const data = require('../../../../runtime/data')

/**
 * Regex.compiled.
 * @return {Object} - Regex.compiled object
 */
const regex$compiled = function() {
  const obj = object('regex$compiled')
  obj.assets[LAMBDA] = function(self) {
    const regex = self.take(RHO)
    let pattern = ''
    const expression = dataized(regex.take('expression'), STRING)
    if (!expression.startsWith('/')) {
      throw new ErFailure(
        'Wrong regex syntax: "/" is missing'
      )
    }
    const last = expression.lastIndexOf('/')
    if (!expression.endsWith('/')) {
      pattern += `(?${  expression.substring(last + 1)  })`
    }
    pattern += expression.substring(1, last)
    return regex.take('pattern').with({
      'serialized': data.toObject(pattern)
    })
  }
  return obj
}

module.exports = regex$compiled
