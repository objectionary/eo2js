const ErAbstract = require('./ErAbstract')

/**
 * Common error.
 */
class ErFailure extends ErAbstract {
  /**
   * Ctor.
   * @param {String} message - Message
   */
  constructor(message) {
    super(message);
    this.name = 'ErFailure'
  }
}

module.exports = ErFailure
