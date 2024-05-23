const {program} = require('commander')
const transpile = require('./commands/transpile');
const link = require('./commands/link');
const version = require('./version');
const dataize = require('./commands/dataize');
const test = require('./commands/test');

program
  .name('eo2js')
  .usage('[options] command')
  .summary('EO to JS command line toolkit')
  .description('EOLANG to JavaScript command-line toolkit (' + version.what + ' built on ' + version.when + ')')
  .version(version.what, '-v, --version', 'Output the version number')
  .helpOption('-?, --help', 'Print this help information');

program
  .option('-t, --target <path>', 'Target directory with all generated files', '.eoc')
  .option('-p, --project <path>', 'Path to result JavaScript project', 'project')
  .option('-r, --resources <path>', 'Path to the resources', 'src/resources')
  .option('-d, --dependency <path>', 'Path to local eo2js-runtime dependency')
  .option('-f, --foreign <path>', 'Path to foreign tojos', 'eo-foreign.json')
  .option('--alone', 'Just run a single command without dependencies')
  // .option('--hash <hex>', 'Hash in objectionary/home to compile against', parser)
  // .option('--parser <version>', 'Set the version of EO parser to use', parser)
  // .option('--latest', 'Use the latest parser version from Maven Central')
  // .option('-b, --batch', 'Run in batch mode, suppress interactive messages')
  // .option('--no-color', 'Disable colorization of console messages')
  .option('--verbose', 'Print debug messages and full output of child processes');

/**
 * Transpile.
 */
program.command('transpile')
  .description('Convert XMIR to JavaScript executable files')
  .action(transpile)

/**
 * Link.
 */
program.command('link')
  .description('Build npm project')
  .option('--tests', 'Add dependency for testing', false)
  .action((opts) => {
    if (program.opts().alone === undefined) {
      transpile(opts)
    }
    link(opts)
  })

/**
 * Dataize.
 */
program.command('dataize')
  .description('Dataize program')
  .action((opts) => {
    if (program.opts().alone === undefined) {
      transpile(opts)
      link(opts)
    }
    dataize(program.args[1], program.args.slice(2), opts)
  })

/**
 * Test.
 */
program.command('test')
  .description('Run all visible unit tests')
  .option('--exclude <string>', 'Excluded tests list', '')
  .action((opts) => {
    if (program.opts().alone === undefined) {
      transpile(opts)
      link({...opts, tests: true})
    }
    test(opts)
  })

try {
  program.parse(process.argv)
} catch (e) {
  console.error(e.message)
  console.debug(e.stack)
  process.exit(1)
}
