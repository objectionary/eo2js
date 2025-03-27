// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

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
