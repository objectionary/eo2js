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
 *
 * @todo #162:30min Re-enable and fix runtime tests
 *  Current Status: DISABLED - Runtime failures
 *  - Test starts successfully and downloads required files
 *  - Project builds correctly
 *  - Fails at runtime with exception:
 *    ErFailure: You can't override λ expression in stringν11
 *  Context:
 *  - EO version when test was disabled: 0.49.0
 *  - Current EO version can be found in: test/mvnw/eo-version.txt
 *  Prerequisites for Fix:
 *  1. Compiled tests must execute successfully via test command
 *  2. If using EO version > 0.57.0, update test source file logic:
 *     - Versions 0.57.1+ use new unit test syntax
 *     - See: "Inconsistent Syntax for Unit Test Attributes in Codebase"
 *       https://github.com/objectionary/eo/issues/4096
 *  Investigation Needed:
 *  - Determine root cause of λ expression override errors
 *  - Verify compatibility between EO runtime and eo2js transpiler
 */
describe.skip('runtime tests', function() {
  this.timeout(0)
  const home = path.resolve('temp/runtime-tests')
  const target = path.resolve(home, 'target')
  const project = path.resolve(target, 'project')
  const runtime = path.resolve('../eo2js-runtime')
  const tag = fs.readFileSync(path.resolve('test/mvnw/eo-version.txt')).toString().trim()
  before('prepare environment', async () => {
    if (COMPILE) {
      fs.rmSync(home, {recursive: true, force: true})
      fs.mkdirSync(project, {recursive: true})
      execSync([
        'git init',
        'git remote add origin https://github.com/objectionary/home.git',
        'git config core.sparseCheckout true',
        'echo tests/org/eolang > .git/info/sparse-checkout',
        `git fetch origin tag ${tag} --no-tags`,
        `git checkout ${tag}`
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
      await mvnw('lint', {...opts, easy: true})
    }
  })
  it('should execute all eo-runtime tests', (done) => {
    if (!COMPILE) {
      runSync(['link -t', target, '-p project --tests --alone -d', runtime])
    }
    const args = [
      'test',
      '-t', target,
      '-p project -d', runtime,
      '--exclude', exclude.join(',')
    ]
    if (!COMPILE) {
      args.push('--alone')
    }
    const log = runSync(args)
    console.debug(log)
    assert.ok(!log.includes('failing'))
    done()
  })
})
