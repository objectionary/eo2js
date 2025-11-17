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
      unit: {
        options: {
          reporter: 'spec',
        },
        src: ['test/commands/*.test.js', '!test/resources/**'],
      },
      integration: {
        options: {
          reporter: 'spec',
        },
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
  grunt.registerTask('test', ['mochacli:unit', 'mochacli:integration']);
  grunt.registerTask('test:unit', ['mochacli:unit']);
  grunt.registerTask('test:integration', ['mochacli:integration']);
  grunt.registerTask('default', ['test', 'eslint']);
}
