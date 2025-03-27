// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const object = require('../../../../runtime/object')
const {LAMBDA, RHO} = require('../../../../runtime/attribute/specials');
const {STRING} = require('../../../../runtime/types');
const fs = require('fs');
const dataized = require('../../../../runtime/dataized');
const data = require('../../../../runtime/data')

/**
 * File.is-directory.
 * @return {Object} - File.is-directory object
 */
const file$is_directory = function() {
  const obj = object('file$is_directory')
  obj.assets[LAMBDA] = function(self) {
    return data.toObject(
      fs.statSync(
        String(dataized(self.take(RHO).take('path'), STRING))
      ).isDirectory()
    )
  }
  return obj
}

module.exports = file$is_directory
