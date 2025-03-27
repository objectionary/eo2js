// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const object = require('../../../../runtime/object')
const {LAMBDA, RHO} = require('../../../../runtime/attribute/specials');
const {STRING} = require('../../../../runtime/types');
const fs = require('fs');
const dataized = require('../../../../runtime/dataized');
const data = require('../../../../runtime/data')

/**
 * File.size.
 * @return {Object} - File.size object
 */
const file$size = function() {
  const obj = object('file$size')
  obj.assets[LAMBDA] = function(self) {
    fs.statSync('file.txt')
    return data.toObject(
      fs.statSync(
        String(dataized(self.take(RHO).take('path'), STRING))
      ).size
    )
  }
  return obj
}

module.exports = file$size
