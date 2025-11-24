// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const assert = require('assert');
const validated = require('../../temp/runtime/validated');
const ErFailure = require('../../temp/runtime/error/ErFailure');
const ErError = require('../../temp/runtime/error/ErError');
const ErAbstract = require('../../temp/runtime/error/ErAbstract');

describe('validated', () => {
  it('should return result from given callback', () => {
    assert.equal(validated(() => 10), 10)
  })
  it('should throw ErError if catches ErFailure', () => {
    assert.throws(
      () => validated(() => {
        throw new ErFailure('some error')
      }),
      ErError
    )
  })
  it('should rethrow error if catches not ErFailure', () => {
    assert.throws(
      () => validated(() => {
        throw new ErAbstract('error')
      }),
      ErAbstract
    )
  })
})
