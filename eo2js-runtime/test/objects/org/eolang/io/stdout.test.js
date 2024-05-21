const assert = require('assert');
const stdout = require('../../../../../temp/objects/org/eolang/io/stdout');
const {data, BOOL} = require('../../../../../temp/runtime/data');
const dataized = require('../../../../../temp/runtime/dataized');

describe('stdout', function() {
  it('should be dataized to true', function() {
    assert.ok(
      dataized(stdout().with({'text': data.toObject('Hello')}), BOOL)
    )
  })
  it('should log to output', function() {
    const logs = []
    const out = {log: (...args) => logs.push(...args)}
    dataized(stdout(out).with({'text': data.toObject('Hello, world!')}), BOOL)
    assert.ok(logs.includes('Hello, world!'))
  });
})
