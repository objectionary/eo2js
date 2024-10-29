const assert = require('assert');
const stdout = require('../../../../../temp/objects/org/eolang/io/console$write$written-bytes');
const {BOOL} = require('../../../../../temp/runtime/types');
const dataized = require('../../../../../temp/runtime/dataized');
const data = require('../../../../../temp/runtime/data')

describe('console', function() {
  describe('write$written-bytes', function() {
    it('should be dataized to true', function() {
      assert.ok(
        dataized(stdout().with({'buffer': data.toObject('Hello')}), BOOL)
      )
    })
    it('should log to output', function() {
      const logs = []
      const out = {log: (...args) => logs.push(...args)}
      dataized(stdout(out).with({'buffer': data.toObject('Hello, world!')}), BOOL)
      assert.ok(logs.includes('Hello, world!'))
    });
  })
})
