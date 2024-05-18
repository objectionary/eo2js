const ErAbstract = require('./ErAbstract');
const dataized = require('../dataized');
const data = require('../data');

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
    return dataized(enclosure, data.STRING)
  }
}

module.exports = ErError
