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
 * Get the root container from XMIR (handles both old 'program' and new 'object' format).
 * EO 0.59.0 changed the root element from <program> to <object>.
 * @param {any} xmir - Parsed XMIR
 * @return {any} - The root container (program or object)
 */
const getRoot = function(xmir) {
  return xmir.program || xmir.object
}

/**
 * Check if given XMIR has meta.
 * @param {any} xmir - XMIR
 * @param {String} name - Name of the meta
 * @return {boolean} - If given XMIR has tests meta or not
 */
const hasMeta = function(xmir, name) {
  const root = getRoot(xmir)
  const metas = root.metas
  let res = false
  if (metas !== null && metas !== undefined) {
    const nodes = metas.meta
    if (Array.isArray(nodes)) {
      res = nodes.findIndex((meta) => meta.head === name) !== -1
    } else if (typeof nodes === 'object' && nodes.hasOwnProperty('head')) {
      res = nodes.head === name
    }
  }
  return res
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
 * Get the program name from XMIR (handles both old 'program' and new 'object' format).
 * In old format: <program name="com.eo2js.simple">
 * In new format (EO 0.59.0): Name is derived from package meta and main object name
 * @param {any} xmir - Parsed XMIR
 * @return {string} - The program name (e.g. "com.eo2js.simple")
 */
const getProgramName = function(xmir) {
  const root = getRoot(xmir)
  // Old format: name attribute on program element
  if (root['@_name']) {
    return root['@_name']
  }
  // New format (EO 0.59.0): construct from package meta and main object name
  let pkg = ''
  const metas = root.metas
  if (metas && metas.meta) {
    const metaArr = Array.isArray(metas.meta) ? metas.meta : [metas.meta]
    const pkgMeta = metaArr.find((m) => m.head === 'package')
    if (pkgMeta && pkgMeta.part) {
      pkg = Array.isArray(pkgMeta.part) ? pkgMeta.part[0] : pkgMeta.part
    }
  }
  // Get main object name from <o> element
  let objName = ''
  const obj = root.o
  if (obj) {
    const mainObj = Array.isArray(obj) ? obj.find((o) => o['@_name']) : obj
    if (mainObj && mainObj['@_name']) {
      objName = mainObj['@_name']
    }
  }
  return pkg ? `${pkg}.${objName}` : objName
}

/**
 * Get objects from XMIR (handles both old and new format).
 * Old format: xml.program.objects.object
 * New format (EO 0.59.0): xml.object.objects.object (after transformation)
 * @param {any} xmir - Parsed XMIR
 * @return {Array} - Array of objects
 */
const getObjects = function(xmir) {
  const root = getRoot(xmir)
  // Try old format first: <objects><object>...</object></objects>
  if (root.objects && root.objects.object) {
    const objs = root.objects.object
    return Array.isArray(objs) ? objs : [objs]
  }
  return []
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
  const pth = pathFromName(getProgramName(xml))
  const isTest = hasMeta(xml, 'tests')
  const transpiled = path.resolve(options.target, dir, `${pth}.xmir`)
  const dest = path.resolve(options.project, `${pth}${isTest ? '.test' : ''}.js`)
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
    const objects = getObjects(xml)
    const filtered = objects.filter((obj) => Boolean(obj) && obj.hasOwnProperty('javascript') && !obj.hasOwnProperty('@_atom'))
    const count = isTest ? 0 : 1
    if (filtered.length > count) {
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
