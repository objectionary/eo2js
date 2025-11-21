// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const object = require('../../../../runtime/object')
const {LAMBDA, RHO} = require('../../../../runtime/attribute/specials');
const at_void = require('../../../../runtime/attribute/at-void');
const {STRING, NUMBER} = require('../../../../runtime/types');
const dataized = require('../../../../runtime/dataized');
const data = require('../../../../runtime/data')

/**
 * Regex.pattern.match.matched-from-index.
 * @return {Object} - Regex.pattern.match.matched-from-index object
 */
const regex$pattern$match$matched_from_index = function() {
  const obj = object('regex$pattern$match$matched-from-index')
  obj.attrs.position = at_void('position')
  obj.attrs.start = at_void('start')
  obj.assets[LAMBDA] = function(self) {
    const position = self.take('position')
    const match = self.take(RHO)
    const regex = new RegExp(match.take(RHO).take('serialized'))
    const text = dataized(match.take('txt'), STRING)
    const start = self.take('start')
    const from = dataized(start, NUMBER)
    let current = 1
    let matched
    let result
    while ((matched = regex.exec(text)) !== null) {
      if (current !== from) {
        ++current
        continue
      }
      result = match.take('matched').with({
        position,
        start,
        'from': data.toObject(matched.index),
        'to': data.toObject(regex.lastIndex),
        'groups': data.toTuple(
          matched.map((group) => data.toObject(group))
        )
      })
      break
    }
    if (result === undefined) {
      result = match.take('not-matched').with({
        position
      })
    }
    return result
  }
  return obj
}

module.exports = regex$pattern$match$matched_from_index
