// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const object = require('../../../../runtime/object')
const {LAMBDA} = require('../../../../runtime/attribute/specials');
const ErFailure = require('../../../../runtime/error/ErFailure');

/**
 * Posix.φ.
 * @return {Object} - Posix.φ object
 * @todo #3:30min Implement posix$φ atom. We need to implement the atom and make sure it
 *  works. For the details of implementation check the Java analogue on
 *  https://github.com/objectionary/eo/tree/master/eo-runtime/src/main/java/EOorg/EOeolang
 */
const posix$φ = function() {
  const obj = object('posix$φ')
  obj.assets[LAMBDA] = function(_) {
    throw new ErFailure(
      `Atom posix$φ is not implemented yet`
    )
  }
  return obj
}

module.exports = posix$φ
