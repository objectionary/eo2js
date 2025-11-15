// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const path = require('path')
const fs = require('fs')
const mvnw = require('../mvnw/mvnw.js')
const {execSync} = require('child_process')
const {runSync} = require('../helpers')
const assert = require('assert')

/**
 * Excluded tests.
 * @todo #3:90min Clear the list of excluded tests. There are many runtime tests are excluded now
 *  because so many atoms are not implemented or implemented with errors.
 *  We have to include the tests and make sure they work as we implement atoms.
 * @type {string[]}
 */
const exclude = [
  'fs/dir-tests',
  'fs/file-tests',
  'fs/tmpdir-tests',
  'i16-tests',
  'i32-tests',
  'i64-tests',
  'math/integral-tests',
  'math/random-tests',
  'math/real-tests',
  'structs/list-tests',
  'sys/posix-tests',
  'sys/win32-tests',
  'txt/regex-tests',
  'txt/sprintf-tests',
  'txt/sscanf-tests',
  'txt/text-tests',
].map((name) => `org/eolang/${name}.test.js`)

/**
 * Read all files from given directory.
 * @param {String} dir - Directory
 * @return {Array.<String>} - Files from the directory
 */
const allFilesFrom = function(dir) {
  const files = fs.readdirSync(dir, {withFileTypes: true})
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
 * This variable allows to skip downloading sources and compilation by eo-maven-plugin if it was
 * done before. It's useful when you need to run runtime tests multiple times.
 * Don't forget to set it to TRUE before push!
 * @type {boolean}
 */
const COMPILE = true

/**
 * This test downloads EO tests from objectionary/home repository, parses and assembles them using
 * eo-maven-plugin, transpiles and executes using eo2js.
 */
describe('runtime tests', function() {
  this.timeout(0)
  const home = path.resolve('temp/runtime-tests')
  const target = path.resolve(home, 'target')
  const project = path.resolve(target, 'project')
  const runtime = path.resolve('../eo2js-runtime')
  before('prepare environment', async function() {
    if (COMPILE) {
      fs.rmSync(home, {recursive: true, force: true})
      fs.mkdirSync(project, {recursive: true})
      execSync([
        'git init',
        'git remote add origin https://github.com/objectionary/home.git',
        'git config core.sparseCheckout true',
        'echo tests/org/eolang > .git/info/sparse-checkout',
        'git pull origin master'
      ].join(' && '), {cwd: home})
      const testsDir = path.resolve(home, 'tests', 'org', 'eolang')
      if (fs.existsSync(testsDir)) {
        console.debug(`Downloaded:\n${
          allFilesFrom(testsDir)
            .map((pth) => `- ${path.relative(home, pth)}`)
            .join('\n')
        }`)
      }
      console.debug(`\nExcluded:\n${exclude.map((pth) => `- ${pth}`).join('\n')}`)
      const opts = {home, sources: 'tests', target: 'target'}
      await mvnw('register', opts)
      await mvnw('assemble', opts)
      await mvnw('lint', opts)
    }
  })
  it('should execute all eo-runtime tests', function(done) {
    if (!COMPILE) {
      runSync(['link -t', target, '-p project --tests --alone -d', runtime])
    }
    const log = runSync([
      'test',
      '-t', target,
      '-p project -d', runtime,
      !COMPILE ? '--alone' : '',
      '--exclude', exclude.join(',')
    ])
    console.debug(log)
    assert.ok(!log.includes('failing'))
    done()
  })
})
