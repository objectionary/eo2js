const {program} = require('commander');
const path = require('path');
const fs = require('fs');
const {execSync} = require('child_process');

/**
 * Entry point JS file.
 * @type {string}
 */
const main = '__main__.js'

/**
 * Data to insert to package.json file.
 * If path to local dependency is present - eo2js-runtime dependency won't be added.
 * @param {{dependency: string, tests: boolean, runtimeVersion: string}} options - Program options
 * @return {{author: string, name: string, version: string}} - The content for package.json file
 */
const pckg = function(options) {
  const def = {
    name: 'project',
    version: '1.0.0',
    author: 'eo2js',
    type: 'commonjs',
    dependencies: {}
  }
  if (!options.dependency) {
    def.dependencies = {
      ...def.dependencies,
      'eo2js-runtime': options.runtimeVersion || 'latest'
    }
  }
  if (!!options.tests) {
    def.dependencies = {
      ...def.dependencies,
      'mocha': 'latest'
    }
  }
  return def
}

/**
 * Build npm project.
 * @param {{
 *  target: String,
 *  project: String,
 *  tests: ?boolean,
 *  runtimeVersion: string,
 *  resources: String,
 *  dependency: ?String,
 * }} options - Program options
 */
const link = function(options) {
  options = {...program.opts(), ...options}
  const project = path.resolve(options.target, options.project)
  fs.writeFileSync(
    path.resolve(project, 'package.json'),
    JSON.stringify(pckg(options))
  )
  console.log(`Created package.json in: ${path.resolve(project, 'package.json')}`)
  const lock = path.resolve(project, 'package-lock.json')
  if (!fs.existsSync(lock)) {
    console.log('Installing dependencies...')
    execSync('npm install', {cwd: project})
    if (options.dependency) {
      fs.cpSync(
        options.dependency,
        path.resolve(project, 'node_modules/eo2js-runtime'),
        {recursive: true}
      )
    }
  }
  fs.copyFileSync(
    path.resolve(options.resources, `js/${main}`),
    path.resolve(project, main)
  )
  console.log(`Copied ${main} file to ${path.resolve(project)}`)
  if (options.dependency) {
    fs.cpSync(
      options.dependency,
      path.resolve(project, 'node_modules/eo2js-runtime'),
      {recursive: true}
    )
    console.log(`Copied eo2js-runtime from ${options.dependency} to ${path.resolve(project, 'node_modules/eo2js-runtime')}`)
  }
  console.log('Project build completed successfully')
}

module.exports = link
