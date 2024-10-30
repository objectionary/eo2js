const dataized = require('../../../runtime/dataized')
const object = require('../../../runtime/object')
const {NUMBER} = require('../../../runtime/types')
const {LAMBDA, RHO} = require('../../../runtime/attribute/specials')
const data = require('../../../runtime/data')

/**
 * Number.floor.
 * @return {any} - Number.floor object
 */
const number$floor = function() {
  const obj = object('number$floor')
  obj.assets[LAMBDA] = function(self) {
    return data.toObject(
      Math.floor(dataized(self.take(RHO), NUMBER))
    )
  }
  return obj
}

module.exports = number$floor
