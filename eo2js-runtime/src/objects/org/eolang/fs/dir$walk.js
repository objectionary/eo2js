// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const object = require('../../../../runtime/object')
const {LAMBDA} = require('../../../../runtime/attribute/specials');
const at_void = require('../../../../runtime/attribute/at-void');
const ErFailure = require('../../../../runtime/error/ErFailure');

/**
 * Dir.walk.
 * @return {Object} - Dir.walk object
 * @todo #3:30min Implement dir$walk atom. We need to implement the atom and make sure it
 *  works. For the details of implementation check the Java analogue on
 *  https://github.com/objectionary/eo/tree/master/eo-runtime/src/main/java/EOorg/EOeolang
 */
const dir$walk = function() {
  const obj = object('dir$walk')
  obj.attrs['glob'] = at_void('glob')
  obj.assets[LAMBDA] = function(_) {
    throw new ErFailure(
      `Atom dir$walk is not implemented yet`
    )
  }
  return obj
}

module.exports = dir$walk
