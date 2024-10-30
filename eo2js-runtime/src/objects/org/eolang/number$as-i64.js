const dataized = require('../../../runtime/dataized')
const object = require('../../../runtime/object')
const {NUMBER} = require('../../../runtime/types')
const {LAMBDA, RHO} = require('../../../runtime/attribute/specials')
const data = require('../../../runtime/data')
const phi = require('../../../runtime/phi');
const bytesOf = require('../../../runtime/bytes-of');

/**
 * Number.as-i64.
 * @return {any} - Number.as-i64 object
 */
const number$as_i64 = function() {
  const obj = object('number$as-i64')
  obj.assets[LAMBDA] = function(self) {
    return phi.take('org.eolang.i64').with({
      0: data.toObject(
        bytesOf.long(
          BigInt(Number(dataized(self.take(RHO), NUMBER)))
        ).asBytes()
      )
    })
  }
  return obj
}

module.exports = number$as_i64
