// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const assert = require('assert')
const fs = require('fs')
const os = require('os')
const path = require('path')
const dataized = require('../../temp/runtime/dataized')
const {BOOL, STRING, NUMBER} = require('../../temp/runtime/types')
const inet_addr = require('../../temp/objects/org/eolang/sys/win32/inet_addr')
const GetCurrentProcessId = require('../../temp/objects/org/eolang/sys/win32/GetCurrentProcessId')
const GetEnvironmentVariable = require('../../temp/objects/org/eolang/sys/win32/GetEnvironmentVariable')
const GetSystemTime = require('../../temp/objects/org/eolang/sys/win32/GetSystemTime')
const WriteFile = require('../../temp/objects/org/eolang/sys/win32/WriteFile')

const describeOnWindows = process.platform === 'win32' ? describe : describe.skip

const callWin32 = (fn, args = []) => fn({}, {}, (idx) => args[idx], args.length)

describeOnWindows('win32 atoms', () => {
  it('should return positive process id', () => {
    const pid = dataized(callWin32(GetCurrentProcessId), NUMBER)
    assert.ok(pid > 0)
  })

  it('should read environment variable', () => {
    const key = 'EO2JS_WIN32_TEST_ENV'
    const value = 'windows-ok'
    process.env[key] = value
    const envValue = dataized(callWin32(GetEnvironmentVariable, [key]), STRING)
    delete process.env[key]
    assert.equal(envValue, value)
  })

  it('should convert IPv4 to integer', () => {
    const number = dataized(callWin32(inet_addr, ['192.168.1.1']), NUMBER)
    assert.equal(number, 3232235777)
  })

  it('should return current system time json', () => {
    const parsed = JSON.parse(dataized(callWin32(GetSystemTime), STRING))
    assert.ok(parsed.year >= 2000)
    assert.ok(parsed.month >= 1 && parsed.month <= 12)
  })

  it('should write file and return true', () => {
    const filepath = path.join(os.tmpdir(), 'eo2js-win32-test.txt')
    const ok = dataized(callWin32(WriteFile, [filepath, 'win32-file']), BOOL)
    assert.equal(ok, true)
    assert.equal(fs.readFileSync(filepath, 'utf8'), 'win32-file')
    fs.rmSync(filepath, {force: true})
  })
})
