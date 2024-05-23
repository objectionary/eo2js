const path = require('path');
const fs = require('fs');
const {runSync} = require('../helpers');
const assert = require('assert');

describe('test', function() {
  const home = path.resolve('temp/test-test')
  const target = path.resolve(home, 'target')
  const project = path.resolve(target, 'project')
  const runtime = path.resolve('../eo2js-runtime')
  before('prepare-environment', function(done) {
    this.timeout(0)
    fs.rmSync(home, {recursive: true, force: true})
    fs.mkdirSync(project, {recursive: true})
    runSync(['link', '-t', target, '-p project', '--alone', '-d', runtime, '--tests'])
    fs.copyFileSync(
      path.resolve('test/resources/test/simple-test.test.js'),
      path.resolve(project, 'simple-test.test.js')
    )
    fs.copyFileSync(
      path.resolve('test/resources/test/second-test.test.js'),
      path.resolve(project, 'second-test.test.js')
    )
    done()
  })
  it('should execute unit tests', function(done) {
    const log = runSync(['test', '--alone', '-t', target, '-p project'])
    assert.ok(log.includes('2 passing'))
    done()
  })
  it('should exclude unit test', function(done) {
    const log = runSync(['test', '--alone -t', target, '-p project --exclude simple-test.test.js'])
    assert.ok(log.includes('1 passing'))
    done()
  });
})
