// SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
// SPDX-License-Identifier: MIT

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['temp'],
    mochacli: {
      options: {
        timeout: 120000,
        recursive: true,
        reporter: 'spec',
      },
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
