const dataized = require('../../../runtime/dataized')
const object = require('../../../runtime/object')
const {LONG} = require('../../../runtime/types')
const {LAMBDA, RHO} = require('../../../runtime/attribute/specials')
const at_void = require('../../../runtime/attribute/at-void')
const data = require('../../../runtime/data')
const phi = require('../../../runtime/phi');
const bytesOf = require('../../../runtime/bytes-of');

/**
 * The i64.times.
 * @return {any} - The i64.times object
 */
const i64$times = function() {
  const obj = object('i64$times')
  obj.attrs['x'] = at_void('x')
  obj.assets[LAMBDA] = function(self) {
    return phi.take('org.eolang.i64').with({
      0: data.toObject(
        bytesOf.long(
          BigInt(
            dataized(self.take(RHO), LONG) * dataized(self.take('x').take('as-i64'), LONG)
          )
        ).asBytes()
      )
    })
  }
  return obj
}

module.exports = i64$times
