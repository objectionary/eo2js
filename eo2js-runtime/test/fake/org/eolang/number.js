// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

/**
 * Fake number EO object that is used for the test purposes.
 * Don't change the file until you definitely know what you're doing.
 * For more information please read README.md in test/fake folder
 * @return {Object} - Object
 */
const number = function() {
  const object = require('../../../runtime/object')
  const attr = require('../../../runtime/attribute/attr')
  const plus = require('../../../objects/org/eolang/number$plus')
  const {PHI} = require('../../../runtime/attribute/specials')
  const obj = object('float')
  obj.attrs['as-bytes'] = attr.void('as-bytes')
  obj.attrs[PHI] = attr.once(attr.lambda(obj, (rho) => rho.take('as-bytes')))
  obj.attrs.plus = attr.simple(plus())
  return obj
}

module.exports = number
