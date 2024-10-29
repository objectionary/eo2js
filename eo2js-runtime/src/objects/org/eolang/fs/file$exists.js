const object = require('../../../../runtime/object')
const {LAMBDA, RHO} = require('../../../../runtime/attribute/specials');
const {STRING} = require('../../../../runtime/types');
const fs = require('fs');
const dataized = require('../../../../runtime/dataized');
const data = require('../../../../runtime/data')

/**
 * File.exists.
 * @return {Object} - File.exists object
 */
const file$exists = function() {
  const obj = object('file$exists')
  obj.assets[LAMBDA] = function(self) {
    return data.toObject(
      fs.existsSync(
        String(dataized(self.take(RHO).take('path'), STRING))
      )
    )
  }
  return obj
}

module.exports = file$exists
