const assert = require('assert');
const dir$walk = require('../../../../../src/objects/org/eolang/fs/dir$walk');
const {STRING} = require('../../../../../src/runtime/types');
const dataized = require('../../../../../src/runtime/dataized');
const data = require('../../../../../src/runtime/data');
const fs = require('fs');
const path = require('path');
const object = require('../../../../../src/runtime/object');
const {RHO} = require('../../../../../src/runtime/attribute/specials');

describe('dir$walk', function() {
  const directory = path.resolve(__dirname, '../test-dir');
  
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
    const dir = object('dir');
    dir.attrs['file'] = object('file');
    dir.attrs['file'].attrs['path'] = data.toObject(directory);
    const walk = dir$walk();
    walk.attrs[RHO] = dir;
    walk.attrs['glob'] = data.toObject('**/*.txt'); 
    const files = dataized(walk);
    const paths = files.map(file => dataized(file.take('path'), STRING));
    assert.deepEqual(
      paths.sort(),
      [
        'file1.txt',
        'subdir/file3.txt'
      ].sort()
    );
  });
});
