// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const assert = require('assert')
const fs = require('fs')
const os = require('os')
const path = require('path')
const object = require('../../temp/runtime/object')
const attr = require('../../temp/runtime/attribute/attr')
const {PHI} = require('../../temp/runtime/attribute/specials')
const data = require('../../temp/runtime/data')
const dataized = require('../../temp/runtime/dataized')
const {BOOL, STRING, NUMBER, BYTES} = require('../../temp/runtime/types')
const inet_addr = require('../../temp/objects/org/eolang/sm/win32/inet_addr')
const GetCurrentProcessId = require('../../temp/objects/org/eolang/sm/win32/GetCurrentProcessId')
const GetEnvironmentVariable = require('../../temp/objects/org/eolang/sm/win32/GetEnvironmentVariable')
const GetSystemTime = require('../../temp/objects/org/eolang/sm/win32/GetSystemTime')
const ReadFile = require('../../temp/objects/org/eolang/sm/win32/ReadFile')
const WriteFile = require('../../temp/objects/org/eolang/sm/win32/WriteFile')

const describeOnWindows = process.platform === 'win32' ? describe : describe.skip

const makeWin32Stub = function() {
  const win = object('win32')
  const ret = object('win32.return')
  ret.attrs.code = attr.void('code')
  ret.attrs.output = attr.void('output')
  ret.attrs[PHI] = attr.lambda(ret, (self) => self.take('output'))
  const systemTime = object('win32.system-time')
  ;[
    'year',
    'month',
    'day',
    'day-of-week',
    'hour',
    'minute',
    'second',
    'milliseconds',
  ].forEach((name) => {
    systemTime.attrs[name] = attr.void(name)
  })
  win.attrs.return = attr.simple(ret)
  win.attrs['system-time'] = attr.simple(systemTime)
  return win
}

const WIN = makeWin32Stub()

const toPhi = (value) => (
  value && value.attrs ? value : data.toObject(value)
)

const callWin32 = (fn, args = []) => fn(WIN, args.map(toPhi))

describeOnWindows('win32 atoms', () => {
  it('should return positive process id', () => {
    const result = callWin32(GetCurrentProcessId)
    const pid = dataized(result.take('code'), NUMBER)
    console.log(`win32 GetCurrentProcessId code -> ${pid}`)
    assert.ok(pid > 0)
  })

  it('should read environment variable', () => {
    const key = 'EO2JS_WIN32_TEST_ENV'
    const value = 'windows-ok'
    process.env[key] = value
    const result = callWin32(GetEnvironmentVariable, [key, 512])
    const envValue = dataized(result.take('output'), STRING)
    const length = dataized(result.take('code'), NUMBER)
    console.log(`win32 GetEnvironmentVariable ${key} -> ${envValue} (len=${length})`)
    delete process.env[key]
    assert.equal(envValue, value)
    assert.equal(length, value.length)
  })

  it('should convert IPv4 to integer', () => {
    const result = callWin32(inet_addr, ['127.0.0.1'])
    const number = dataized(result.take('code'), NUMBER)
    console.log(`win32 inet_addr 127.0.0.1 -> ${number}`)
    assert.equal(number, 16777343)
  })

  it('should return current system time structure', () => {
    const result = callWin32(GetSystemTime)
    const ok = dataized(result.take('code'), BOOL)
    const output = result.take('output')
    const year = dataized(output.take('year'), NUMBER)
    const month = dataized(output.take('month'), NUMBER)
    const dayOfWeek = dataized(output.take('day-of-week'), NUMBER)
    console.log(`win32 GetSystemTime -> year=${year} month=${month} dayOfWeek=${dayOfWeek}`)
    assert.equal(ok, true)
    assert.ok(year >= 2000)
    assert.ok(month >= 1 && month <= 12)
    assert.ok(dayOfWeek >= 0 && dayOfWeek <= 6)
  })

  it('should write and read file via handles', () => {
    const filepath = path.join(os.tmpdir(), 'eo2js-win32-test.txt')
    const buffer = Array.from(Buffer.from('win32-file'))
    const fd = fs.openSync(filepath, 'w+')
    const writeRes = callWin32(WriteFile, [fd, buffer, buffer.length])
    const ok = dataized(writeRes.take('code'), BOOL)
    const written = dataized(writeRes.take('output'), NUMBER)
    console.log(`win32 WriteFile fd=${fd} -> ${ok} (written=${written})`)
    fs.closeSync(fd)

    const fdRead = fs.openSync(filepath, 'r')
    const readRes = callWin32(ReadFile, [fdRead, buffer.length])
    const readOk = dataized(readRes.take('code'), BOOL)
    const readBytes = dataized(readRes.take('output'), BYTES)
    const readText = Buffer.from(readBytes).toString('utf8')
    console.log(`win32 ReadFile fd=${fdRead} -> ${readOk} (text=${readText})`)
    fs.closeSync(fdRead)

    assert.equal(ok, true)
    assert.equal(written, buffer.length)
    assert.equal(readOk, true)
    assert.equal(readText, 'win32-file')
    assert.equal(fs.readFileSync(filepath, 'utf8'), 'win32-file')
    fs.rmSync(filepath, {force: true})
  })
})
