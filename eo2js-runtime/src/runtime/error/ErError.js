const ErAbstract = require('./ErAbstract');
const dataized = require('../dataized');
const {DELTA} = require('../attribute/specials');
const bytesOf = require('../bytes-of');

/**
 * This Error is thrown by the {@see error} object only.
 */
class ErError extends ErAbstract {
  /**
   * Ctor.
   * @param {Object} enclosure - Enclosure inside the error
   */
  constructor(enclosure) {
    super(ErError.safeMessage(enclosure))
    this.name = 'ErError'
    this.enclosure = enclosure
  }

  /**
   * Retrieve message from enclosure safely.
   * @param {Object} enclosure - Enclosure inside the error
   * @return {string}
   */
  static safeMessage(enclosure) {
    let result
    try {
      result = `${enclosure.toString()}(${DELTA} = ${bytesOf.bytes(dataized(enclosure)).verbose()})`
    } catch (ex) {
      result = enclosure.toString();
    }
    return result
  }
}

module.exports = ErError
