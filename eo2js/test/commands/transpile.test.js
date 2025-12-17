// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const assert = require('assert');
const path = require('path');
const fs = require('fs');
const {pack, runSync, assertFilesExist} = require('../helpers');
const compileStylesheets = require('../../src/compile-stylesheets');

/**
 * This variable is used to run only specified test packs.
 * Just insert the names of the test pack, e.g. 'abstracts-to-objects',
 * and they will be executed. It's helpful when you're introducing new test pack
 * and don't want to wait until all other packs are executed.
 * Don't forget to clear the array before push!
 * @type {string[]}
 */
const only = []
const home = path.resolve('temp/test-transpile')

describe('transpile', () => {
  before('compile stylesheets', () => {
    compileStylesheets()
    fs.rmSync(home, {recursive: true, force: true})
    fs.mkdirSync(home, {recursive: true})
  })
  describe('command', () => {
    const target = path.resolve(home, 'target')
    beforeEach(() => {
      fs.rmSync(target, {recursive: true, force: true})
      fs.mkdirSync(target)
    })
    /**
     * Run transpile command with verbose output.
     * @param {{[name]: String, [prepare]: Boolean}} opts - Options
     * @return {String} - Output
     */
    const transpile = function(opts= {}) {
      opts.name ||= 'simple'
      if (typeof opts.prepare === 'undefined') {
        opts.prepare = true
      }
      if (opts.prepare) {
        const linted = path.resolve(target, `3-lint/com/eo2js/${opts.name}.xmir`)
        const foreign = [{
          id: `com.eo2js.${opts.name}`,
          linted
        }]
        fs.writeFileSync(path.resolve(target, 'eo-foreign.json'), JSON.stringify(foreign))
        fs.mkdirSync(path.resolve(target, '3-lint/com/eo2js'), {recursive: true})
        fs.copyFileSync(path.resolve(`test/resources/transpile/${opts.name}.xmir`), linted)
      }
      return runSync([
        'transpile',
        '--verbose',
        '-t', target,
      ])
    }
    it('should fail if eo-foreign is not found', () => {
      assert.throws(() => runSync(['transpile', '-t', target], false))
    })
    it('should fail if eo-foreign file is not .json', () => {
      const foreign = 'eo-foreign.csv'
      fs.writeFileSync(path.resolve(target, foreign), 'some data')
      assert.throws(() => runSync(['transpile', '-t', target, '-f', foreign], false))
    })
    it('should create transpiled XMIRs', () => {
      const traspiled = '8-transpile/com/eo2js/simple.xmir'
      assertFilesExist(transpile(), target, [traspiled])
      assert.ok(fs.readFileSync(path.resolve(target, traspiled)).toString().includes('<javascript'))
    })
    it('should generate JS files', () => {
      assertFilesExist(transpile(), target, ['project/com/eo2js/simple.js'])
    });
    ['simple-test', 'alone-test'].forEach((name) => {
      it(`should generate test JS file for ${name}`, () => {
        assertFilesExist(transpile({name}), target, [`project/com/eo2js/${name}.test.js`])
      })
    })
    it('should skip transpilation if source was not modified', () => {
      transpile()
      const transpiled = path.resolve(target, '8-transpile/com/eo2js/simple.xmir')
      const first = fs.statSync(transpiled).mtime
      transpile({prepare: false})
      const second = fs.statSync(transpiled).mtime
      assert.equal(first.getTime(), second.getTime())
    })
    it('should retranspile if source was modified', async () => {
      transpile()
      const transpiled = path.resolve(target, '8-transpile/com/eo2js/simple.xmir')
      const source = path.resolve(target, '3-lint/com/eo2js/simple.xmir')
      const first = fs.statSync(transpiled).mtime
      await new Promise((resolve) => setTimeout(resolve, 1000))
      fs.writeFileSync(source, fs.readFileSync(source))
      transpile({prepare: false})
      const second = fs.statSync(transpiled).mtime
      assert.notEqual(first.getTime(), second.getTime())
    })
  })

  /**
   * Tests transformation packs from '../resources/transpile/packs' directory
   *
   * @todo #155:30min Re-enable skipped transformation pack tests for EO 0.59.0
   *  Current Status: ALL TRANSFORMATION PACKS SKIPPED - EO 0.59.0 compatibility issues
   *  - All test packs are disabled via "skip": true flag
   *  - Tests passed successfully with previous EO version: 0.44.0
   *  - Tests fail with current EO version: 0.59.0
   *  Reason for Skipping (EO 0.59.0 breaking changes):
   *  - Atoms now require +rt meta (atom-without-rt lint error)
   *  - All EO files require +package, +home, +version, +spdx metas
   *  - File name must match object name (validate-object-name)
   *  - Comments must appear after metas, not before
   *  - New atom syntax: [] > name ? instead of [] > name /atom
   *  Context:
   *  - EO version when tests were disabled: 0.49.0, updated to 0.59.0
   *  - Current EO version: see test/mvnw/eo-version.txt
   *  Fix Required:
   *  1. Update test pack EO code to comply with EO 0.59.0 linting rules
   *  2. Add all mandatory metas (+package, +home, +version, +spdx)
   *  3. Rename test files to match object names
   *  4. Update atom declarations to use new ? syntax with +rt meta
   *  Prerequisites for Fix:
   *  - All skipped tests must pass with current EO version
   */
  describe('transformation packs', async () => {
    const packs = path.resolve(__dirname, '../resources/transpile/packs')
    await Promise.all(fs.readdirSync(packs)
      .filter((test) => only.length === 0 || only.includes(test.substring(0, test.lastIndexOf('.json'))))
      .forEach((test) => {
        it(test, async function() {
          const folder = path.resolve(home, 'packs', test.substring(0, test.lastIndexOf('.json')))
          if (fs.existsSync(folder)) {
            fs.rmSync(folder, {recursive: true})
          }
          const json = JSON.parse(fs.readFileSync(path.resolve(packs, test)).toString())
          await pack({home: folder, sources: 'src', target: 'target', json, easy: true}).then((res) => {
            if (res.skip) {
              this.skip()
            } else {
              assert.equal(
                res.failures.length,
                0,
                `Result XMIR:\n ${res.xmir}\nJSON: ${JSON.stringify(res.json, null, 2)}\nFailed tests: ${res.failures.join(';\n')}`
              )
            }
          })
        })
      }))
  })
})
