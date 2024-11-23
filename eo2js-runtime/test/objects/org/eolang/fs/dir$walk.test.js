const assert = require('assert');
const dir$walk = require('../../../../../temp/objects/org/eolang/fs/dir$walk');
const {STRING} = require('../../../../../temp/runtime/types');
const dataized = require('../../../../../temp/runtime/dataized');
const data = require('../../../../../temp/runtime/data');
const fs = require('fs');
const path = require('path');

describe('dir$walk', function() {
  const directory = path.resolve(__dirname, '../../../../../temp/test-dir');
  
  beforeEach(function() {
    if (fs.existsSync(directory)) {
      fs.rmSync(directory, {recursive: true});
    }
    fs.mkdirSync(directory, {recursive: true});
    fs.writeFileSync(path.join(directory, 'file1.txt'), '');
    fs.writeFileSync(path.join(directory, 'file2.js'), '');
    fs.mkdirSync(path.join(directory, 'subdir'));
    fs.writeFileSync(path.join(directory, 'subdir/file3.txt'), '');
  });

  afterEach(function() {
    fs.rmSync(directory, {recursive: true});
  });

  it('should find files matching glob pattern', function() {
    const walk = dir$walk();
    walk.attrs['glob'] = data.toObject('**/*.txt');
    const result = dataized(walk, STRING).split('\n').sort();
    assert.deepEqual(
      result,
      [
        'file1.txt',
        'subdir/file3.txt'
      ].sort()
    );
  });
});
