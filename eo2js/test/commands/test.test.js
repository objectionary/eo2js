const path = require('path');
const fs = require('fs');
const {runSync} = require('../helpers');
const assert = require('assert');

describe('test', function() {
  const home = path.resolve('temp/test-test')
  const target = path.resolve(home, 'target')
  const project = path.resolve(target, 'project')
  const runtime = path.resolve('../eo2js-runtime')
  beforeEach('clear home', function() {
    fs.rmSync(home, {recursive: true, force: true})
    fs.mkdirSync(project, {recursive: true})
  })
  it('should execute unit test', function() {
    runSync(['link', '-t', target, '-p project', '--alone', '-d', runtime])
    fs.copyFileSync(
      path.resolve('test/resources/test/simple-test.test.js'),
      path.resolve(project, 'simple-test.test.js')
    )
    const log = runSync([
      'test', '--alone', '-t', target, '-p project'
    ])
    assert.ok(log.includes('1 passing'))
  })
})
