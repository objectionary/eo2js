const object = require('../../../runtime/object')
const {LAMBDA, RHO} = require('../../../runtime/attribute/specials');
const at_void = require('../../../runtime/attribute/at-void');
const {NUMBER} = require('../../../runtime/types');
const heaps = require('../../../runtime/heaps');
const dataized = require('../../../runtime/dataized');
const data = require('../../../runtime/data')

/**
 * Malloc.of.allocated.write.
 * @return {Object} - Malloc.of.allocated.write object
 */
const malloc$of$allocated$write = function() {
  const obj = object('malloc$of$allocated$write')
  obj.attrs['offset'] = at_void('offset')
  obj.attrs['data'] = at_void('data')
  obj.assets[LAMBDA] = function(self) {
    heaps.write(
      dataized(self.take(RHO).take('id'), NUMBER),
      dataized(self.take('offset'), NUMBER),
      dataized(self.take('data'))
    )
    return data.toObject(true)
  }
  return obj
}

module.exports = malloc$of$allocated$write
