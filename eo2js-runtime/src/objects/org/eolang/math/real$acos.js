const object = require('../../../../runtime/object')
const {LAMBDA, RHO} = require('../../../../runtime/attribute/specials');
const data = require('../../../../runtime/data');
const {NUMBER} = require('../../../../runtime/types');
const dataized = require('../../../../runtime/dataized');

/**
 * Real.acos.
 * @return {Object} - Real.acos object
 */
const real$acos = function() {
  const obj = object('real$acos')
  obj.assets[LAMBDA] = function(self) {
    return data.toObject(
      Math.acos(dataized(self.take(RHO), NUMBER))
    )
  }
  return obj
}

module.exports = real$acos
