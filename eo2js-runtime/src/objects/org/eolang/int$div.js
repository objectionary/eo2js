const dataized = require('../../../runtime/dataized')
const object = require('../../../runtime/object')
const {data, INT} = require('../../../runtime/data')
const {LAMBDA, RHO} = require('../../../runtime/attribute/specials')
const at_void = require('../../../runtime/attribute/at-void')

/**
 * Int.div.
 * @return {any} - Int.div object
 * @todo #3:30min Resolve division by 0 in int$div atom. The implementation of the atom is not
 *  complete because of the case with division by 0. We need to implement it and make sure it works.
 *  For the details of implementation check the Java analogue on
 *  https://github.com/objectionary/eo/tree/master/eo-runtime/src/main/java/EOorg/EOeolang
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
