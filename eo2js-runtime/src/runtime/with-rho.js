const {RHO} = require('./attribute/specials');
const at_rho = require('./attribute/at-rho');
const with_rho = function(object, rho, name) {
  let obj = object
  if (name !== RHO && !object.attrs.hasOwnProperty(RHO)) {
    obj = obj.copy()
    obj.attrs[RHO] = at_rho(rho)
  }
  return obj
}

module.exports = with_rho
