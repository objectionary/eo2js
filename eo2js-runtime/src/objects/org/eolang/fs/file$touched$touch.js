// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const object = require('../../../../runtime/object')
const {LAMBDA, RHO} = require('../../../../runtime/attribute/specials');
const {STRING} = require('../../../../runtime/types');
const fs = require('fs');
const dataized = require('../../../../runtime/dataized');
const data = require('../../../../runtime/data')

/**
 * File.touched.touch.
 * @return {Object} - File.touched.touch object
 */
const file$touched$touch = function() {
  const obj = object('file$touched$touch')
  obj.assets[LAMBDA] = function(self) {
    fs.appendFileSync(
      String(dataized(self.take(RHO).take(RHO).take('path'), STRING)), ''
    )
    return data.toObject(true)
  }
  return obj
}

module.exports = file$touched$touch
