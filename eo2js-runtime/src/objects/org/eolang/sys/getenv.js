const object = require('../../../../runtime/object')
const {LAMBDA} = require('../../../../runtime/attribute/specials');
const {STRING} = require('../../../../runtime/types');
const at_void = require('../../../../runtime/attribute/at-void');
const dataized = require('../../../../runtime/dataized');
const data = require('../../../../runtime/data')

/**
 * Getenv.
 * @return {Object} - Getenv object
 */
const getenv = function() {
  const obj = object('getenv')
  obj.attrs['name'] = at_void('name')
  obj.assets[LAMBDA] = function(self) {
    return data.toObject(
      process.env[dataized(self.take('name'), STRING)]
    )
  }
  return obj
}

module.exports = getenv
