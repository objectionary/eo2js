const path = require('path');
const fs = require('fs');
const mvnw = require('../mvnw/mvnw.js');
const {execSync} = require('child_process')
const {runSync} = require('../helpers');
const assert = require('assert');

/**
 * Excluded tests.
 * @todo #3:90min Clear the list of excluded tests. There are many runtime tests are excluded now
 *  because so many atoms are not implemented. We have to include the tests and make sure they work
 *  as we implement atoms.
 * @type {string[]}
 */
const exclude = [
  'as-phi-tests',
  'bool-tests',
  'bytes-tests',
  'cage-tests',
  'cti-test',
  'dataized-tests',
  'float-tests',
  'goto-tests',
  'int-tests',
  'malloc-tests',
  'nan-tests',
  'negative-infinity-tests',
  'positive-infinity-tests',
  'runtime-tests',
  'rust-tests',
  'seq-tests',
  'string-tests',
  'switch-tests',
  'try-tests',
  'tuple-tests',
  'while-tests'
].map((name) => `org/eolang/${name}.test.js`)

/**
 * Read all files from given directory.
 * @param {String} dir - Directory
 * @return {Array.<String>} - Files from the directory
 */
const allFilesFrom = function(dir) {
  const files = fs.readdirSync(dir, {withFileTypes: true});
  const res = []
  for (const file of files) {
    if (file.isDirectory()) {
      res.push(...allFilesFrom(path.join(dir, file.name)))
    } else {
      res.push(path.resolve(dir, file.name))
    }
  }
  return res
}

/**
 * This test downloads EO tests from objectionary/home repository, parses and assembles them using
 * eo-maven-plugin, transpiles and executes using eo2js.
 */
describe('runtime tests', function() {
  const home = path.resolve('temp/runtime-tests')
  const target = path.resolve(home, 'target')
  const project = path.resolve(target, 'project')
  const runtime = path.resolve('../eo2js-runtime')
  before('prepare environment', function() {
    fs.rmSync(home, {recursive: true, force: true})
    fs.mkdirSync(project, {recursive: true})
  })
  it('should execute all eo-runtime tests', function(done) {
    this.timeout(0)
    execSync([
      'git init',
      'git remote add origin https://github.com/objectionary/home.git',
      'git config core.sparseCheckout true',
      'echo tests/org/eolang > .git/info/sparse-checkout',
      'git pull origin master'
    ].join(' && '), {cwd: home})
    console.debug(`Downloaded:\n${
      allFilesFrom(path.resolve(home, 'tests', 'org', 'eolang'))
        .map((pth) => path.relative(home, pth))
        .join(', ')
    }`)
    console.debug(`\nExcluded:\n${exclude.join(', ')}`)
    mvnw(
      ['register', 'assemble', 'verify'],
      {home, sources: 'tests', target: 'target'}
    )
    const log = runSync([
      'test',
      '-t', target,
      '-p project -d', runtime,
      '--exclude', exclude.join(',')
    ])
    console.debug(log)
    assert.ok(!log.includes('failing'))
    done()
  })
})
