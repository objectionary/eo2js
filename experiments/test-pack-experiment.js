// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

// This experiment tests specific transformation packs to understand failure causes

const path = require('path')
const fs = require('fs')
const helpers = require('../eo2js/test/helpers')

// Which pack to test
const packName = process.argv[2] || 'keywords'

async function main() {
  console.log(`Testing pack: ${packName}`)

  const packPath = path.resolve(__dirname, `../eo2js/test/resources/transpile/packs/${packName}.json`)
  const json = JSON.parse(fs.readFileSync(packPath).toString())

  // Override skip to false for testing
  json.skip = false

  console.log('EO source:')
  console.log(json.eo.join('\n'))
  console.log('\nXSL transformations:', json.xsls)
  console.log('\nTests:', JSON.stringify(json.tests, null, 2))

  const home = path.resolve(__dirname, 'test-pack-run', packName)
  fs.mkdirSync(home, {recursive: true})

  try {
    const result = await helpers.pack({
      home: home,
      sources: 'src',
      target: 'target',
      json: json,
      easy: true  // disable failOnWarning for linting
    })

    console.log('\n=== RESULT ===')
    if (result.skip) {
      console.log('Test was skipped')
    } else if (result.failures.length > 0) {
      console.log('FAILURES:')
      result.failures.forEach((f, i) => console.log(`  ${i + 1}. ${f}`))
    } else {
      console.log('SUCCESS!')
    }

    // Save XMIR for inspection
    const xmirFile = path.resolve(home, 'result.xmir')
    fs.writeFileSync(xmirFile, result.xmir)
    console.log(`\nXMIR saved to: ${xmirFile}`)

  } catch (error) {
    console.error('\n=== ERROR ===')
    console.error(error.message)
    console.error(error.stack)
  }
}

main()
