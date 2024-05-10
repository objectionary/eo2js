const once = require('./at-once')
const simple = require('./at-simple')
const free = require('./at-void')
const lambda = require('./at-lambda')

/**
 * API for attributes.
 * @type {{lambda: (function(Object, function(Object): Object): *)|{}, void: (function(string): *)|{}, once: (function(Object): *)|{}, simple: (function(Object): *)|{}}}
 */
const attr = {
  once,
  simple,
  void: free,
  lambda,
}

module.exports = attr
