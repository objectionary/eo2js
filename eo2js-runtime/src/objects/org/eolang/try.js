const dataized = require('../../../runtime/dataized')
const object = require('../../../runtime/object')
const at_void = require('../../../runtime/attribute/at-void')
const {LAMBDA, RHO, DELTA} = require('../../../runtime/attribute/specials');
const ErError = require('../../../runtime/error/ErError');

/**
 * Try.
 * @return {Object} - Try object
 */
const _try = function() {
  const obj = object('try')
  obj.attrs['main'] = at_void('main')
  obj.attrs['catch'] = at_void('catch')
  obj.attrs['finally'] = at_void('finally')
  obj.assets[LAMBDA] = function(self) {
    let ret
    try {
      ret = self.take('main').copy().with({[RHO]: self})
      ret.assets[DELTA] = dataized(ret)
    } catch (error) {
      if (error instanceof ErError) {
        ret = self.take('catch').copy().with({
          [RHO]: self,
          0: error.enclosure
        })
      } else {
        throw error
      }
    } finally {
      dataized(self.take('finally').copy().with({[RHO]: self}))
    }
    return ret
  }
  return obj
}

module.exports = _try
