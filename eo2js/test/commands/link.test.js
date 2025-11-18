// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const {runSync, assertFilesExist} = require('../helpers')
const path = require('path');
const fs = require('fs');
const assert = require('assert');

describe('link', function() {
  const home = path.resolve('temp/test-link')
  const target = path.resolve(home, 'target')
  const project = path.resolve(target, 'project')
  beforeEach('clear home', function() {
    fs.rmSync(home, {recursive: true, force: true})
    fs.mkdirSync(project, {recursive: true})
  })
  /**
   * Run "link" command.
   * @param {String} [args] - Arguments
   * @return {String} - Stdout.
   */
  const link = function(...args) {
    return runSync([
      'link',
      '-t', target,
      '-p project',
      '--alone',
      '-d', path.resolve('../eo2js-runtime'),
      ...args
    ])
  }
  it('should create all necessary files and install npm project', function(done) {
    assertFilesExist(link(), project, [
      'package.json',
      'package-lock.json',
      'node_modules/eo2js-runtime',
      '__main__.js'
    ])
    done()
  })
  it('should add test dependency', function(done) {
    assertFilesExist(link('--tests'), project, ['node_modules/mocha'])
    done()
  })
  it('should not reinstall npm packages if package-lock.json exists', function(done) {
    link()
    const lockFilePath = path.resolve(project, 'package-lock.json')
    const initialMtime = fs.statSync(lockFilePath).mtime
    link()
    const finalMtime = fs.statSync(lockFilePath).mtime
    assert.strictEqual(initialMtime.getTime(), finalMtime.getTime(), 'package-lock.json was modified on second run')
    done()
  })
})
