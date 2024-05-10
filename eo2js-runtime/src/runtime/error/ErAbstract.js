/**
 * Abstract error.
 */
class ErAbstract extends Error {
  /**
   * Ctor.
   * @param {String} message - Cause.
   */
  constructor(message) {
    super(message)
    this.name = 'ErAbstract'
  }
}

module.exports = ErAbstract
