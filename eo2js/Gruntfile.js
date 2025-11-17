// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['temp'],
    mochacli: {
      test: {
        options: {
          'timeout': '1200000',
          'node-option': ['unhandled-rejections=strict'],
          'abort-on-uncaught-exception': true,
          'files': ['test/**/*.test.js', '!test/resources/**'],
        },
      },
    },
    eslint: {
      options: {
        overrideConfigFile: 'eslint.config.js',
      },
      target: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
    },
  })
  grunt.loadNpmTasks('grunt-eslint')
  grunt.loadNpmTasks('grunt-mocha-cli')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.registerTask('default', ['mochacli', 'eslint'])
}
