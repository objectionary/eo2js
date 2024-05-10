const fs = require('fs');
const path = require('path');

/**
 * Temporary directory.
 * @type {string}
 */
const temp = 'temp'

/**
 * Resolve temporary directory for the tests.
 */
const resolveTempDir = function() {
  if (fs.existsSync(path.resolve(temp))) {
    fs.rmSync(path.resolve(temp), {force: true, recursive: true})
  }
  fs.mkdirSync(path.resolve(temp))
}

/**
 * Copy sources to temporary directory.
 */
const copySources = function() {
  fs.cpSync(path.resolve('src'), path.resolve(temp), {recursive: true})
}

/**
 * Copy fake runtime object to temporary directory.
 */
const copyFakes = function() {
  fs.cpSync(path.resolve('test/fake'), path.resolve(temp, 'objects'), {recursive: true})
}

/**
 * Prepare test runtime.
 */
const prepareRuntimeForTests = function() {
  resolveTempDir()
  copySources()
  copyFakes()
}

prepareRuntimeForTests()
