const fs = require('fs');
const path = require('path');
const mvnw = require('../mvnw/mvnw.js');
const {runSync} = require('../helpers');
const compileStylesheets = require('../../src/compile-stylesheets');
const assert = require('assert');

describe('integration test', function() {
  const home = path.resolve('temp/it-test')
  const target = path.resolve(home, 'target')
  const project = path.resolve(target, 'project')
  const runtime = path.resolve('../eo2js-runtime')
  this.timeout(100000)
  before('recompile stylesheets', function() {
    compileStylesheets()
    fs.rmSync(home, {recursive: true, force: true})
    fs.mkdirSync(project, {recursive: true})
    fs.cpSync(
      'test/it/eo',
      path.resolve(home, 'src/eo'),
      {recursive: true}
    )
    mvnw(
      ['register', 'assemble', 'verify'],
      {home, sources: 'src/eo', target: 'target'}
    )
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
