// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

// Experiment: Run integration test to understand the lambda override error

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Change to eo2js directory
process.chdir(path.resolve(__dirname, '../eo2js'));

// We'll use the mvnw helper to prepare the EO sources
const mvnw = require('../eo2js/test/mvnw/mvnw.js');
const compileStylesheets = require('../eo2js/src/compile-stylesheets');
const { runSync } = require('../eo2js/test/helpers');

const home = path.resolve('temp/experiment-it');
const target = path.resolve(home, 'target');
const project = path.resolve(target, 'project');
const runtime = path.resolve('../eo2js-runtime');

async function prepare() {
  return mvnw(
    ['register', 'assemble', 'lint'],
    { home, sources: 'src/eo', target: 'target', easy: true }
  );
}

async function main() {
  console.log('Compiling stylesheets...');
  compileStylesheets();

  console.log('Cleaning up...');
  fs.rmSync(home, { recursive: true, force: true });
  fs.mkdirSync(project, { recursive: true });

  console.log('Copying EO sources...');
  fs.cpSync(
    'test/it/eo',
    path.resolve(home, 'src/eo'),
    { recursive: true }
  );

  console.log('Preparing with Maven...');
  await prepare();

  console.log('Running transpile...');
  try {
    const transpileLog = runSync(['transpile', '-t', target, '--verbose']);
    console.log('Transpile output:', transpileLog);
  } catch (e) {
    console.error('Transpile error:', e.message);
    if (e.stdout) console.log('stdout:', e.stdout.toString());
    if (e.stderr) console.log('stderr:', e.stderr.toString());
  }

  console.log('Running link...');
  try {
    const linkLog = runSync(['link', '-t', target, '-p', 'project', '-d', runtime, '--tests']);
    console.log('Link output:', linkLog);
  } catch (e) {
    console.error('Link error:', e.message);
    if (e.stdout) console.log('stdout:', e.stdout.toString());
    if (e.stderr) console.log('stderr:', e.stderr.toString());
  }

  console.log('\nTrying to run test command...');
  try {
    const testLog = runSync(['test', '-t', target, '-p', 'project', '-d', runtime]);
    console.log('Test output:', testLog);
  } catch (e) {
    console.error('Test error:', e.message);
    if (e.stdout) console.log('stdout:', e.stdout.toString());
    if (e.stderr) console.log('stderr:', e.stderr.toString());
  }

  console.log('\nTrying to run dataize command...');
  try {
    const dataizeLog = runSync(['dataize', 'program', '-t', target, '-p', 'project', '-d', runtime]);
    console.log('Dataize output:', dataizeLog);
  } catch (e) {
    console.error('Dataize error:', e.message);
    if (e.stdout) console.log('stdout:', e.stdout.toString());
    if (e.stderr) console.log('stderr:', e.stderr.toString());
  }
}

main().catch(console.error);
