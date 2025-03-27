// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const object = require('../../../../runtime/object')
const {LAMBDA} = require('../../../../runtime/attribute/specials');
const data = require('../../../../runtime/data');
const os = require('os');

/**
 * Extract the {major}.{minor} version from the windows release string.
 * @param {string} release - OS release version
 * @return {string} - Windows version
 */
const windows_version = function(release) {
  const versionMap = {
    '10.0': '10',
    '6.3': '8.1',
    '6.2': '8',
    '6.1': '7',
    '6.0': 'Vista',
    '5.2': 'Server 2003; XP x64 Edition',
    '5.1': 'XP',
    '5.0': '2000'
  };
  const version = release.split('.').slice(0, 2).join('.')
  return versionMap[version] || `NT ${release}`
}

/**
 * Operating system name.
 * @type {Object}
 */
const OS_NAME = (function() {
  const type = os.type()
  let os_name
  switch (type) {
    case 'Darwin':
      os_name = 'Mac OS X'
      break
    case 'Windows_NT':
      os_name = `Windows ${windows_version(os.release())}`
      break
    case 'Linux':
      os_name = 'Linux'
      break
    default:
      os_name = type
  }
  return data.toObject(os_name)
})()

/**
 * Os.name.
 * @return {Object} - Os.name object
 */
const os$name = function() {
  const obj = object('os$name')
  obj.assets[LAMBDA] = function() {
    return OS_NAME
  }
  return obj
}

module.exports = os$name
