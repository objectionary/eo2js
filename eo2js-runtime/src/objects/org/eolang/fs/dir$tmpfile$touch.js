const object = require('../../../../runtime/object')
const {LAMBDA, RHO} = require('../../../../runtime/attribute/specials');
const {STRING} = require('../../../../runtime/types');
const fs = require('fs');
const path = require('path');
const dataized = require('../../../../runtime/dataized');
const data = require('../../../../runtime/data')

/**
 * Random chars sequence.
 * @type {string}
 */
const RANDOM_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

/**
 * Random name generator based on crypto.
 * Adapted from https://github.com/raszi/node-tmp/blob/5f0b2525ed6f6a977ea0cc272d4903d9d2216059/lib/tmp.js#L411
 * @param {number} amount - Amount of generated name
 * @return {string} - The generated random name
 */
function randomChars(amount) {
  const value = []
  let rnd
  try {
    rnd = crypto.randomBytes(amount);
  } catch (e) {
    rnd = crypto.pseudoRandomBytes(amount);
  }
  for (let idx = 0; idx < amount; idx++) {
    value.push(RANDOM_CHARS[rnd[idx] % RANDOM_CHARS.length]);
  }
  return value.join('');
}

/**
 * Generate temporary file name full path.
 * @param {string} dir - Directory
 * @return {string} - Temporary file name full path
 */
function tmpfilePath(dir) {
  const name = [
    'tmp-',
    process.pid,
    '-',
    randomChars(12),
  ].join('');
  return path.join(dir, name);
}

/**
 * Dir.tmpfile.touch.
 * @return {Object} - Dir.tmpfile.touch object
 */
const dir$tmpfile$touch = function() {
  const obj = object('dir$tmpfile$touch')
  obj.assets[LAMBDA] = function(self) {
    const path = tmpfilePath(
      dataized(self.take(RHO).take(RHO).take('path'), STRING)
    )
    fs.appendFileSync(
      tmpfilePath(path),
      ''
    )
    return data.toObject(path)
  }
  return obj
}

module.exports = dir$tmpfile$touch
