const object = require('../../../../runtime/object')
const {LAMBDA} = require('../../../../runtime/attribute/specials');
const {STRING} = require('../../../../runtime/types');
const at_void = require('../../../../runtime/attribute/at-void');
const dataized = require('../../../../runtime/dataized');
const ErFailure = require('../../../../runtime/error/ErFailure');
const data = require('../../../../runtime/data')

/**
 * Percent sign.
 * @type {string}
 */
const PERCENT = '%'

/**
 * Object conversion.
 * @type {{
 *  s: (function(string): object),
 *  d: (function(string): object),
 *  f: (function(string): object)
 * }}
 */
const CONVERSION = {
  's': data.toObject,
  'd': function(str) {
    return data.toObject(Math.floor(Number(str)))
  },
  'f': function(str) {
    return data.toObject(Number(str))
  }
}

/**
 * Convert string to object depending on formatter.
 * @param {string} symbol - Format
 * @param {string} str - String to convert
 * @return {object} - Object from converted string
 */
const converted = function(symbol, str) {
  if (!Object.hasOwn(CONVERSION, symbol)) {
    throw new ErFailure(
      `The format %${symbol} is unsupported, only ${Object.keys(CONVERSION).join(', ')} formats can be used`
    )
  }
  return CONVERSION[symbol](str)
}

/**
 * Sscanf.
 * @return {Object} - Sscanf object
 */
const sscanf = function() {
  const obj = object('sscanf')
  obj.attrs['format'] = at_void('format')
  obj.attrs['read'] = at_void('read')
  obj.assets[LAMBDA] = function(self) {
    let format = dataized(self.take('format'), STRING)
    let literal = false
    let regex = ''
    for (let idx = 0; idx < format.length; ++idx) {
      const sym = format.charAt(idx)
      if (sym === PERCENT) {
        if (literal) {
          regex += PERCENT
          literal = false
        } else {
          literal = true
        }
      } else {
        if (literal) {
          switch (sym) {
            case 'd':
              regex += '(\\d+)'
              break
            case 'f':
              regex += '([+-]?\\\\d+(?:\\\\.\\\\d+)?)'
              break
            case 's':
              regex += '(\\S+)'
              break
            default:
              throw new ErFailure(
                `Unsupported format specifier: %${sym}`
              )
          }
          literal = false
        } else {
          regex += `\\Q${sym}\\E`
        }
      }
    }
    const output = []
    const pattern = new RegExp(regex)
    const read = dataized(self.take('read'), STRING)
    let next
    let idx
    const matched = pattern.exec(read)
    if (matched != null) {
      let index = 1
      while (true) {
        idx = format.indexOf(PERCENT)
        if (idx === -1) {
          break
        }
        next = format.charAt(idx + 1)
        if (next !== PERCENT) {
          output.push(converted(next, matched[index]))
          ++index
        }
        format = format.substring(idx + 2)
      }
    }
    return data.toTuple(output)
  }
  return obj
}

module.exports = sscanf
