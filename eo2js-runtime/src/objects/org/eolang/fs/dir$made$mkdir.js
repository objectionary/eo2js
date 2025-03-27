// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const object = require('../../../../runtime/object')
const {LAMBDA, RHO} = require('../../../../runtime/attribute/specials');
const {STRING} = require('../../../../runtime/types');
const fs = require('fs');
const dataized = require('../../../../runtime/dataized');
const data = require('../../../../runtime/data')

/**
 * Dir.made.mkdir.
 * @return {Object} - Dir.made.mkdir object
 */
const dir$made$mkdir = function() {
  const obj = object('dir$made$mkdir')
  obj.assets[LAMBDA] = function(self) {
    fs.mkdirSync(
      String(dataized(self.take(RHO).take(RHO).take('file'), STRING)),
      {recursive: true}
    )
    return data.toObject(true)
  }
  return obj
}

module.exports = dir$made$mkdir
