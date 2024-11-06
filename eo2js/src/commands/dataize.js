const {program} = require('commander');
const path = require('path');
const {execSync} = require('child_process')

/**
 * Dataize command.
 * @param {String} obj - Entry object
 * @param {Array..<String>} args - EO program arguments
 * @param {{target: String, project: String}} options - Program options
 */
const dataize = function(obj, args, options) {
  options = {...program.opts(), ...options}
  const main = path.resolve(options.target, options.project, '__main__.js')
  console.log(`Dataizing object: ${obj}`)
  console.log(`Using main file: ${main}`)
  if (args.length > 0) {
    console.log(`With arguments: ${args.join(' ')}`)
  }
  execSync(['node', main, obj, ...args].join(' '), {stdio: 'inherit'})
}

module.exports = dataize
