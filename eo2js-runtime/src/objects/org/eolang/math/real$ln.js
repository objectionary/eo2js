const object = require('../../../../runtime/object')
const {LAMBDA, RHO} = require('../../../../runtime/attribute/specials');
const data = require('../../../../runtime/data');
const {NUMBER} = require('../../../../runtime/types');
const dataized = require('../../../../runtime/dataized');

/**
 * Real.ln.
 * @return {Object} - Real.ln object
 */
const real$ln = function() {
  const obj = object('real$ln')
  obj.assets[LAMBDA] = function(self) {
    return data.toObject(
      Math.log(dataized(self.take(RHO), NUMBER))
    )
  }
  return obj
}

module.exports = real$ln
