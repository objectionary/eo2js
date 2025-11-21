// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const fs = require('fs');
const path = require('path');
const mvnw = require('../mvnw/mvnw.js');
const {runSync} = require('../helpers');
const compileStylesheets = require('../../src/compile-stylesheets');
const assert = require('assert');

/**
 * Prepare sources.
 * @param {String} home - Home directory
 * @return {Promise<Array<String>|String>} - Maven promise
 */
const prepare = function(home) {
  return mvnw(
    ['register', 'assemble', 'lint'],
    {home, sources: 'src/eo', target: 'target', easy: true}
  )
}

/**
 * Integration test for simple EO program execution and dataization
 *
 * @todo #162:30min Re-enable and fix integration tests
 *  Current Status: DISABLED - Runtime failures in both test cases
 *  - Test environment setup works correctly
 *  - Project compilation succeeds
 *  - Test case 'should execute simple unit test' fails with:
 *    ErFailure: You can't override λ expression in stringν11
 *  - Test case 'should dataize simple program' fails with:
 *    ErFailure: You can't override λ expression in stringν19
 *  Context:
 *  - EO version when test was disabled: 0.49.0
 *  - Current EO version can be found in: test/mvnw/eo-version.txt
 *  Prerequisites for Fix:
 *  1. Unit tests must pass via test command
 *  2. Program dataization must work via dataize command
 *  3. If using EO version > 0.57.0, update test source file logic:
 *     - Versions 0.57.1+ use new unit test syntax
 *     - See: "Inconsistent Syntax for Unit Test Attributes in Codebase"
 *       https://github.com/objectionary/eo/issues/4096
 *  Investigation Needed:
 *  - Determine root cause of λ expression override errors
 *  - Verify compatibility between EO runtime and eo2js transpiler
 */
describe.skip('integration test', function() {
  const home = path.resolve('temp/it-test')
  const target = path.resolve(home, 'target')
  const project = path.resolve(target, 'project')
  const runtime = path.resolve('../eo2js-runtime')
  this.timeout(1000000)
  before('recompile stylesheets', async () => {
    compileStylesheets()
    fs.rmSync(home, {recursive: true, force: true})
    fs.mkdirSync(project, {recursive: true})
    fs.cpSync(
      'test/it/eo',
      path.resolve(home, 'src/eo'),
      {recursive: true}
    )
    await prepare(home)
  })
  it('should execute simple unit test', (done) => {
    const log = runSync(['test', '-t', target, '-p project -d', runtime])
    assert.ok(log.includes('test "story_is_not_empty" should work'))
    done()
  })
  it('should dataize simple program', (done) => {
    const log = runSync(['dataize program -t', target, '-p project -d', runtime])
    assert.ok(log.includes('Hello, Jeff'))
    done()
  })
})
