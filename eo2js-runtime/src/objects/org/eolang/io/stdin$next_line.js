const object = require('../../../../runtime/object')
const {LAMBDA} = require('../../../../runtime/attribute/specials');
const ErFailure = require('../../../../runtime/error/ErFailure');

/**
 * Stdin.next_line.
 * @return {Object} - Stdin.next_line object
 */
const stdin$next_line = function() {
  const obj = object('stdin$next_line')
  obj.assets[LAMBDA] = function(_) {
    throw new ErFailure(
      `Atom stdin$next_line is not implemented yet`
    )
  }
  return obj
}

module.exports = stdin$next_line
