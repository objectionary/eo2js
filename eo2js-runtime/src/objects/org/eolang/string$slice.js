const object = require('../../../runtime/object')
const {LAMBDA, RHO} = require('../../../runtime/attribute/specials');
const at_void = require('../../../runtime/attribute/at-void');
const dataized = require('../../../runtime/dataized');
const {INT, data, STRING} = require('../../../runtime/data');

/**
 * String.slice.
 * @return {Object} - String.slice object
 */
const string$slice = function() {
  const obj = object('string$slice')
  obj.attrs['start'] = at_void('start')
  obj.attrs['len'] = at_void('len')
  obj.assets[LAMBDA] = function(self) {
    const start = dataized(self.take('start'), INT)
    return data.toObject(
      dataized(self.take(RHO), STRING).slice(start, start + dataized(self.take('len'), INT))
    )
  }
  return obj
}

module.exports = string$slice
