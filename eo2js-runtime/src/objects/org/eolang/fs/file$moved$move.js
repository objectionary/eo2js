const object = require('../../../../runtime/object')
const {LAMBDA, RHO} = require('../../../../runtime/attribute/specials');
const {STRING} = require('../../../../runtime/types');
const fs = require('fs');
const dataized = require('../../../../runtime/dataized');
const data = require('../../../../runtime/data')

/**
 * File.moved.move.
 * @return {Object} - File.moved.move object
 */
const file$moved$move = function() {
  const obj = object('file$moved$move')
  obj.assets[LAMBDA] = function(self) {
    const rho = self.take(RHO)
    const target = dataized(rho.take('target'), STRING)
    fs.renameSync(String(dataized(rho.take(RHO).take('path'), STRING)), String(target))
    return data.toObject(target)
  }
  return obj
}

module.exports = file$moved$move
