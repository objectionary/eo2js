// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const dataized = require('../../../runtime/dataized')
const object = require('../../../runtime/object')
const at_void = require('../../../runtime/attribute/at-void')
const {LAMBDA} = require('../../../runtime/attribute/specials');
const data = require('../../../runtime/data');

/**
 * Try.
 * @return {Object} - Try object
 */
const tryObject = function() {
  const obj = object('try')
  obj.attrs.main = at_void('main')
  obj.attrs.catch = at_void('catch')
  obj.attrs.finally = at_void('finally')
  obj.assets[LAMBDA] = function(self) {
    let res
    try {
      res = dataized(self.take('main'))
    } catch (ex) {
      res = dataized(self.take('catch').with({0: ex.enclosure}))
    } finally {
      dataized(self.take('finally'))
    }
    return data.toObject(res)
  }
  return obj
}

module.exports = tryObject
