// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

const phi = require('../../temp/runtime/phi')
const {RHO} = require('../../temp/runtime/attribute/specials')
const assert = require('assert')
const pckg = require('../../temp/runtime/package')
const fs = require('fs');
const path = require('path');

describe('package object', () => {
  afterEach('clear temp', () => {
    const temp = path.resolve(__dirname, 'temp')
    if (fs.existsSync(temp)) {
      fs.rmSync(temp, {recursive: true})
    }
  })
  describe('empty', () => {
    it('should be child of phi', () => {
      assert.deepStrictEqual(phi.take('').take(RHO), phi)
    })
    it(`should have ${RHO} attribute`, () => {
      assert.ok(pckg('', {}).attrs.hasOwnProperty(RHO))
    })
    describe('#take()', () => {
      it('should return next level package object', () => {
        const obj = pckg('', {})
        assert.notDeepStrictEqual(obj.take('org'), obj)
      })
      it('should return child of empty package object', () => {
        const obj = pckg('', {})
        assert.deepStrictEqual(obj.take('org').take(RHO), obj)
      })
      it('should cache next level object', () => {
        const obj = pckg('', {})
        assert.deepStrictEqual(obj.take('org'), obj.take('org'))
      })
      it('should fail on wrong path', () => {
        assert.throws(() => pckg('', {}).take('wrong'))
      })
      it('should return the same next level object with and without dots', () => {
        const obj = pckg('', {})
        assert.deepStrictEqual(
          obj.take('org').take('eolang'),
          obj.take('org.eolang')
        )
      })
      it('should not fail if finds EO object', () => {
        assert.doesNotThrow(() => pckg('', {}).take('org.eolang.number').toString())
      })
      it('should not return new object on every dispatch', () => {
        const empty = pckg('', {})
        assert.equal(
          empty.take('org.eolang.number').toString(),
          empty.take('org.eolang.number').toString()
        )
      })
      // it('should find object outside "node_modules"', function() {
      //   const modules = path.resolve(__dirname, 'temp/node_modules')
      //   fs.mkdirSync(modules, {recursive: true})
      //   fs.cpSync(
      //     path.resolve(__dirname, '../../src'),
      //     path.resolve(modules, 'eo2js-runtime/src'),
      //     {recursive: true}
      //   )
      //   const eolang = path.resolve(__dirname, 'temp/org/eolang')
      //   fs.mkdirSync(eolang, {recursive: true})
      //   fs.writeFileSync(
      //     path.resolve(eolang, 'dummy.js'),
      //     'module.exports = function () {\n' +
      //     '  return {name: "Dummy", attrs: {}, copy: function() { return this }}\n' +
      //     '}'
      //   )
      //   const pack = require(
      //     path.resolve(__dirname, 'temp/node_modules/eo2js-runtime/src/runtime/package')
      //   )
      //   const dummy = pack('', phi).take('org.eolang.dummy')
      //   assert.equal(dummy.name, 'Dummy')
      // })
    })
    describe('#with()', () => {
      it('should fail on put', () => {
        assert.throws(() => pckg('', {}).with({0: 'any'}))
      })
    })
    describe('#copy()', () => {
      it('should return itself', () => {
        const obj = pckg('', {})
        assert.deepStrictEqual(obj.copy(), obj)
      })
    })
  })
  describe('"org"', () => {
    it(`should have ${RHO} attributes`, () => {
      const obj = pckg('', {}).take('org')
      assert.ok(obj.attrs.hasOwnProperty(RHO))
    })
    describe('#with()', () => {
      it('should fail on put', () => {
        assert.throws(() => pckg('', {}).take('org').with({0: 'any'}))
      })
    })
    describe('#copy()', () => {
      it('should return itself', () => {
        const org = pckg('', {}).take('org')
        assert.deepStrictEqual(org.copy(), org)
      })
    })
    describe('#take()', () => {
      it('should return child "eolang" package object', () => {
        const org = pckg('', {}).take('org')
        assert.deepStrictEqual(org.take('eolang').take(RHO), org)
      })
      it('should fail on wrong path', () => {
        const org = pckg('', {}).take('org')
        assert.throws(() => org.take('wrong'))
      })
    })
  })
})
