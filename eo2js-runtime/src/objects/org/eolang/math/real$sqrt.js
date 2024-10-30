const object = require('../../../../runtime/object')
const {LAMBDA, RHO} = require('../../../../runtime/attribute/specials');
const data = require('../../../../runtime/data');
const {NUMBER} = require('../../../../runtime/types');
const dataized = require('../../../../runtime/dataized');

/**
 * Real.sqrt.
 * @return {Object} - Real.sqrt object
 */
const real$sqrt = function() {
  const obj = object('real$sqrt')
  obj.assets[LAMBDA] = function(self) {
    return data.toObject(
      Math.sqrt(dataized(self.take(RHO), NUMBER))
    )
  }
  return obj
}

module.exports = real$sqrt
