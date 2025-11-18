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
      all: {
        src: ['test/commands/*.test.js', 'test/it/*.test.js', '!test/resources/**'],
      },
      unit: {
        src: ['test/commands/*.test.js', '!test/resources/**'],
      },
      integration: {
        src: ['test/it/*.test.js', '!test/resources/**'],
      },
    },
    eslint: {
      options: {
        overrideConfigFile: 'eslint.config.js',
      },
      target: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
    },
  })
  grunt.registerTask('test', ['mochacli:all']);
  grunt.registerTask('test:unit', ['mochacli:unit']);
  grunt.registerTask('test:integration', ['mochacli:integration']);
  grunt.registerTask('default', ['test', 'eslint']);
}
