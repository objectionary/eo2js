// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const object = require('../../../../runtime/object')
const {LAMBDA} = require('../../../../runtime/attribute/specials');
const ErFailure = require('../../../../runtime/error/ErFailure');

/**
 * File.open.file-stream.read.read-bytes.
 * @return {Object} - File.open.file-stream.read.read-bytes object
 * @todo #3:30min Implement file$open$file_stream$read$read_bytes atom.
 *  We need to implement the atom and make sure it
 *  works. For the details of implementation check the Java analogue on
 *  https://github.com/objectionary/eo/tree/master/eo-runtime/src/main/java/EOorg/EOeolang
 */
const file$open$file_stream$read$read_bytes = function() {
  const obj = object('file$open$file_stream$read$read_bytes')
  obj.assets[LAMBDA] = function(_) {
    throw new ErFailure(
      `Atom file$open$file_stream$read$read_bytes is not implemented yet`
    )
  }
  return obj
}

module.exports = file$open$file_stream$read$read_bytes
