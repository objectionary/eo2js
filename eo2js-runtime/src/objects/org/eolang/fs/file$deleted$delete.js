// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const object = require('../../../../runtime/object')
const {LAMBDA, RHO} = require('../../../../runtime/attribute/specials');
const {STRING} = require('../../../../runtime/types');
const fs = require('fs');
const dataized = require('../../../../runtime/dataized');
const data = require('../../../../runtime/data')

/**
 * File.deleted.delete.
 * @return {Object} - File.deleted.delete object
 */
const file$deleted$delete = function() {
  const obj = object('file$deleted$delete')
  obj.assets[LAMBDA] = function(self) {
    fs.rmSync(
      String(dataized(self.take(RHO).take(RHO).take('path'), STRING)),
      {recursive: true}
    )
    return data.toObject(true)
  }
  return obj
}

module.exports = file$deleted$delete
