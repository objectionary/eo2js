const {program} = require('commander');
const path = require('path');
const fs = require('fs');
const saxon = require('saxon-js')
const {XMLParser} = require('fast-xml-parser');

/**
 * Replace dots in given string with {@code path.sep}
 * @param {String} str - String
 * @return {String} - String with replaced dots
 */
const dotsToSeps = function(str) {
  return str.replace(/\./g, path.sep)
}

/**
 * Get path from given object name.
 * E.g.
 * - name org.eolang.int + pckg '' -> path org/eolang/int
 * - name org.eolang.int.test + pckg org.eolang -> path org/eolang/int.test
 * If name ends with ".test" and package
 * @param {String} name - Name of the object. May contain dots
 * @param {String} pckg - Package of the object
 * @return {String} - path from object name
 */
const pathFromName = function(name, pckg) {
  let tail
  if (pckg !== '') {
    tail = name.slice(pckg.length).slice(1)
  } else {
    tail = name
  }
  let pth
  if (tail.includes('.test')) {
    pth = dotsToSeps(name.slice(0, name.indexOf(tail))) + tail
  } else {
    pth = dotsToSeps(name)
  }
  return pth
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
 * Check if given XMIR has meta.
 * @param {any} xmir - XMIR
 * @param {String} name - Name of the meta
 * @return {boolean} - If given XMIR has tests meta or not
 */
const hasMeta = function(xmir, name) {
  const metas = xmir.program.metas.meta
  return Array.isArray(metas) && metas.findIndex((meta) => meta.head === name) !== -1
}

/**
 * Get package meta from XMIR.
 * @param {any} xmir - XMIR
 * @return {string} - Package meta of emtpy string
 */
const packageMeta = function(xmir) {
  const pckg = 'package'
  let meta = ''
  if (hasMeta(xmir, pckg)) {
    meta = xmir.program.metas.meta.find((mt) => mt.head === pckg).tail
  }
  return meta
}

/**
 * Transpile XMIR to JavaScript.
 * @param {{foreign: String, project: String, resources: String}} options - Transpile command options
 */
const transpile = function(options) {
  options = {...program.opts(), ...options}
  const foreign = path.resolve(options['target'], options['foreign'])
  if (!fs.existsSync(foreign)) {
    throw new Error(`File ${foreign} is not found`)
  }
  if (!foreign.endsWith('.json')) {
    throw new Error(`Only .json foreign tojos file is supported, given ${foreign.substring(foreign.lastIndexOf(path.sep))}`)
  }
  const transformations = [
    'objects', 'package', 'tests', 'attrs', 'data', 'to-js'
  ].map((name) => path.resolve(options['resources'], `json/${name}.sef.json`))
  const parser = new XMLParser({ignoreAttributes: false})
  const verified = 'verified'
  const dir = '8-transpile'
  const project = path.resolve(options['target'], options['project'])
  fs.mkdirSync(project, {recursive: true})
  JSON.parse(fs.readFileSync(foreign).toString())
    .filter((tojo) => tojo.hasOwnProperty(verified))
    .forEach((tojo) => {
      const text = fs.readFileSync(tojo[verified]).toString()
      let xml = parser.parse(text)
      const pckg = packageMeta(xml)
      const transpiled = path.resolve(
        options['target'],
        dir,
        `${pathFromName(xml['program']['@_name'], pckg)}.xmir`
      )
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
      let objects = xml.program.objects.object
      if (!Array.isArray(objects)) {
        objects = [objects]
      }
      const filtered = objects.filter((obj) => !!obj && obj.hasOwnProperty('javascript') && !obj.hasOwnProperty('@_atom'))
      const count = hasMeta(xml, 'tests') ? 0 : 1
      if (filtered.length > count) {
        const first = filtered[0]
        const dest = path.resolve(project, `${pathFromName(first['@_js-name'], pckg)}.js`)
        makeDirIfNotExist(dest.substring(0, dest.lastIndexOf(path.sep)))
        fs.writeFileSync(dest, first['javascript'])
        filtered.slice(1).forEach((obj) => fs.appendFileSync(dest, `\n${obj['javascript']}`))
      }
    })
}

module.exports = transpile
