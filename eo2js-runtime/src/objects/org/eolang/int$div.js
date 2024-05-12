const dataized = require('../../../runtime/dataized')
const object = require('../../../runtime/object')
const data = require('../../../runtime/data')
const {INT} = require('../../../runtime/data')
const {LAMBDA, RHO} = require('../../../runtime/attribute/specials')
const at_void = require('../../../runtime/attribute/at-void')

/**
 * Int.div.
 * @return {any} - Int.div object
 */
const int$div = function() {
  const obj = object('int$div')
  obj.attrs['x'] = at_void('x')
  obj.assets[LAMBDA] = function(self) {
    const arg = dataized(self.take('x'), INT)
    if (arg === 0) {
      // fix: error
    }
    return data.toObject(
      dataized(self.take(RHO), INT) / arg
    )
  }
  return obj
}

module.exports = int$div
