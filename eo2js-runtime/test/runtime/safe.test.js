// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const safe = require('../../temp/runtime/safe');
const ErFailure = require('../../temp/runtime/error/ErFailure');
const assert = require('assert');
const ErError = require('../../temp/runtime/error/ErError');

describe('safe', () => {
  it('should validate #with() and #take() methods', () => {
    const obj = safe({
      take(_) {
        throw new ErFailure('take')
      },
      with(_) {
        throw new ErFailure('with')
      }
    })
    assert.throws(() => obj.take('x'), ErError)
    assert.throws(() => obj.with({}), ErError)
  })
})
