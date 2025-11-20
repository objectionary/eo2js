// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const path = require('path')
const {spawn} = require('child_process')
const fs = require('fs')
const colors = require('colors')
const readline = require('readline')

/**
 * Version.
 * @type {null|String}
 */
let ver = null
/**
 * Is execution running.
 * @type {boolean}
 */
let running = false
/**
 * Start datetime.
 * @type {Number}
 */
let beginning
/**
 * Target directory.
 * @type {String}
 */
let target
/**
 * Current phase
 */
let phase = null

/**
 * Get EO version.
 * @return {String} - EO version
 */
const version = function() {
  if (ver === null) {
    ver = fs.readFileSync(path.resolve(__dirname, 'eo-version.txt')).toString().trim()
  }
  return ver
}

/**
 * The shell to use (depending on operating system).
 * @return {String} - Path to shell or "undefined" if default one should be used
 */
function shell() {
  if (process.platform === 'win32') {
    return 'C:\\Windows\\SysWOW64\\WindowsPowerShell\\v1.0\\powershell.exe'
  }
}

/**
 * Prepare options for Maven.
 * @param {{sources: String, target: String, home: String}} opts - Options
 * @return {Array.<String>} - Maven options
 */
const flags = function(opts) {
  return [
    `-Deo.version=${  version()}`,
    `-Deo.sourcesDir=${path.resolve(opts.home, opts.sources)}`,
    `-Deo.targetDir=${path.resolve(opts.home, opts.target)}`,
  ]
}

/**
 * Execute given goals of eo-maven-plugin.
 * @param {Array.<String>|String} goals - Goals to execute in right order
 * @param {{sources: String, target: String, home: String, [skip]: Boolean}} opts - Options
 * @return {Promise<Array.<String>|String>}
 */
const mvnw = function(goals, opts = {}) {
  return new Promise((resolve, reject) => {
    if (opts.skip) {
      resolve(goals)
    }
    phase = Array.isArray(goals) ? null : goals
    goals = Array.isArray(goals) ? goals : [goals]
    const bin = path.resolve(__dirname, 'mvnw') + (process.platform === 'win32' ? '.cmd' : '')
    target = path.resolve(opts.home, opts.target)
    const params = [
      ...flags(opts),
      '--batch-mode',
      '--color=never',
      '--update-snapshots',
      '--fail-fast',
      '--strict-checksums',
    ]
    const args = [
      ...goals.map((goal) => `org.eolang:eo-maven-plugin:${goal}`),
      ...process.platform === 'win32' ? params.map((p) => `"${p}"`) : params,
    ]
    const command = [bin, ...args].join(' ');
    console.debug(`Running: ${command}`)
    const result = spawn(
      bin,
      args,
      {
        cwd: __dirname,
        stdio: 'inherit',
        shell: shell(),
      }
    )
    start()
    result.on('close', (code) => {
      if (code !== 0) {
        console.error(`The command "${command}" exited with #${code} code`)
        process.exit(1)
      }
      stop()
      resolve(goals)
    })
  })
}

/**
 * Starts mvnw execution status detection.
 */
function start() {
  running = true
  beginning = Date.now()
  const check = function() {
    if (running) {
      print()
      setTimeout(check, 1000)
    }
  }
  check()
}


/**
 * Stops mvnw execution status detection.
 */
function stop() {
  running = false
  readline.clearLine(process.stdout, 0)
}

/**
 * Prints mvnw execution status.
 */
function print() {
  const duration = Date.now() - beginning;
  /**
   * Recursively calculates number of files under a directory.
   * @param {String} dir - Directory where to count.
   * @param {Integer} curr - Current counter.
   * @return {Integer} Total number files.
   */
  function count(dir, curr) {
    if (fs.existsSync(dir)) {
      for (const f of fs.readdirSync(dir)) {
        const next = path.join(dir, f);
        if (fs.statSync(next).isDirectory()) {
          curr = count(next, curr);
        } else {
          curr++;
        }
      }
    }
    return curr;
  }
  let elapsed;
  if (duration < 1000) {
    elapsed = `${duration}ms`;
  } else if (duration < 60 * 1000) {
    elapsed = `${Math.ceil(duration / 1000)}s`;
  } else {
    elapsed = `${Math.ceil(duration / 3600000)}min`;
  }
  process.stdout.write(
    colors.yellow(`${phase ? `[${phase}]: `: ''} ${elapsed}; ${count(target, 0)} files generated so far...`)
  );
  readline.clearLine(process.stdout, 1);
  readline.cursorTo(process.stdout, 0);
}

module.exports = mvnw
