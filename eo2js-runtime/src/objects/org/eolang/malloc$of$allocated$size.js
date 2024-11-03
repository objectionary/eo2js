const object = require('../../../runtime/object')
const {LAMBDA, RHO} = require('../../../runtime/attribute/specials');
const {NUMBER} = require('../../../runtime/types');
const heaps = require('../../../runtime/heaps');
const dataized = require('../../../runtime/dataized');
const data = require('../../../runtime/data')

/**
 * Malloc.of.allocated.size.
 * @return {Object} - Malloc.of.allocated.size object
 */
const malloc$of$allocated$size = function() {
  const obj = object('malloc$of$allocated$size')
  obj.assets[LAMBDA] = function(self) {
    return data.toObject(
      heaps.size(
        dataized(self.take(RHO).take('id'), NUMBER)
      )
    )
  }
  return obj
}

module.exports = malloc$of$allocated$size
