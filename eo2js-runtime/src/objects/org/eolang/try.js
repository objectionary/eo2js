const dataized = require('../../../runtime/dataized')
const object = require('../../../runtime/object')
const at_void = require('../../../runtime/attribute/at-void')
const {LAMBDA, DELTA} = require('../../../runtime/attribute/specials');
const ErError = require('../../../runtime/error/ErError');

/**
 * Try.
 * @return {Object} - Try object
 * @todo #3:30min Fix implementation of "try" atom. Current implementation of "try" atom is wrong
 *  because "try" dataizes its body right inside lambda asset. Instead lambda asset should return
 *  new special object that dataizes body and catches exception when some attribute is taken from
 *  it. For the details of implementation check the Java analogue on:
 *  https://github.com/objectionary/eo/tree/master/eo-runtime/src/main/java/EOorg/EOeolang
 */
const _try = function() {
  const obj = object('try')
  obj.attrs['main'] = at_void('main')
  obj.attrs['catch'] = at_void('catch')
  obj.attrs['finally'] = at_void('finally')
  obj.assets[LAMBDA] = function(self) {
    let ret
    try {
      ret = self.take('main')
      ret.assets[DELTA] = dataized(ret)
    } catch (error) {
      if (error instanceof ErError) {
        ret = self.take('catch').with({
          0: error.enclosure
        })
      } else {
        throw error
      }
    } finally {
      dataized(self.take('finally'))
    }
    return ret
  }
  return obj
}

module.exports = _try
