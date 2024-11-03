const dataized = require('../../../runtime/dataized')
const object = require('../../../runtime/object')
const {NUMBER} = require('../../../runtime/types')
const {LAMBDA, RHO} = require('../../../runtime/attribute/specials')
const at_void = require('../../../runtime/attribute/at-void')
const data = require('../../../runtime/data')

/**
 * Number.div.
 * @return {any} - Number.div object
 */
const number$div = function() {
  const obj = object('number$div')
  obj.attrs['x'] = at_void('x')
  obj.assets[LAMBDA] = function(self) {
    return data.toObject(
      dataized(self.take(RHO), NUMBER) / dataized(self.take('x'), NUMBER)
    )
  }
  return obj
}

module.exports = number$div
