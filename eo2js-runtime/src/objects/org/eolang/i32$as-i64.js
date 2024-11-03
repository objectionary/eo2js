const dataized = require('../../../runtime/dataized')
const object = require('../../../runtime/object')
const {INT} = require('../../../runtime/types')
const {LAMBDA, RHO} = require('../../../runtime/attribute/specials')
const data = require('../../../runtime/data')
const phi = require('../../../runtime/phi');
const bytesOf = require('../../../runtime/bytes-of');

/**
 * The i32.as-i64.
 * @return {any} - The i32.as-i64 object
 */
const i32$as_i64 = function() {
  const obj = object('i32$as-i64')
  obj.assets[LAMBDA] = function(self) {
    return phi.take('org.eolang.i64').with({
      0: data.toObject(
        bytesOf.long(
          dataized(self.take(RHO), INT)
        ).asBytes()
      )
    })
  }
  return obj
}

module.exports = i32$as_i64
