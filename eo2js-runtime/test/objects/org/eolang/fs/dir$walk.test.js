const assert = require('assert');
const dir$walk = require('../../../../../temp/objects/org/eolang/fs/dir$walk');
const {STRING} = require('../../../../../temp/runtime/types');
const dataized = require('../../../../../temp/runtime/dataized');
const at_string = require('../../../../../temp/runtime/attribute/at-string');
const fs = require('fs');
const path = require('path');

describe('dir$walk', function() {
  const testDir = path.resolve(__dirname, '../../../../../temp/test-dir');
  
  beforeEach(function() {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, {recursive: true});
    }
    fs.mkdirSync(testDir, {recursive: true});
    fs.writeFileSync(path.join(testDir, 'file1.txt'), '');
    fs.writeFileSync(path.join(testDir, 'file2.js'), '');
    fs.mkdirSync(path.join(testDir, 'subdir'));
    fs.writeFileSync(path.join(testDir, 'subdir/file3.txt'), '');
  });

  afterEach(function() {
    fs.rmSync(testDir, {recursive: true});
  });

  it('should find files matching glob pattern', function() {
    const walk = dir$walk();
    walk.attrs['glob'] = at_string(path.join(testDir, '**/*.txt'));
    const result = dataized(walk, STRING).split('\n').sort();
    assert.deepEqual(
      result,
      [
        path.join(testDir, 'file1.txt'),
        path.join(testDir, 'subdir/file3.txt')
      ].sort()
    );
  });
});
