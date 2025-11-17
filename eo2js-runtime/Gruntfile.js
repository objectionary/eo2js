// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['temp'],
    options: {
      timeout: 10000,
      recursive: true,
      force: true,
      bail: false,
    },
    mochacli: {
      test: {
        options: {
          require: ['test/global.js'],
          files: ['test/**/*.test.js'],
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
  grunt.registerTask('default', ['mochacli:test', 'eslint'])
}
