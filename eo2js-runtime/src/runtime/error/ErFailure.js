// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

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
