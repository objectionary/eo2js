const path = require('path');
const fs = require('fs');
const {ok} = require('assert');

describe('dataize', function() {
  const home = path.resolve('temp/test-dataize')
  const target = path.resolve(home, 'target')
  const project = path.resolve(target, 'project')
  beforeEach('clear home', function() {
    fs.rmSync(home, {recursive: true, force: true})
    fs.mkdirSync(project, {recursive: true})
  })
  it('should execute node run', function() {
    ok(true) // todo
  })
})
