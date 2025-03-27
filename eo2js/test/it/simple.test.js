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
    {home, sources: 'src/eo', target: 'target'}
  )
}

describe('integration test', function() {
  const home = path.resolve('temp/it-test')
  const target = path.resolve(home, 'target')
  const project = path.resolve(target, 'project')
  const runtime = path.resolve('../eo2js-runtime')
  this.timeout(1000000)
  before('recompile stylesheets', async function() {
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
  it('should execute simple unit test', function(done) {
    const log = runSync(['test', '-t', target, '-p project -d', runtime])
    assert.ok(log.includes('test "story_is_not_empty" should work'))
    done()
  })
  it('should dataize simple program', function(done) {
    const log = runSync(['dataize program -t', target, '-p project -d', runtime])
    assert.ok(log.includes('Hello, Jeff'))
    done()
  })
})
