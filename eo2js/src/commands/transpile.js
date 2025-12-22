// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const {program} = require('commander');
const path = require('path');
const fs = require('fs');
const saxon = require('saxon-js')
const {XMLParser} = require('fast-xml-parser');

/**
 * Verified key.
 * @type {string}
 */
const verified = 'linted'

/**
 * Result directory for transpiled XMIRs.
 * @type {string}
 */
const dir = '8-transpile'

/**
 * Get path from given object name.
 * E.g.
 * - name org.eolang.int + pckg '' -> path org/eolang/int
 * - name org.eolang.int.test + pckg org.eolang -> path org/eolang/int.test
 * If name ends with ".test" and package
 * @param {String} name - Name of the object. May contain dots
 * @return {String} - path from object name
 */
const pathFromName = function(name) {
  return name.replace(/\./g, path.sep)
}

/**
 * Make directory if not exist.
 * @param {String} dir - Directory
 */
const makeDirIfNotExist = function(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {recursive: true})
  }
}

/**
 * Check if source needs to be retranspiled by comparing modification times.
 * @param {String} source - Source file path
 * @param {String} transpiled - Transpiled file path
 * @return {boolean} - True if source needs to be retranspiled
 */
const needsRetranspile = function(source, transpiled) {
  return !fs.existsSync(transpiled) || fs.statSync(source).mtime > fs.statSync(transpiled).mtime
}

/**
 * Get package name from XMIR metas.
 * @param {any} metas - Metas object
 * @return {string} - Package name or empty string
 */
const packageName = function(metas) {
  if (!metas || !metas.meta) {
    return ''
  }
  const arr = Array.isArray(metas.meta) ? metas.meta : [metas.meta]
  const pkg = arr.find((m) => m.head === 'package')
  if (!pkg || !pkg.part) {
    return ''
  }
  return Array.isArray(pkg.part) ? pkg.part[0] : pkg.part
}

/**
 * Get top-level object name from XMIR.
 * @param {any} obj - The o element(s)
 * @return {string} - Object name
 */
const topObjectName = function(obj) {
  const main = Array.isArray(obj) ? obj.find((o) => o['@_name']) : obj
  return main && main['@_name'] ? main['@_name'] : ''
}

/**
 * Check if XMIR has inline test attributes (name starts with +).
 * @param {any} obj - The o element(s)
 * @return {boolean} - True if there are test attributes
 */
const hasTestAttrs = function(obj) {
  const findTestAttr = (node) => {
    if (!node) {
      return false
    }
    if (Array.isArray(node)) {
      return node.some(findTestAttr)
    }
    if (typeof node === 'object') {
      if (node['@_name'] && node['@_name'].startsWith('+')) {
        return true
      }
      return Object.values(node).some(findTestAttr)
    }
    return false
  }
  return findTestAttr(obj)
}

/**
 * Transform XMIR from given tojo and save.
 * @param {Object} tojo - Tojo.
 * @param {{target: String, project: String, verbose: boolean}} options - Program options
 * @param {Array.<String>} transformations - List of transformations to apply to XMIR
 * @param {any} parser - XML parser
 */
const transform = function(tojo, options, transformations, parser) {
  const text = fs.readFileSync(tojo[verified]).toString()
  let xml = parser.parse(text)
  const pkg = packageName(xml.object.metas)
  const name = topObjectName(xml.object.o)
  const pth = pathFromName(pkg ? `${pkg}.${name}` : name)
  const hasTests = hasTestAttrs(xml.object.o)
  const transpiled = path.resolve(options.target, dir, `${pth}.xmir`)
  const dest = path.resolve(options.project, `${pth}${hasTests ? '.test' : ''}.js`)
  if (needsRetranspile(tojo[verified], transpiled)) {
    makeDirIfNotExist(transpiled.substring(0, transpiled.lastIndexOf(path.sep)))
    fs.writeFileSync(transpiled, text)
    xml = text
    transformations.forEach((transformation) => {
      xml = saxon.transform({
        stylesheetFileName: transformation,
        sourceText: xml,
        destination: 'serialized'
      }).principalResult
    })
    fs.writeFileSync(transpiled, xml)
    xml = parser.parse(xml)
    const objs = xml.object.object
    const objects = Array.isArray(objs) ? objs : [objs]
    const filtered = objects.filter((obj) => Boolean(obj) && obj.hasOwnProperty('javascript') && !obj.hasOwnProperty('@_atom'))
    if (filtered.length > 0) {
      const first = filtered[0]
      makeDirIfNotExist(dest.substring(0, dest.lastIndexOf(path.sep)))
      fs.writeFileSync(dest, first.javascript)
      filtered.slice(1).forEach((obj) => fs.appendFileSync(dest, `\n${obj.javascript}`))
    }
  } else if (options.verbose) {
    console.log(`Skipping ${pth} - already transpiled`)
  }
}

/**
 * Transpile XMIR to JavaScript.
 * @param {{foreign: String, project: String, resources: String}} options - Transpile command options
 */
const transpile = function(options) {
  options = {...program.opts(), ...options}
  const foreign = path.resolve(options.target, options.foreign)
  console.log(`Reading foreign tojos from: ${foreign}`)
  if (!fs.existsSync(foreign)) {
    throw new Error(`File ${foreign} is not found`)
  }
  if (!foreign.endsWith('.json')) {
    throw new Error(`Only .json foreign tojos file is supported, given ${foreign.substring(foreign.lastIndexOf(path.sep))}`)
  }
  const transformations = [
    'objects', 'package', 'tests', 'attrs', 'data', 'to-js'
  ].map((name) => path.resolve(options.resources, `json/${name}.sef.json`))
  console.log(`Using transformations from: ${options.resources}/json/`)
  const parser = new XMLParser({ignoreAttributes: false})
  const project = path.resolve(options.target, options.project)
  console.log(`Output directory: ${project}`)
  fs.mkdirSync(project, {recursive: true})
  const tojos = JSON.parse(fs.readFileSync(foreign).toString())
    .filter((tojo) => tojo.hasOwnProperty(verified))
  console.log(`Found ${tojos.length} verified tojos to process`)
  let processed = 0
  tojos.forEach((tojo) => {
    console.log(`Processing: ${tojo[verified]}`)
    transform(tojo, {target: options.target, project, verbose: options.verbose}, transformations, parser)
    processed++
  })
  console.log(`Successfully processed ${processed} files`)
}

module.exports = transpile
