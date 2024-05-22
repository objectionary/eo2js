const {program} = require('commander');
const path = require('path');
const {execSync} = require('child_process')

/**
 * Test command.
 * @param {{target: String, project: String}} options - Program options
 */
const test = function(options) {
  options = {...program.opts(), ...options}
  const dir = path.resolve(options.target, options.project)
  execSync(
    [
      'node ./node_modules/mocha/bin/mocha.js .',
      '--recursive',
      '--exclude "__main__.js"',
      '--exclude "node_modules/**"',
    ].join(' '),
    {stdio: 'inherit', cwd: dir}
  )
}

module.exports = test
