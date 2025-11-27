// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const path = require('path');
const fs = require('fs');
const {runSync} = require('../helpers');
const assert = require('assert');

describe('dataize', () => {
  const home = path.resolve('temp/test-dataize')
  const target = path.resolve(home, 'target')
  const project = path.resolve(target, 'project')
  const runtime = path.resolve('../eo2js-runtime')
  beforeEach('clear home', () => {
    fs.rmSync(home, {recursive: true, force: true})
    fs.mkdirSync(project, {recursive: true})
  })
  it('should dataize app object', () => {
    runSync(['link', '-t', target, '-p project', '--alone', '-d', runtime])
    fs.copyFileSync(
      path.resolve('test/resources/dataize/app.js'),
      path.resolve(project, 'app.js')
    )
    const log = runSync([
      'dataize', 'app', '--alone', '-t', target, '-p project', '-d', runtime
    ])
    assert.ok(log.includes('= "Hello, world!"'))
  })
})
