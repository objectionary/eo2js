const object = require('../../../runtime/object')
const {LAMBDA, RHO} = require('../../../runtime/attribute/specials');
const dataized = require('../../../runtime/dataized');
const {NUMBER} = require('../../../runtime/types');
const {traced} = require('../../../runtime/traced');
const cages = require('../../../runtime/cages');

/**
 * Cage.encaged.φ.
 * @return {Object} - Cage.encaged.φ object
 */
const cage$encaged$φ = function() {
  const obj = object('cage$encaged$φ')
  obj.assets[LAMBDA] = function(self) {
    const locator = dataized(self.take(RHO).take('locator'), NUMBER)
    return traced(cages.get(locator), locator)
  }
  return obj
}

module.exports = cage$encaged$φ
