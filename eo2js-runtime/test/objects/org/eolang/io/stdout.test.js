const assert = require('assert');
const stdout = require('../../../../../temp/objects/org/eolang/io/stdout');
const data = require('../../../../../temp/runtime/data');
const dataized = require('../../../../../temp/runtime/dataized');

describe('stdout', function() {
  it('should be dataized to true', function() {
    assert.ok(
      dataized(
        stdout().with({'text': data.toObject('Hello')}),
        data.BOOL
      )
    )
  })
  it('should log to output', function() {
    const logs = []
    const out = {log: (...args) => logs.push(...args)}
    dataized(
      stdout(out).with({'text': data.toObject('Hello, world!')}),
      data.BOOL
    )
    assert.ok(logs.includes('Hello, world!'))
  });
})
